const formatter = function (options) {
  const cucumber = require(options.cucumberLibPath);
  const common = require('./cucumberjs_formatter_common.js');
  //Need to create an instance to see the summary in the console output
  const formatter = new cucumber.Formatter(options);
  const summaryFormatter = new cucumber.SummaryFormatter(options);
  let currentFeature = '';
  let featureIndex = 0;
  /**
   * test-run == Feature == testSuite
   * test-case == Scenario == testSuite
   * test-step == Step == test
   */
  options.eventBroadcaster.on('test-run-started', logFeatureStarted.bind())
  options.eventBroadcaster.on('test-run-finished', logFeatureFinished.bind())
  options.eventBroadcaster.on('test-case-started', logTestCaseStarted.bind())
  options.eventBroadcaster.on('test-case-finished', logTestCaseFinished.bind())
  options.eventBroadcaster.on('test-step-started', logStepStarted.bind())
  options.eventBroadcaster.on('test-step-finished', logStepFinished.bind())

  function logStepStarted(event) {
    const data = formatter.eventDataCollector.getTestCaseData(event.testCase.sourceLocation);
    if (data.pickle.steps[event.index] == null) return;
    const stepName = data.pickle.steps[event.index].text;
    const stepLine = data.pickle.steps[event.index].locations[0].line;
    console.log(
        `##teamcity[testStarted name = 'Step: ${common.escape(stepName)}' timestamp='${common.getCurrentDate()}' captureStandardOutput = 'true' locationHint='file:///${getUri() +
                                                                                                                                                                        ':' +
                                                                                                                                                                        stepLine}']\n`);
  }

  function logStepFinished(event) {
    const data = formatter.eventDataCollector.getTestCaseData(event.testCase.sourceLocation);
    if (data.pickle.steps[event.index] == null) return;
    const stepName = data.pickle.steps[event.index].text;
    const result = event.result.status;
    let duration = event.result.duration
    if (duration === undefined) duration = 0
    switch (result) {
      case 'ambiguous':
      case 'failed':
        console.log(`##teamcity[testFailed name = 'Step: ${common.escape(stepName)}' timestamp='${common.getCurrentDate()}' details='${common.escape(
            event.result.exception.stack)}' message='' ]\n`);
        break;
      case 'skipped':
        console.log(`##teamcity[testIgnored name = 'Step: ${common.escape(stepName)}' timestamp='${common.getCurrentDate()}']\n`);
        break;
    }
    console.log(`##teamcity[testFinished name = 'Step: ${common.escape(stepName)}' timestamp='${common.getCurrentDate()}' duration='${duration}']\n`);
  }

  function getFeatureName() {
    const length = Object.keys(formatter.eventDataCollector.gherkinDocumentMap).length
    const featureFileName = Object.keys(formatter.eventDataCollector.gherkinDocumentMap)[featureIndex]
    if (formatter.eventDataCollector.gherkinDocumentMap[featureFileName].feature === undefined) return null
    return formatter.eventDataCollector.gherkinDocumentMap[featureFileName].feature.name
  }

  function getUri() {
    return formatter.cwd + '/' + getFeatureFile()
  }

  function getFeatureFile() {
    return common.escape(Object.keys(formatter.eventDataCollector.gherkinDocumentMap)[featureIndex]);
  }

  function logFeatureStarted() {
    //For cases when feature file exists but contains no content
    if (getFeatureName() == null) return;
    if (currentFeature === '') {
      currentFeature = getFeatureName()
      console.log(`##teamcity[enteredTheMatrix timestamp='${common.getCurrentDate()}']\n`)
      console.log(`##teamcity[customProgressStatus testsCategory = 'Scenarios' count = '0' timestamp='${common.getCurrentDate()}']\n`)
    }
    console.log(
        `##teamcity[testSuiteStarted name='Feature: ${common.escape(currentFeature)}' timestamp='${common.getCurrentDate()}' locationHint='file:///${getUri()}']\n`);
  }

  function logFeatureFinished() {
    console.log(`##teamcity[testSuiteFinished name='Feature: ${common.escape(currentFeature)}' timestamp='${common.getCurrentDate()}']\n`);
    console.log(`##teamcity[customProgressStatus testsCategory = '' count = '0' timestamp = '${common.getCurrentDate()}']\n`)
    featureIndex++;
  }

  function logTestCaseStarted({sourceLocation}) {
    const data = formatter.eventDataCollector.getTestCaseData(sourceLocation);
    const featureName = data.gherkinDocument.feature.name
    if (featureName !== currentFeature) {
      logFeatureFinished()
      currentFeature = featureName
      logFeatureStarted()
    }
    console.log(`##teamcity[customProgressStatus type = 'testStarted' timestamp='${common.getCurrentDate()}']\n`);
    console.log(`##teamcity[testSuiteStarted name='Scenario: ${common.escape(
        data.pickle.name)}' timestamp='${common.getCurrentDate()}' locationHint='file:///${getUri() +
                                                                                           ':' +
                                                                                           sourceLocation.line}']\n`);
  }

  function logTestCaseFinished({sourceLocation}) {
    const data = formatter.eventDataCollector.getTestCaseData(sourceLocation);
    const result = data.testCase.result.status;
    switch (result) {
      case 'passed':
        console.log(`##teamcity[customProgressStatus type = 'testFinished' timestamp='${common.getCurrentDate()}']\n`)
        break;
      case 'ambiguous':
      case 'failed':
        console.log(`##teamcity[customProgressStatus type = 'testFailed' timestamp='${common.getCurrentDate()}']\n`)
        break;
      case 'skipped':
        console.log(`##teamcity[customProgressStatus type = 'testSkipped' timestamp='${common.getCurrentDate()}']\n`)
        break;
    }
    console.log(`##teamcity[testSuiteFinished name='Scenario: ${common.escape(data.pickle.name)}' timestamp='${common.getCurrentDate()}']\n`);
  }



};

module.exports = formatter
