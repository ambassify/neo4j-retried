const binaryExponential = require('@ambassify/backoff-strategies/src/binary-exponential');

const wrap = require('./wrap');
const errors = require('./errors');

function wrapWithDefaults(driver, options = {}) {
    if (typeof options.delay != 'function')
        options.delay = binaryExponential(options.delay || 30);

    if (typeof options.retries == 'undefined')
        options.retries = 5;

    return wrap(driver, options);
}

wrapWithDefaults.errors = errors;

module.exports = wrapWithDefaults;
