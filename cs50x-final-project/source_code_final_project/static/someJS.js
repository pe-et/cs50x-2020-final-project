
function valid_range(id, def_val)
{
    //Get initial amount
    id = document.getElementById(id);
    var num = parseFloat(id.value);
    hide_show("none", "");

    if (num > 1e+8)
    {
        hide_show("block", "Max value: 100,000,000");
        num = def_val;
        id.value = num;
        return num;

    }
    else if (num < 0)
    {
        hide_show("block", "Stick to positive values...");
        num = def_val;
        id.value = num;
        return num;
    }

    return num;

}
// Hide / Show alerts
function hide_show(value, message)
{
    document.getElementById("value_alert").innerHTML = message;
    document.getElementById("value_range").style.display = value;
}

// Calculate amount of each quote currency to obtain
function quote_amount(amount, ratio)
{
    // Calculate new amount using ratio
    var new_amount = amount * ratio;

    return parseFloat(new_amount);
}

// Get currency rate
function rate(id)
{
    var rate = document.getElementById(id).value;

    return parseFloat(rate);
}

// Get currency symbol
function curr_sym(id)
{
    var sel = document.getElementById(id);
    var symbol = sel.options[sel.selectedIndex].text;

    return symbol;
}

// Convert to quote currency
function conversion_calc(amount, id)
{
    // Get quote symbol and rate
    var symbol = curr_sym(id);
    var quote_rate = rate(id);

    // Calculate corresponding amount in default base currency specified when getting API rates
    var base_rate = rate("base_currency");
    var def_equivalent = amount / base_rate;

    // Convert to quote currency
    conversion = def_equivalent * quote_rate;

    // Format numbers
    conversion = deci(symbol, conversion);

    return conversion;
}

// Format numbers
function deci(symbol, amount)
{
    var num;

    if (symbol == "BTC")
    {
        num = amount.toFixed(8);
    }
    else
    {
        num = amount.toFixed(2);
    }
    var f_num = parseFloat(num);

    return f_num;
}
// To currency format
function to_curr_format(num, symbol)
{
    var n;
    var currObj =
    {
        style: "currency",
        currency: symbol
    }

    if (symbol == "BTC")
    {
        n = symbol + " " + num;
    }
    else
    {
        n = num.toLocaleString("en-GB", currObj);
    }

    return n;

}

function change_ratio(ratio, id)
{
    document.getElementById(id).innerHTML = (ratio * 100).toFixed();
}

// polyconverter, main function
function convert(def_val)
{
    // Get initial amount and ensure amount is within valid range
    var base_amount = valid_range("base_currency_amount", def_val);

    // Get ratio for each quote currency
    var conversion_ratio = document.getElementById("conversion_ratio").value;
    var quote1_ratio = conversion_ratio / 100;
    var quote2_ratio = (100 - conversion_ratio) / 100;

    // Get currency symbols
    var base_symbol = curr_sym("base_currency");
    var quote1_symbol = curr_sym("quote_currency");
    var quote2_symbol = curr_sym("quote_currency2");

    // Calculate amount of each quote currency to obtain
    var quote1_amount = quote_amount(base_amount, quote1_ratio);
    var quote2_amount = quote_amount(base_amount, quote2_ratio);

    // Convert to quote currencies
    var quote1_conversion = conversion_calc(quote1_amount, "quote_currency");
    var quote2_conversion = conversion_calc(quote2_amount, "quote_currency2");

    // Conversion ratio
    change_ratio(quote1_ratio, "quote1_ratio");
    change_ratio(quote2_ratio, "quote2_ratio");

    // Additional results text
    change_ratio(quote1_ratio, "sub_txt_ratio1");
    change_ratio(quote2_ratio, "sub_txt_ratio2");
    document.getElementById("ini1").innerHTML = base_amount + " " + base_symbol;
    document.getElementById("ini2").innerHTML = base_amount + " " + base_symbol;

    // Display exchange rates
    document.getElementById("exchange_rate1").innerHTML = base_symbol + "/" + quote1_symbol +
        ": " + conversion_calc(1, "quote_currency");
    document.getElementById("exchange_rate2").innerHTML = base_symbol + "/" + quote2_symbol +
        ": " + conversion_calc(1, "quote_currency2");

    // Display conversion
    document.getElementById("quote1_conv").innerHTML = to_curr_format(quote1_conversion, quote1_symbol);
    document.getElementById("quote2_conv").innerHTML = to_curr_format(quote2_conversion, quote2_symbol);
}

// Savings calculator main function
function calc_total(def_val)
{
    // Get initial payment and ensure amount is within valid range
    var initial_payment = valid_range("initial_payment", def_val);

    // Calculate savings and total payment
    var savings_rate = rate("savings_rate");
    var savings = (savings_rate/100) * initial_payment;
    var total_payment = deci(base_symbol, (initial_payment + savings));

    // Get symbols
    var base_symbol = curr_sym("base_currency");
    var savings_symbol = curr_sym("savings_asset");

    // Get rates
    var base_currency_rate = rate("base_currency");
    var savings_asset_rate = rate("savings_asset");

    // Convert to savings asset
    var savings = conversion_calc(savings, "savings_asset");

    // Savings rate label
    document.getElementById("label_savings").innerHTML = savings_rate;

    // Exchange rate
    document.getElementById("savings_ex_rate").innerHTML = base_symbol + "/" + savings_symbol +
        ": " + conversion_calc(1, "savings_asset");

    // Display Results
    document.getElementById("ini_pay_res").innerHTML = to_curr_format(initial_payment, base_symbol);
    document.getElementById("tot_sav_res").innerHTML = to_curr_format(savings, savings_symbol);
    document.getElementById("tot_pay_res").innerHTML = to_curr_format(total_payment, base_symbol);
}
