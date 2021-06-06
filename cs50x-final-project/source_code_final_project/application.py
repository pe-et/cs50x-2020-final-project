# "Interactive-Consumption-Saver (ICS)": Initially a good way to add automatic investing to expenses.
# One could also argue that it's simply a sales tax issued by yourself, to yourself.
# "Poly-Currency-Converter-Hedger (PCCH)": Because why not apply risk mitigation to your currency exchanges as well?
# The superfluous addition of complexity was compensated by leaving out a 'convert' button. After all, it's interactive, so why add buttons...
# Note on currency conversion: Decided to ignore floating point imprecision in this edition as it's not meant for 'live' performance.
# API key from Exchange-rate APIs is hardcoded. Generally bad practice but after talking to Exchange-rate API support and getting their approval, I decided
# to leave it in to alleviate third party code review. It's a free API key and in a worst case scenario it will be rate limited
# if someone decided to make requests in an 'over-eagerly fashion'.



import os
from henchmen import req_rates, usd_btc

from flask import Flask, render_template, request
import requests
import json

# Create flask instance
app = Flask(__name__)

@app.route("/")
def index():

    # Default values
    default_base_currency = "SEK"
    default_savings_asset = "BTC"
    initial_payment = 10
    savings_rate = 2 # Savings rate noted in percentage points

    # Currency conversion rates
    conversion_rates = req_rates(default_base_currency)

    return render_template("start.html", conversion_rates=conversion_rates, default_base_currency=default_base_currency, default_savings_asset=default_savings_asset,
        savings_rate=savings_rate, initial_payment=initial_payment)


@app.route("/poly_converter")
def poly_converter():

    # Default values
    default_base_currency = "USD"
    default_quote_currency1 = "EUR"
    default_quote_currency2 = "BTC"
    default_conversion_ratio = 50 # Default ratio set to 50/50
    initial_amount = 10;

    # Currency conversion rates
    conversion_rates = req_rates(default_base_currency)

    return render_template("poly_converter.html", conversion_rates=conversion_rates, default_base_currency=default_base_currency, default_quote_currency1=default_quote_currency1,
        default_quote_currency2=default_quote_currency2, default_conversion_ratio=default_conversion_ratio, initial_amount=initial_amount)