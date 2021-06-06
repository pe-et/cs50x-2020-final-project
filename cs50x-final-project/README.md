# Introduction
This project was created as my final project for the course CS50x.
The project is a web application aptly(?) named The Interactive-Consumption-Saver-Poly-Currency-Conversion-Hedger. 
In short, The ISCSPCCH consists of two parts.
A 'savings calculator' of sorts (The ISC), and a poly-currency converter (The PCCH).

## Purpose
To play around with some ideas, and improve my proficiency in the languages, modules, frameworks and applications used to build the project.

The savings calculator is intended as a manual demonstration of what could be implemented as an automatic process, integrated with any payment solution in order to automate individual investment and savings.

The poly-currency converter could be useful(debatable) in terms of mitigating exchange-rate risk, in light of current uncertain macroeconomic conditions.

## Usage

The savings calculator (The ISC), adds a custom so-called 'savings rate' to any expense.
The user specifies the initial amount and payment currency, adjusts the savings rate and selects what currency or asset to allocate savings in. 
For example, a payment of 100 US dollars, with a savings rate of 2 %, selecting BTC as the savings asset of choice. Yields a total payment of 102 USD, of which 0.00011 BTC (equates to 2 USD at current rate) will be allocated to the user's savings account.

The poly-currency converter (The PCCH), converts the base currency into two different quote currencies according to a customizable ratio. Default ratio is set to 50/50.
If the user just wants a regular currency converter (i.e. a single quote currency) the ratio can simply be adjusted accordingly.

## Technical
The web application was developed and tested using the [CS50 IDE](https://ide.cs50.io).

Built with:
* Python 3.7
* Flask framework
* JSON
* JavaScript
* HTML & CSS
* Bootstrap 4

## Launch
Within the project's root directory. Type the following command:
```bash
$ flask run
```
Click the URL displayed in your terminal window to view the application. 

## Sources
50+ fiat currency exchange rates provided by [Exchange rates API](https://exchangeratesapi.io/).
Bitcoin exchange rate provided by [Coingecko API](https://www.coingecko.com/en/api).