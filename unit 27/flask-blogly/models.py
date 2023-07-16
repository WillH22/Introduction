from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy()
db.init_app(app)

# Define the connect_db function to set up the database connection


def connect_db(app):
    db.app = app
    db.init_app(app)


# User Model representing the 'users' table
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    image_url = db.Column(db.String, nullable=False,
                          default="/static/default_image.png")

    posts = db.relationship('Post', backref='user', passive_deletes=True)

    def full_name(self):
        return f"{self.first_name} {self.last_name}"


# Post Model representing the 'posts' table
class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.TIMESTAMP, nullable=False, default=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="CASCADE"), nullable=False)


# Tag Model representing the 'tags' table
class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(15), nullable=False, unique=True)

    posts = db.relationship('Post', secondary='post_tag', backref='tags')

    # Method to fill tags for a post
    @classmethod
    def fill_tags(cls, tags, post_id):
        with app.app_context():  # Set the application context before interacting with the database
            post = Post.query.get(post_id)
            tags_objects = cls.query.filter(Tag.id.in_(map(int, tags))).all()
            post.tags.clear()
            post.tags.extend(tags_objects)
            db.session.commit()


# PostTag Model representing the 'post_tag' table
class PostTag(db.Model):
    __tablename__ = 'post_tag'

    post_id = db.Column(db.Integer, db.ForeignKey(
        'posts.id', ondelete="CASCADE"), primary_key=True, nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey(
        'tags.id', ondelete="CASCADE"), primary_key=True, nullable=False)


if __name__ == '__main__':
    connect_db(app)  # Call connect_db to set up the application context
    app.run(debug=True)
