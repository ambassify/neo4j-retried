/**
 * Check if a retry is allowed
 */
function retryAllowed(error, retriedAmount, options) {
    const {
        retries = 0,
        shouldRetry = []
    } = options;

    if (retriedAmount >= retries)
        return false;

    if (Array.isArray(shouldRetry) && shouldRetry.includes(error.code))
        return true;

    if (typeof shouldRetry == 'function')
        return shouldRetry(error);

    return false;
}

/**
 * Insert a timeout based on options and total attempts
 */
function wait(attempts, options) {
    let { delay } = options;

    delay = typeof delay === 'function' ? delay(attempts) : delay;
    delay = typeof delay === 'number' ? delay : 0;

    return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Proxy the run method on session or transaction
 */
function retriedRun(options) {
    return (session, ...args) => {
        let retries = 0;

        const run = () => session.run(...args).catch(e => {
            if (!retryAllowed(e, retries, options))
                throw e;

            ++retries;
            return wait(retries, options).then(run);
        });

        return run();
    };
}

/**
 * Proxy the run method on session
 */
function proxyTransaction(transaction, run) {
    return new Proxy(transaction, {
        get: (target, name) => {
            if (name == 'run')
                return (...args) => run(target, ...args);

            return target[name];
        }
    });
}

/**
 * Proxy the run and beginTransaction methods on session
 */
function proxySession(session, run) {
    return new Proxy(session, {
        get: (target, name) => {
            if (name == 'run')
                return (...args) => run(target, ...args);

            if (name == 'beginTransaction')
                return (...args) => proxyTransaction(target.beginTransaction(...args), run);

            return target[name];
        }
    });
}

/**
 * Proxy session method on driver
 */
function proxyDriver(driver, run) {
    return new Proxy(driver, {
        get: (target, name) => {
            if (name != 'session') return target[name];
            return (...args) => proxySession(target.session(...args), run);
        }
    });
}

/**
 * Return a wrapped neo4j driver that implements retries
 */
function wrap(driver, options = {}) {
    const { shouldRetry = [], retries = 0 } = options;

    if (
        (Array.isArray(shouldRetry) && ! shouldRetry.length) ||
        !retries
    ) return driver;

    return proxyDriver(driver, retriedRun(options));
}

module.exports = wrap;
