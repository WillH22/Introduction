from flask import Flask, request, render_template, redirect, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from boggle import Boggle

boggle_game = Boggle()


app = Flask(__name__)
app.config['SECRET_KEY'] = "helloworld"
app.debug = True
DebugToolbarExtension(app)

'''call the first time to load board with letters and create templet with html tags'''


@app.route('/')
def home():
    '''getting board list to create session with current board'''
    letters_board = boggle_game.make_board()
    session["board"] = letters_board

    '''create user's attribute session to keep track scores and count games'''
    if not session.get('user_score'):
        session['user_score'] = None
    if not session.get('game_count'):
        session['game_count'] = None  # Update to None instead of 1
    else:
        game = int(session['game_count'])
        game += 1
        session['game_count'] = game

    '''trace words list, user cannot resubmit the same word during the game'''
    session['trace_words'] = []

    return render_template("index.html", letters_board=letters_board)


'''call by ajax request check if word on board and exists send back result as JSON data'''


@app.route('/word', methods=["POST"])
def check_word():

    word_request = request.get_json()

    word = word_request['word']

    list_of_words = session.get('trace_words', [])

    '''
    check if a word in the list of the currant game if yes rases warning on the user interface
    if word is not in list increases the score of the user and append the word to the list
    '''
    if word.lower() in list_of_words:
        response = jsonify(result="The same word is not allowed!")
    else:
        letters_board = session['board']
        result_word = boggle_game.check_valid_word(letters_board, word)

        if result_word == 'ok':
            list_of_words.append(word.lower())
            session['trace_words'] = list_of_words

        response = jsonify(result=result_word)

    return response


'''
call by ajax request to apply a new score 
after send back upgraded data to the user interface
'''


@app.route('/score', methods=["POST"])
def user_score():

    score_request = request.get_json()

    '''
    import pdb
    pdb.set_trace()
    '''

    user_score = int(session['user_score'])
    user_score += int(score_request['score'])
    session['user_score'] = user_score

    return jsonify(score=user_score)
