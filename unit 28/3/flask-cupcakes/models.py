from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    # Connect to database.

    db.app = app
    db.init_app(app)


class Cupcake(db.Model):
    # Model representing a cupcake in the Cupcake app.

    # Table name in the database
    __tablename__ = "cupcakes"

    # Columns of the table
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.String, nullable=False)
    size = db.Column(db.String, nullable=False)
    rating = db.Column(db.Float, nullable=False)

    # Image URL for the cupcake, with a default value if not provided
    image = db.Column(
        db.String,
        nullable=False,
        default='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2w_-t63ms4hAzr_l49HAmQh1CSbud9F8unQ&usqp=CAU'
    )

    def serialize(self):
        """Serialize Cupcake model data for JSON response.

        Returns:
            dict: Serialized Cupcake data as a dictionary.
        """
        return {
            'id': self.id,
            'flavor': self.flavor,
            'size': self.size,
            'rating': self.rating,
            'image': self.image,
        }
