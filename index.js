const CronJob = require('cron').CronJob;
const bittrex = require('node-bittrex-api');
const log = require('./log');

// Setting up Bittrex connection configuration
bittrex.options({
  'apikey' : process.env.API_KEY,
  'apisecret' : process.env.API_SECRET
});

// BY Default, the bot starts with BTC but if you want to use a different coin just set the process.env.COIN
// example: COIN=BCC npm start
const COIN = process.env.COIN || 'BTC';
const BASE_COIN = process.env.BASE_COIN || 'USDT';

// Creating logger
const logger = log.createLogger(BASE_COIN + '-' + COIN, BASE_COIN + '-' + COIN);

// Personal balance
let personalBalance = null;

// Looks up personal balance every minute
function lookupPersonalBalance() {
  logger.printAndLog('Starting cronjob to Look up your ' + COIN + ' balance every minute...');
  const lookBalance = new CronJob('* * * * *',
    lookBittrexBalance,
    ( () => logger.printAndLog('Lookup Cronjob Stopped Running...') )
    ,
    true,
    'America/New_York' /* Time zone of this job. */
  );

}

function lookBittrexBalance() {
  // We need to use promise here because the library(node-bittrex-api) we're using does not accept async/await
  return new Promise(
    function (resolve, reject) {
        bittrex.getbalance({ currency : 'USDT'/*COIN*/ },
        function (data, err ) {
          if ( err ) {
            logger.printAndLog(err);
            return reject(err);
          }
          if ( data.result.Balance > 0 ) {
            personalBalance =  data.result.Balance;
          }
          return resolve(true);
        });
    }
  );
}

function estimateBalance(val) {

  let estimatedBalance = personalBalance * val;
  // if dollar(tether), round to 2 decimal cases,
  if ( BASE_COIN == 'USDT' ) {
    estimatedBalance = estimatedBalance.toFixed(2);
  } else {
    estimatedBalance = estimatedBalance.toFixed(8);
  }
  logger.printAndLog('YOUR estimated balance Value : ' + estimatedBalance + ' ' + BASE_COIN + ' (' + personalBalance + ' ' + COIN +')');
  logger.printAndLog('<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
}

let lastValue = null;

module.exports = bittrex.websockets.client(async function() {

  logger.printAndLog('Analyzing Market: '+BASE_COIN + '-' + COIN );

  // filling up personal balance before continuing script
  await lookBittrexBalance();

  logger.printAndLog('Your Balance: '+personalBalance + ' ' + COIN );

  // adding cronjob to update balance every minute
  lookupPersonalBalance();

  bittrex.websockets.subscribe([BASE_COIN+'-'+COIN], function(data) {
    if (data.M === 'updateExchangeState') {

      // getting last FILLS(Complete Transactions) Rates
      const fills = data.A.map(data_for => data_for.Fills.map(a => a.Rate))[0];

      // getting the Average Rate from all the fills
      let fillsAverage = null;
      if ( fills.length > 0 ) {

        // calculate last FILL value(average between all fills)
        fillsAverage = fills.reduce((accumulator, currentValue) => accumulator + currentValue)/fills.length;

        logger.printAndLog('Current '+ COIN +' value(last fills average):' + fillsAverage + ' '+ BASE_COIN);

        // Logging comparing between last and current value(if changed)
        const ratio = fillsAverage/lastValue;
        if ( lastValue != null && ( ratio > 1 || ratio < 1 ) ) {
          let strEstimative = COIN;
          if ( ratio > 1 ) {
            strEstimative += ' UP BY ';
          }
          else if ( ratio < 1 ) {
            strEstimative += ' DOWN BY ';
          }
          strEstimative += (Math.abs(1-ratio)*100).toFixed(8)+'%';
          logger.printAndLog(strEstimative);
        }

        // Estimating balance if user has any value on the COIN value.
        if ( personalBalance && personalBalance > 0 ) {
          estimateBalance(fillsAverage);
        }

        lastValue = fillsAverage;
      }
      // getting the Max Rate from all the fills
      // const fillsMax = fills.length > 0 ? Math.max.apply(null, fills) : null;
      // getting the Min Rate from all the fills
      // const fillsMin = fills.length > 0 ? Math.min.apply(null, fills) : null;

      // If there is at least one fill check whether the fibonnaci target line changes
      if ( fillsAverage != null ) {


      }
    }
  });
});