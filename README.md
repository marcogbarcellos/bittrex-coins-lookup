# bittrex-coins-lookup

Simple Nodejs 8 application to look crypto currencies in real time through the terminal using the [Bittrex api](https://bittrex.com/home/api).

## requirements

- Nodejs 8+ installed
- Bittrex API key and secret(NEVER put it in your code and commit, instead use environments variables locally)

## Usage

You'll need to set the api key and secret as environment variable. To know how to generate API keys, take a look on the [documentation](https://bittrex.com/home/api).

BE AWARE: To use this API you just need to generate `READ` API keys, It's not recommended give the api keys you'll use here more than that.


By default, the script looks the market "USDT-BTC".
To run just do:

  - `npm install`
  - `API_KEY=YOUR_API_SECRET_KEY_HERE API_SECRET=YOUR_API_SECRET_KEY_HERE npm start`

If you want to look at a different market, you need to set 2 environment variables: BASE_COIN and COIN.
Here is an example looking the "BTC-ETH" market:

  - `API_KEY=YOUR_API_SECRET_KEY_HERE API_SECRET=YOUR_API_SECRET_KEY_HERE BASE_COIN=BTC COIN=ETH npm start`

## Output and logs

Whenever you start running the script it'll create a folder `logs` and a file named as 'YOUR_BASE_COIN-YOUR_COIN' where you can check easily the whole logs.

the console will also show something like:

```
Analyzing Market: USDT-BTC
Your Balance: 1378.50038308 BTC
Starting cronjob to Look up your BTC balance every minute...
Current BTC value(last fills average):8265 USDT
YOUR estimated balance Value : 11393305.67 USDT (1378.50038308 BTC)
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Current BTC value(last fills average):8271.398367955 USDT
BTC UP BY 0.07741522%
YOUR estimated balance Value : 11402125.82 USDT (1378.50038308 BTC)
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Current BTC value(last fills average):8277.79673591 USDT
BTC UP BY 0.07735534%
YOUR estimated balance Value : 11410945.97 USDT (1378.50038308 BTC)
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Current BTC value(last fills average):8288.89336794 USDT
BTC UP BY 0.13405297%
YOUR estimated balance Value : 11426242.68 USDT (1378.50038308 BTC)
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Current BTC value(last fills average):8299.98999997 USDT
BTC UP BY 0.13387350%
YOUR estimated balance Value : 11441539.39 USDT (1378.50038308 BTC)
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Current BTC value(last fills average):8299.98999997 USDT
YOUR estimated balance Value : 11441539.39 USDT (1378.50038308 BTC)
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Current BTC value(last fills average):8299.99999998 USDT
BTC UP BY 0.00012048%
YOUR estimated balance Value : 11441553.18 USDT (1378.50038308 BTC)
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Current BTC value(last fills average):8299.99999999 USDT
BTC UP BY 0.00000000%
YOUR estimated balance Value : 11441553.18 USDT (1378.50038308 BTC)
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Current BTC value(last fills average):8299.99999998 USDT
BTC DOWN BY 0.00000000%
YOUR estimated balance Value : 11441553.18 USDT (1378.50038308 BTC)
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Current BTC value(last fills average):8299.98999997 USDT
BTC DOWN BY 0.00012048%
YOUR estimated balance Value : 11441539.39 USDT (1378.50038308 BTC)
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Current BTC value(last fills average):8299.996666616666 USDT
BTC UP BY 0.00008032%
YOUR estimated balance Value : 11441548.58 USDT (1378.50038308 BTC)
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

```
