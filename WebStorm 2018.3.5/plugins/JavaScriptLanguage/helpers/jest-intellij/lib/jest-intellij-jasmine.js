const Tree = require('../../base-test-reporter/intellij-tree')
  , stringifier = require('../../base-test-reporter/intellij-stringifier')
  , util = require('../../base-test-reporter/intellij-util')
  , jestIntellijUtil = require('./jest-intellij-util')
  , processStdoutWrite = process.stdout.write.bind(process.stdout)
  , processStderrWrite = process.stderr.write.bind(process.stderr)
  , jestMessageUtil = requireJestPackage('jest-message-util')
  , nowTime = Date.now.bind(Date);

function requireJestPackage(requiredJestHelperPkg) {
  var jestPkg = process.argv[1];
  if (!util.isString(jestPkg)) {
    return null;
  }
  jestPkg = jestPkg.replace(/\\/g, '/');
  var ind = jestPkg.lastIndexOf('/node_modules/jest/');
  if (ind < 0) {
    ind = jestPkg.lastIndexOf('/node_modules/jest-cli/');
  }
  if (ind > 0) {
    try {
      return require(jestPkg.substring(0, ind) + '/node_modules/' + requiredJestHelperPkg);
    }
    catch (e) {
    }
  }
  return null;
}

function normalizeFailedExpectation(failedExpectation, testFilePath) {
  let message = failedExpectation.message || '';
  let stack = failedExpectation.stack || '';
  if (util.isString(message) && util.isString(stack) && message.length > 0 && stack.indexOf(message) === 0) {
    stack = stack.substring(message.length);
  }
  if (stack.length === 0) {
    const nlInd = message.indexOf('\n');
    if (nlInd > 0 && nlInd + 1 < message.length && message.charAt(nlInd + 1) === '\n') {
      stack = message.substring(nlInd + 2);
      message = message.substring(0, nlInd);
    }
  }
  if (stack && jestMessageUtil && typeof jestMessageUtil.formatStackTrace === 'function') {
    const rootDir = process.env._INTELLIJ_JEST_CONFIG_ROOT_DIR || process.cwd();
    stack = jestMessageUtil.formatStackTrace(stack, {rootDir: rootDir}, testFilePath || '');
  }
  let expected, actual;
  if (failedExpectation.error && failedExpectation.error.matcherResult) {
    expected = failedExpectation.error.matcherResult.expected;
    actual = failedExpectation.error.matcherResult.actual;
  }
  else {
    expected = failedExpectation.expected;
    actual = failedExpectation.actual;
  }
  return {message: message, stack: stack, expected: expected, actual: actual};
}

function getTestFilePath() {
  if (jasmine.testPath) {
    return jasmine.testPath;
  }
  if (Symbol && typeof Symbol.for === 'function') {
    const globalStateKey = Symbol.for('$$jest-matchers-object');
    if (globalStateKey) {
      const globalState = global[globalStateKey];
      if (globalState) {
        const state = globalState.state;
        if (state) {
          return state.testPath;
        }
      }
    }
  }
}

function getUniqueTestFileRunId() {
  const id = process.pid + '_';
  if (typeof process.hrtime === 'function') {
    return id + process.hrtime().join('_');
  }
  return id + process.uptime();
}

(function () {
  const setupTestFrameworkScriptFile = jestIntellijUtil.getOriginalSetupTestFrameworkScriptFile();
  if (setupTestFrameworkScriptFile) {
    require(setupTestFrameworkScriptFile);
  }

  const testFilePath = getTestFilePath();
  if (util.isString(testFilePath)) {
    const tree = new Tree(getUniqueTestFileRunId(), processStdoutWrite, testFilePath);
    tree.startNotify();
    jasmine.getEnv().addReporter(new JasmineReporter(tree, testFilePath));
  }
  else {
    console.error('intellij: cannot find testFilePath');
  }
})();

