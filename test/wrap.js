const assert = require('assert');
const sinon = require('sinon');
const neo4j = require('neo4j-driver').v1;

describe('# wrap', function() {

    const wrap = require('../src/wrap');

    const sessionMock = {
        beginTransaction: () => sessionMock,
        run: () => {}
    };

    const driverMock = {
        session: () => sessionMock
    };

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    })

    it('should return the untouched driver object when shouldRetry is empty', () => {
        const driver = Symbol('driver');
        const wrapped = wrap(driver, { shouldRetry: [], retries: 5 });
        assert.strictEqual(wrapped, driver);
    })

    it('should return the untouched driver object when retries is 0', () => {
        const driver = Symbol('driver');
        const wrapped = wrap(driver, { shouldRetry: [ 'bla' ], retries: 0 });
        assert.strictEqual(wrapped, driver);
    })

    it('should not touch the driver object but return a new proxy that works the same', () => {
        const stub = sandbox.stub(sessionMock, 'run');
        const wrapped = wrap(driverMock, { shouldRetry: () => {}, retries: 1 });

        const fixt_result = Symbol('result');
        const fixt_args = [ Symbol('arg1'), Symbol('arg2') ];
        stub.withArgs(...fixt_args).returns(Promise.resolve(fixt_result));

        const session = wrapped.session();
        const transaction = session.beginTransaction();

        return Promise.all([
            session.run(...fixt_args),
            transaction.run(...fixt_args)
        ]).then(results => {
            assert.notEqual(wrapped, driverMock);
            results.forEach(r => assert.strictEqual(r , fixt_result));
            assert(stub.withArgs(...fixt_args).calledTwice);
        })
    })

    it('should not retry when error code does not match', function() {
        const stub = sandbox.stub(sessionMock, 'run');
        const wrapped = wrap(driverMock, { retries: 1, shouldRetry: [ 'Error.Test' ] });

        const fixt_error = new Error();
        fixt_error.code = 'Error.NotTest';
        const fixt_args = [ Symbol('arg1'), Symbol('arg2') ];
        stub.withArgs(...fixt_args).returns(Promise.reject(fixt_error));

        return wrapped.session().run(...fixt_args).then(
            () => { throw new Error('should have thrown'); },
            e => {
                assert.strictEqual(e , fixt_error);
                assert(stub.withArgs(...fixt_args).calledOnce);
            }
        );
    })

    it('should not retry when shouldRetry returns false', function() {
        const fixt_error = new Error();
        const fixt_args = [ Symbol('arg1'), Symbol('arg2') ];

        const stub = sandbox.stub(sessionMock, 'run');
        const cbStub = sandbox.stub()
        const wrapped = wrap(driverMock, { retries: 1, shouldRetry: cbStub });

        stub.withArgs(...fixt_args).returns(Promise.reject(fixt_error));
        cbStub.withArgs(fixt_error).returns(false);

        return wrapped.session().run(...fixt_args).then(
            () => { throw new Error('should have thrown'); },
            e => {
                assert.strictEqual(e , fixt_error);
                assert(stub.withArgs(...fixt_args).calledOnce);
                assert(cbStub.withArgs(fixt_error).calledOnce);
            }
        );
    })

    it('should retry when error type matches', function() {
        const fixt_error = new Error();
        const fixt_args = [ Symbol('arg1'), Symbol('arg2') ];
        fixt_error.code = 'Error.Test';

        const stub = sandbox.stub(sessionMock, 'run');
        const wrapped = wrap(driverMock, { retries: 3, shouldRetry: [ 'Error.Test' ] });

        stub.withArgs(...fixt_args).returns(Promise.reject(fixt_error));

        return wrapped.session().run(...fixt_args).then(
            () => { throw new Error('should have thrown'); },
            e => {
                assert.strictEqual(e , fixt_error);
                assert.equal(stub.withArgs(...fixt_args).callCount, 4);
            }
        );
    })

    it('should retry when error type matches', function() {
        const fixt_error = new Error();
        const fixt_args = [ Symbol('arg1'), Symbol('arg2') ];

        const stub = sandbox.stub(sessionMock, 'run');
        const cbStub = sandbox.stub();
        const wrapped = wrap(driverMock, { retries: 3, shouldRetry: cbStub });

        stub.withArgs(...fixt_args).returns(Promise.reject(fixt_error));
        cbStub.withArgs(fixt_error).returns(true);

        return wrapped.session().run(...fixt_args).then(
            () => { throw new Error('should have thrown'); },
            e => {
                assert.strictEqual(e , fixt_error);
                assert.equal(stub.withArgs(...fixt_args).callCount, 4);
                assert.equal(cbStub.withArgs(fixt_error).callCount, 3);
            }
        );
    })

    it('should succeed if one of the retries succeeds', function() {
        const fixt_result = Symbol('result');
        const fixt_error = new Error();
        const fixt_args = [ Symbol('arg1'), Symbol('arg2') ];

        const stub = sandbox.stub(sessionMock, 'run');
        const wrapped = wrap(driverMock, { retries: 3, shouldRetry: () => true });

        stub.withArgs(...fixt_args).returns(Promise.reject(fixt_error))
            .withArgs(...fixt_args).onThirdCall().returns(Promise.resolve(fixt_result));

        return wrapped.session().run(...fixt_args).then(r => {
            assert.strictEqual(r, fixt_result);
            assert.equal(stub.withArgs(...fixt_args).callCount, 3);
        });
    })

    it('accepts a delay function', function() {
        const fixt_result = Symbol('result');
        const fixt_error = new Error();
        const fixt_args = [ Symbol('arg1'), Symbol('arg2') ];

        const stub = sandbox.stub(sessionMock, 'run');
        const delayStub = sandbox.stub();
        const wrapped = wrap(driverMock, { delay: delayStub, retries: 3, shouldRetry: () => true });

        delayStub.returns(0);

        stub.withArgs(...fixt_args).returns(Promise.reject(fixt_error))
            .withArgs(...fixt_args).onThirdCall().returns(Promise.resolve(fixt_result));

        return wrapped.session().run(...fixt_args).then(r => {
            assert.strictEqual(r, fixt_result);
            assert.equal(stub.withArgs(...fixt_args).callCount, 3);
            assert.equal(delayStub.callCount, 2);
            assert(delayStub.withArgs(1).calledOnce);
            assert(delayStub.withArgs(2).calledOnce);
        });
    })

    it('works with a real driver instance', () => {
        const driver = neo4j.driver('bolt://something');
        const retryStub = sandbox.stub().returns(true);
        const wrapped = wrap(driver, { retries: 3, shouldRetry: retryStub });

        return wrapped.session().run('something').then(
            () => { throw new Error('should have thrown'); },
            e => {
                // retry check called three times
                assert.equal(retryStub.callCount, 3);

                // retry check called three times with the correct neo4j error
                assert.equal(retryStub.withArgs(sinon.match(e => {
                    return e.code == 'SessionExpired';
                })).callCount, 3);
            }
        );
    })
})
