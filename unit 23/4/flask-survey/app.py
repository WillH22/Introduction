from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "This-a-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

RESPONSES_KEY = "responses"


@app.route("/")
def show_survey_start():
    # Show the survey start page
    return render_template("start.html", survey=survey)


@app.route("/starting", methods=["POST"])
def start_survey():
    # Clear session
    session[RESPONSES_KEY] = []
    return redirect("/questions/0")


@app.route("/answer", methods=["POST"])
def handle_question():
    # take to the next question and save answers
    choice = request.form['answer']
    responses = session.get(RESPONSES_KEY, [])
    responses.append(choice)
    session[RESPONSES_KEY] = responses

    if len(responses) == len(survey.questions):
        return redirect("/thanks")
    else:
        return redirect(f"/questions/{len(responses)}")


@app.route("/questions/<int:qid>")
def show_question(qid):
    # Show the question
    responses = session.get(RESPONSES_KEY)

    if responses is None or len(responses) != qid:
        flash("Try again")
        return redirect("/")

    if len(responses) == len(survey.questions):
        return redirect("/thanks")

    question = survey.questions[qid].question  # Access the question attribute
    return render_template("question.html", question_num=qid, question=question)


@app.route("/thanks")
def thank_you():
    # Thank you page
    return render_template("thank_you.html")
