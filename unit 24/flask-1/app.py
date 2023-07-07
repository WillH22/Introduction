from flask import Flask, request, render_template, redirect, flash
from forex_python.converter import CurrencyCodes
from currency import currency


app = Flask(__name__)
app.config['SECRET_KEY'] = "This-a-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
code = CurrencyCodes()


@app.route('/')
def form():

    return render_template('form.html')


@app.route('/results')
def results():
    convFrom = request.args.get('convert_from')
    convTo = request.args.get('convert_to')
    money = request.args.get('amount')

    for i in money:
        if i.isalpha() == False:
            if type(code.get_symbol(convFrom.upper())) is type(None):
                flash(f"Not a valid code {convFrom}")
                return redirect('/')

            elif type(code.get_symbol(convTo.upper())) is type(None):
                flash(f"Not a valid code {convTo}")
                return redirect('/')

            elif type(code.get_symbol(convTo.upper())) and type(code.get_symbol(convFrom.upper())) is str:
                return render_template('results.html', currency=currency(convTo, convFrom, money))
    flash('Not a valid amount')
    return redirect('/')