function createdPatchedSpec(OriginalSpec, registry) {
  function PatchedSpec(attrs) {
    OriginalSpec.apply(this, arguments);
    if (attrs && attrs.id) {
      registry[attrs.id] = this;
    }
  }
  PatchedSpec.prototype = Object.create(OriginalSpec.prototype, {
    constructor: {
      value: PatchedSpec,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  for (const statics in OriginalSpec) {
    if (Object.prototype.hasOwnProperty.call(OriginalSpec, statics)) {
      PatchedSpec[statics] = OriginalSpec[statics];
    }
  }
  return PatchedSpec;
}

/**
 * @constructor
 */
function JasmineReporter(tree, testFilePath) {
  const specRegistry = {};
  jasmine.Spec = createdPatchedSpec(jasmine.Spec, specRegistry);
  this.isSpecDisabled = function (result) {
    let spec = specRegistry[result.id];
    return spec && spec.disabled;
  };
  this.getTotalNotDisabledSpecCount = function () {
    return Object.values(specRegistry).filter((spec) => {
      return !spec.disabled
    }).length;
  };
  this.tree = tree;
  this.testFilePath = testFilePath;
  this.currentSuiteNode = tree.root;
  this.nodeById = {};
}

JasmineReporter.prototype.jasmineStarted = safeFn(function (options) {
  this.tree.addTotalTestCount(this.getTotalNotDisabledSpecCount());
});

JasmineReporter.prototype.suiteStarted = safeFn(function (result) {
  const locationPath = jestIntellijUtil.getLocationPath(this.currentSuiteNode, result.description,
                                                        this.tree.root, this.testFilePath);
  const suiteNode = this.currentSuiteNode.addTestSuiteChild(result.description, 'suite', locationPath);
  this.currentSuiteNode = suiteNode;
});

JasmineReporter.prototype.suiteDone = safeFn(function (result) {
  const suiteNode = this.currentSuiteNode;
  if (suiteNode == null) {
    return warn('No current suite to finish');
  }
  if (suiteNode.name !== result.description) {
    return warn('Suite name mismatch, actual: ' + suiteNode.name + ', expected: ' + result.description);
  }
  if (suiteNode.state.name !== 'created') {
    suiteNode.finish(false);
  }
  this.currentSuiteNode = suiteNode.parent;
});

function startAncestorSuites(suite, root) {
  if (suite.state.name === 'created' && suite !== root) {
    startAncestorSuites(suite.parent, root);
    suite.start();
  }
}

/**
 * @param {jasmine.Result} result
 */
JasmineReporter.prototype.specStarted = safeFn(function (result) {
  if (this.isSpecDisabled(result)) {
    return;
  }
  startAncestorSuites(this.currentSuiteNode, this.tree.root);
  const locationPath = jestIntellijUtil.getLocationPath(this.currentSuiteNode, result.description,
                                                        this.tree.root, this.testFilePath);
  const specNode = this.currentSuiteNode.addTestChild(result.description, 'test', locationPath);
  try {
    specNode.startTime = {millis: nowTime()};
  }
  catch (e) {
    specNode.startTime = {error: e};
  }
  specNode.start();
  if (this.nodeById[result.id] != null) {
    warn('jasmine error, specStarted with not unique result.id: ' + result.id)
  }
  this.nodeById[result.id] = specNode;
});

function passedTime(startTime) {
  if (typeof startTime.millis === 'number') {
    try {
      return nowTime() - startTime.millis;
    }
    catch (e) {
      warn('Failed to call Date.now() on specDone: ' + e.message);
    }
  }
  else {
    warn('Failed to call Date.now() on specStarted: ' + startTime.error);
  }
}

/**
 * @param {jasmine.Result} result
 */
JasmineReporter.prototype.specDone = safeFn(function (result) {
  const specNode = this.nodeById[result.id];
  if (specNode == null) {
    if (this.isSpecDisabled(result)) {
      return;
    }
    return warn('Cannot find specNode by id ' + result.id);
  }
  const durationMillis = passedTime(specNode.startTime);
  let failureMessage, failureDetails, expectedStr, actualStr;
  if (result.failedExpectations.length > 0) {
    const failedExpectation = result.failedExpectations[0];
    const normalized = normalizeFailedExpectation(failedExpectation, this.testFilePath);
    failureMessage = normalized.message;
    failureDetails = normalized.stack;
    if (normalized.expected !== normalized.actual) {
      expectedStr = stringifier.stringify(normalized.expected);
      actualStr = stringifier.stringify(normalized.actual);
    }
  }
  var outcome;
  if (result.status === 'passed') {
    outcome = Tree.TestOutcome.SUCCESS;
  }
  else if (result.status === 'pending' || result.status === 'disabled') {
    outcome = Tree.TestOutcome.SKIPPED;
  }
  else {
    outcome = Tree.TestOutcome.FAILED;
  }
  specNode.setOutcome(outcome, durationMillis, failureMessage, failureDetails, expectedStr, actualStr, null, null);
  specNode.finish(false);
});

JasmineReporter.prototype.jasmineDone = safeFn(function () {
  this.tree.root.finish(false);
});

function safeFn(fn) {
  return function () {
    try {
      return fn.apply(this, arguments);
    } catch (ex) {
      warn(ex.message + '\n' + ex.stack);
    }
  };
}

function warn(message) {
  const str = 'WARN - IDE integration: ' + message + '\n';
  try {
    processStderrWrite(str);
  }
  catch (ex) {
    try {
      processStdoutWrite(str);
    }
    catch (ex) {
      // do nothing
    }
  }
}
