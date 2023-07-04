# Put your app in here.
from flask import Flask, request
from operations import add, mult, sub, div


app = Flask(__name__)


@app.route('/add')
def adding():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))

    return str(add(a, b))


@app.route('/sub')
def subtracting():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))

    return str(sub(a, b))


@app.route('/mult')
def multiplying():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))

    return str(mult(a, b))


@app.route('/div')
def dividing():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))

    return str(div(a, b))
