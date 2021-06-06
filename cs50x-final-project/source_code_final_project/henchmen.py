import requests
import json

# Get fiat rates
def req_rates(currency_symbol):
    # Contant API
    try:
        response = requests.get(f"https://v6.exchangerate-api.com/v6/e150016b0c3aa3e19c26969d/latest/{currency_symbol}")
    except requests.exceptions.RequestException as err:
        raise SystemExit(err)
        return None


    # Create dict from fiat rates
    try:
        ret = response.json()
        conv_rates = ret['conversion_rates'].copy()
    except(KeyError, TypeError, ValueError):
        print("Error when parsing response")
        return None

    # Add BTC rate
    conv_rates["BTC"] = usd_btc(currency_symbol)

    return conv_rates


# Get btc price
def usd_btc(vs_):
    vs_ = vs_.lower()
    # Contact API
    try:
        response = requests.get(f"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies={vs_}")
    except requests.exceptions.RequestException as err:
        raise SystemExit(err)
        return None

    # Parse response
    try:
        ret = response.json()
        current_price = (1/ret['bitcoin'][vs_])
    except(KeyError, TypeError, ValueError):
        print("Error when parsing response")
        return None

    return current_price