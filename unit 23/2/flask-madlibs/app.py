from flask import Flask, render_template, request
from stories import story

app = Flask(__name__)


@app.route("/")
def home():
    # Render the homepage template with the prompts for the form
    return render_template("home.html", prompts=story.prompts)


@app.route("/story")
def show_story():

    answers = story.generate(request.args)
    # Render the story template with the original story (before user input)
    return render_template("story.html", story=answers)
