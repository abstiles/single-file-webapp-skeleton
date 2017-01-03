let testContext = require.context(".", true, /_test$/);
testContext.keys().forEach(testContext);
