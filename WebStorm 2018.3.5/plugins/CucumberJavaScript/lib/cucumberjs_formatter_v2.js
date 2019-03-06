var formatter = function (options) {
  var cucumber = require(options.cucumberLibPath);
  var common = require('./cucumberjs_formatter_common.js')
  var summaryFormatter = new cucumber.SummaryFormatter(options)
  var handlers = common.buildHandlers(true);
  for (var key in handlers) {
    if (handlers.hasOwnProperty(key)) {
      this["handle" + key] = handlers[key]
    }
  }
  this.handleFeaturesResult = summaryFormatter.handleFeaturesResult.bind(summaryFormatter)
};

module.exports = formatter