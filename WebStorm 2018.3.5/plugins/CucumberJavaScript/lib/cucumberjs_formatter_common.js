var fs = require('fs')
function unixLogger(message) {
  console.log(message);
}

function windowsLogger(message) {
  if (!message.endsWith("\n")) {
    message = message + "\n";
  }
  fs.writeSync(1, message);
  fs.fsyncSync(1);
}

function adjustToLength(number, length) {
  var result = '' + number;
  while (result.length < length) {
    result = '0' + result;
  }
  return result;
}

function escape(text) {
  if (text == null) return undefined
  return text
      .replace(/\|/g, '||')
      .replace(/'/g, '|\'')
      .replace(/\n/g, '|n')
      .replace(/\r/g, '|r')
      .replace(/\[/g, '|[')
      .replace(/\]/g, '|]');
}

function getCurrentDate() {
  var date = new Date();
  var year = adjustToLength(date.getFullYear(), 4);
  var month = adjustToLength(date.getMonth(), 2);
  var day = adjustToLength(date.getDay(), 2);

  var hours = adjustToLength(date.getHours(), 2);
  var minutes = adjustToLength(date.getMinutes(), 2);
  var seconds = adjustToLength(date.getSeconds(), 2);
  var milliseconds = adjustToLength(date.getMilliseconds(), 3);

  var timezone = Math.abs(date.getTimezoneOffset() / 60 * (-1));
  timezone = adjustToLength(timezone, 2);
  if (date.getTimezoneOffset() > 0) {
    timezone = '-' + timezone;
  } else {
    timezone = '+' + timezone;
  }

  return '' + year + '-' + month + '-' + day + "T" + hours + ':' + minutes + ':' + seconds + '.' + milliseconds + '' + timezone + '00';
}

