var log4js = require('log4js');

var logPath = __dirname + '/logs/';
var logConfiguration = {
  appenders: { /* EXAMPLE: coin: { type: 'file', filename: 'logs/'+FILENAME+ '.log' } */ },
  categories: { default: { appenders: [], level: 'all' } }
};

function createLogger(loggerName,fileName) {
  //adding new log to global logConfiguration
  logConfiguration.appenders[loggerName] = { type: 'file',
                                             filename: logPath + fileName + '.log' };
  logConfiguration.categories.default.appenders.push(loggerName);
  log4js.configure(logConfiguration);

  // Creating logger variable to return
  var logger = log4js.getLogger(loggerName);

  // adding function to printAndLog before returning variable
  logger.printAndLog = function printAndLog(str) {
    console.log(str);
    this.info(str);
  };
  return logger;
}



module.exports = {
  createLogger : createLogger
};