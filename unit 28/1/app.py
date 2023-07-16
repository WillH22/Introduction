from flask import Flask, render_template, request, redirect
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"
debug = DebugToolbarExtension(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

# Connect the app to the database and create all tables
connect_db(app)
db.create_all()


@app.route('/')
def show_home_page():
    # Show home page and display all pets
    pets = Pet.query.all()
    return render_template('home.html', pets=pets)


@app.route('/add', methods=["GET", "POST"])
def add_pet():
    # Show and handle the add pet form
    form = AddPetForm()

    # Handle form submission
    if form.validate_on_submit():
        # Create a new Pet object and add it to the database
        pet = Pet(name=form.name.data.capitalize(),
                  species=form.species.data,
                  photo_url=form.photo_url.data or Pet.default_image,
                  age=form.age.data,
                  notes=form.notes.data)
        db.session.add(pet)
        db.session.commit()

        return redirect('/')

    # Render the add pet form template
    return render_template('add_pet.html', form=form)


@app.route('/<pet_id>', methods=["GET", "POST"])
def handle_pet(pet_id):
    # Show pet details and handle edits
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)

    # Handle form submission
    if form.validate_on_submit():
        # Update the pet object with new data from the form
        pet.photo_url = form.photo_url.data or Pet.default_image
        pet.notes = form.notes.data
        pet.available = form.available.data == 'True'
        db.session.commit()
        return redirect(f'/{pet_id}')

    # Render the pet details and edit form template
    return render_template('pet.html', form=form, pet=pet)