function buildHandlers(useMilliseconds) {
  var log = process.platform === 'win32' ? windowsLogger : unixLogger
  var currentFeature;
  var lastFailedTestName = null;
  return {
    BeforeFeatures: handleBeforeFeaturesEvent,
    BeforeFeature: handleBeforeFeatureEvent,
    BeforeScenario: handleBeforeScenario,
    BeforeStep: handleBeforeStep,
    StepResult: handleStepResult,
    AfterScenario: handleAfterScenario,
    AfterFeature: handleAfterFeatureEvent,
    AfterFeatures: handleAfterFeaturesEvent
  };

  function handleStepResult(event, callback) {
    var stepResult = getStepResult(event);
    var step = stepResult.getStep ? stepResult.getStep() : stepResult.step;
    var message;

    if (lastFailedTestName != null && lastFailedTestName === getName(step)) {
      callback();
      return;
    }
    lastFailedTestName = null;

    if (getStatus(stepResult) === "skipped" || getStatus(stepResult) === "pending") {
      message = "##teamcity[testIgnored name = 'Step: %s' message = 'Skipped step' timestamp = '%s']";
      message = message.replace('%s', getName(step));
      message = message.replace('%s', getCurrentDate());
      log(message);
    } else if (getStatus(stepResult) === "undefined") {
      message = "##teamcity[testFailed timestamp = '%s' details = '' message = 'Undefined step: %s' name = 'Step: %s' error = 'true']";
      message = message.replace('%s', getCurrentDate());
      message = message.replace('%s', getName(step));
      message = message.replace('%s', getName(step));
      log(message);
    } else if(getStatus(stepResult) === "failed") {
      lastFailedTestName = getName(step);
      var exception = stepResult.getFailureException ? stepResult.getFailureException() : stepResult.failureException;

      var stack = exception.stack != null ? escape(exception.stack.toString()) : '';
      message = "##teamcity[testFailed timestamp = '%s' details = '%s' message = '%s' name = 'Step: %s']";
      message = message.replace('%s', getCurrentDate());
      message = message.replace('%s', stack);
      message = message.replace('%s', '');
      message = message.replace('%s', getName(step));
      log(message);

      message = "##teamcity[customProgressStatus timestamp='%s' type='testFailed']";
      message = message.replace('%s', getCurrentDate());
      log(message);
    }

    message = "##teamcity[testFinished timestamp = '%s' diagnosticInfo = 'cucumber  f/s=(1344855950447, 1344855950447), duration=0, time.now=%s' duration = '%s' name = 'Step: %s']";
    time = getCurrentDate();
    message = message.replace('%s', time);
    message = message.replace('%s', time);
    var duration = (stepResult.getDuration ? stepResult.getDuration() : stepResult.duration) || 0;
    message = message.replace('%s', Math.round(duration / (useMilliseconds ? 1000 : 1000000)));
    message = message.replace('%s', getName(step));
    log(message);

    callback();
  }

  function handleBeforeFeaturesEvent(_, callback) {
    var message = "##teamcity[enteredTheMatrix timestamp = '%s']";
    message = message.replace('%s', getCurrentDate());
    log(message);

    message = "##teamcity[customProgressStatus testsCategory = 'Scenarios' count = '0' timestamp = '%s']";
    message = message.replace('%s', getCurrentDate());
    log(message);
    callback();
  }

  function handleBeforeFeatureEvent(event, callback) {
    var feature = getFeature(event);
    currentFeature = feature;
    var message = "##teamcity[testSuiteStarted timestamp = '%s' locationHint = 'file:///%s' name = 'Feature: %s']";
    message = message.replace('%s', getCurrentDate());
    message = message.replace('%s', getUri(feature) + ':' + getLine(feature));
    message = message.replace('%s', getName(feature));
    log(message);

    callback();
  }

  function handleAfterFeatureEvent(event, callback) {
    var feature = getFeature(event);
    var message = "##teamcity[testSuiteFinished timestamp = '%s' name = 'Feature: %s']";
    message = message.replace('%s', getCurrentDate());
    message = message.replace('%s', getName(feature));
    log(message);

    callback();
  }

  function handleBeforeStep(event, callback) {
    var step = getStep(event);
    testStarted(step);

    callback();
  }

  function handleBeforeScenario(event, callback) {
    var scenario = getScenario(event);

    var message = "##teamcity[customProgressStatus type = 'testStarted' timestamp = '%s']";
    message = message.replace('%s', getCurrentDate());
    log(message);

    message = "##teamcity[testSuiteStarted timestamp = '%s' locationHint = 'file:///%s' name = 'Scenario: %s']";
    message = message.replace('%s', getCurrentDate());
    message = message.replace('%s', getUri(scenario) + ':' + getLine(scenario));
    message = message.replace('%s', getName(scenario));
    log(message);
    callback();
  }

  function handleAfterScenario(event, callback) {
    var scenario = getScenario(event)

    var message = "##teamcity[testSuiteFinished timestamp = '%s' name = 'Scenario: %s']";
    message = message.replace('%s', getCurrentDate());
    message = message.replace('%s', getName(scenario));
    log(message);
    callback();
  }

  function handleAfterFeaturesEvent(_, callback) {
    var message = "##teamcity[customProgressStatus testsCategory = '' count = '0' timestamp = '%s']";
    message = message.replace('%s', getCurrentDate());
    log(message);
    callback();
  }

  function getStatus(stepResult) {
    return stepResult.getStatus? stepResult.getStatus(): stepResult.status;
  }

  function getLine(obj) {
    return obj.getLine? obj.getLine(): obj.line;
  }

  function getName(obj) {
    return escape(obj.getName? obj.getName(): obj.name);
  }

  function getUri(obj) {
    return escape(obj.getUri ? obj.getUri() : obj.uri);
  }

  function getFeature(eventOrFeature) {
    if (eventOrFeature.getUri == null && eventOrFeature.getPayloadItem != null) {
      return eventOrFeature.getPayloadItem('feature')
    }
    return eventOrFeature
  }

  function getScenario(eventOrScenario) {
    if (eventOrScenario.getUri == null && eventOrScenario.getPayloadItem != null) {
      return eventOrScenario.getPayloadItem('scenario')
    }
    return eventOrScenario
  }

  function getStep(eventOrStep) {
    if (eventOrStep.getUri == null && eventOrStep.getPayloadItem != null) {
      return eventOrStep.getPayloadItem('step')
    }
    return eventOrStep
  }

  function getStepResult(eventOrStepResult) {
    if (eventOrStepResult.getFailureException == null && eventOrStepResult.getPayloadItem != null) {
      return eventOrStepResult.getPayloadItem('stepResult')
    }
    return eventOrStepResult
  }


  function testStarted(step) {
    if (getName(step) === undefined) return;
    var message = "##teamcity[testStarted timestamp = '%s' locationHint = 'file:///%s' captureStandardOutput = 'true' name = 'Step: %s']";
    message = message.replace("%s", getCurrentDate());
    message = message.replace("%s", getUri(step) + ':' + getLine(step));
    message = message.replace("%s", getName(step));
    log(message);
  }
}

module.exports = {
  buildHandlers: buildHandlers,
  getCurrentDate: getCurrentDate,
  escape: escape
}
