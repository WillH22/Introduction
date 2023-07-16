from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, RadioField
from wtforms.validators import InputRequired, Optional, URL, NumberRange


class PetForm(FlaskForm):
    # Common fields and validators for both AddPetForm and EditPetForm

    name = StringField('Pet Name', validators=[
                       InputRequired(message='Must enter a name')])
    species = SelectField('Species', choices=[('Cat', 'Cat'), ('Dog', 'Dog'), ('Porcupine', 'Porcupine')],
                          validators=[InputRequired(message='Must select a species')])
    photo_url = StringField('Photo URL', validators=[
                            Optional(), URL(message='Must be a valid URL')])
    age = IntegerField('Age', validators=[
                       Optional(), NumberRange(min=0, max=30)])
    notes = StringField('Notes')


class AddPetForm(PetForm):
    # Form for adding a new pet
    pass


class EditPetForm(PetForm):
    # Form for editing an existing pet
    available = RadioField('Available', choices=[(True, 'Yes'), (False, 'No')])
    # Additional field for the EditPetForm to represent pet availability
