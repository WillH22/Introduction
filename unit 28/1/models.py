from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class Pet(db.Model):
    """Class for all pets"""

    __tablename__ = 'pets'

    default_image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwTCFl-T8h2j-ONz0jJ2nTMSs7isfiGuyoetIE-hNQvA&s'

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    name = db.Column(db.String(20),
                     nullable=False)

    species = db.Column(db.String(25),
                        nullable=False)

    photo_url = db.Column(db.String,
                          nullable=False,
                          default=default_image)

    age = db.Column(db.Integer)

    notes = db.Column(db.String)

    available = db.Column(db.Boolean,
                          nullable=False,
                          default=True)
