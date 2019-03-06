var common = require('./cucumberjs_formatter_common.js')

var ourHandlers = common.buildHandlers(false)
module.exports = function () {
  for (var key in ourHandlers) {
    if (ourHandlers.hasOwnProperty(key)) {
      this[key](ourHandlers[key])
    }
  }
}