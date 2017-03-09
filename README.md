# neo4j-retried

![CircleCI](https://img.shields.io/circleci/project/github/ambassify/neo4j-retried.svg)
[![npm version](https://img.shields.io/npm/v/@ambassify/neo4j-retried.svg)](https://www.npmjs.com/package/@ambassify/neo4j-retried)
[![npm downloads](https://img.shields.io/npm/dt/@ambassify/neo4j-retried.svg)](https://www.npmjs.com/package/@ambassify/neo4j-retried)
[![maintainer](https://img.shields.io/badge/maintainer-Gertt-brightgreen.svg)](https://github.com/Gertt)

Retry queries run against the neo4j driver. Great for handling deadlock exceptions.

## Important caveat

The retried wrapper only works if you use neo4j-driver with promises, it does
not handle the `.subscribe()` way.

## Installation

```shell
npm install --save @ambassify/neo4j-retried
```

## Example

Automatically retry DeadlockDetected exceptions.

```js
const neo4j = require('neo4j-driver').v1;
const neo4jRetried = require('@ambassify/neo4j-retried');

const driver = neo4jRetried(neo4j.driver(/* your driver config */), {
    shouldRetry: [ neo4jRetried.errors.Transaction.DeadlockDetected ]
});
const session = driver.session();

session.run('CREATE CONSTRAINT ON (p:Person) ASSERT p.name IS UNIQUE')
.catch(e => {
    console.log(e);
    session.close();
    driver.close();
});
```

## Options

**retries**

The amount of times a query should be retried.

**delay**

The delay between retries, can be an integer or a function.

In case of integer, the value is used as slot time in a binary exponential backoff algorithm (https://en.wikipedia.org/wiki/Exponential_backoff)

In case of a function, the function is called with the total amount of previous calls as first parameter and should return the delay in ms.

**shouldRetry**

Decides whether or not a failure should be retried. Can be an array of Neo4j error codes that should be retried or a function that accepts the error that occurred and returns a boolean.

## Contribute

We really appreciate any contribution you would like to make, so don't
hesitate to report issues or submit pull requests.

## License

This project is released under a MIT license.

## About us

If you would like to know more about us, be sure to have a look at [our website](https://www.ambassify.com), or our Twitter accounts [Ambassify](https://twitter.com/Ambassify), [Sitebase](https://twitter.com/Sitebase), [JorgenEvens](https://twitter.com/JorgenEvens)
