from forex_python.converter import CurrencyRates, CurrencyCodes

curre = CurrencyRates()
code = CurrencyCodes()


def currency(to_curr, from_curr, amount):
    symbol = code.get_symbol(to_curr.upper())
    result = "%.2f" % curre.convert(
        from_curr.upper(), to_curr.upper(), float(amount))
    return f"{symbol}{result}"
