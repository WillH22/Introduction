from flask import Flask, render_template, request, redirect
from models import db, connect_db, User, Post, Tag, PostTag
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

# Configuration settings
app.config['SECRET_KEY'] = "secret"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

# Enable Flask Debug Toolbar
debug = DebugToolbarExtension(app)

# Connect to the database and create all tables
connect_db(app)
db.create_all()


@app.route('/')
def redir():
    # Redirect to the users page when accessing the root URL.
    return redirect('/users')


@app.route('/users')
def show_users():
    # Display a list of all users.
    users = User.query.all()
    return render_template('users.html', users=users)


@app.route('/users/new')
def show_create_page():
    # Display the page to create a new user.
    return render_template('create.html')


@app.route('/', methods=["POST"])
def add_user():
    # Create a new user and add it to the database.
    first_name = request.form['firstname'].capitalize()
    last_name = request.form['lastname'].capitalize()
    image_url = request.form['image'] or None

    user = User(first_name=first_name,
                last_name=last_name, image_url=image_url)
    db.session.add(user)
    db.session.commit()

    return redirect(f"/users/{user.id}")


@app.route('/users/<int:user_id>')
def show_user(user_id):
    # Display a specific user's information.
    user = User.query.get_or_404(user_id)
    return render_template('user.html', user=user)


@app.route('/users/<int:user_id>/edit')
def show_user_edit(user_id):
    # Display the page to edit a specific user's information.
    user = User.query.get_or_404(user_id)
    return render_template('edit.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=["POST"])
def edit_user(user_id):
    # Edit a specific user's information and update the database.
    user = User.query.get(user_id)
    user.first_name = request.form['firstname'].capitalize()
    user.last_name = request.form['lastname'].capitalize()
    user.image_url = request.form['image'] or User.default_image

    db.session.commit()
    return redirect(f"/users/{user.id}")


@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    # Delete a specific user from the database.
    User.query.filter_by(id=user_id).delete()
    db.session.commit()
    return redirect('/users')


@app.route('/users/<int:user_id>/posts/new')
def new_post_form(user_id):
    # Display the page to create a new post for a specific user.
    user = User.query.get(user_id)
    tags = Tag.query.all()
    return render_template('newpost.html', user=user, tags=tags)


@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def make_post(user_id):
    # Create a new post for a specific user and add it to the database.
    title = request.form['title']
    content = request.form['content']

    post = Post(title=title, content=content, user_id=user_id)
    db.session.add(post)
    db.session.commit()

    tags = request.form.getlist('tags')
    Tag.fill_tags(tags, post.id)

    return redirect(f"/users/{user_id}")


@app.route('/posts/<int:post_id>')
def show_post(post_id):
    # Display a specific post's information.
    post = Post.query.get(post_id)
    return render_template('post.html', post=post)


@app.route('/posts/<int:post_id>/edit')
def edit_post_form(post_id):
    # Display the page to edit a specific post's information.
    post = Post.query.get(post_id)
    tags = Tag.query.all()
    return render_template('edit_post.html', post=post, tags=tags)


@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def edit_post(post_id):
    # Edit a specific post's information and update the database.
    post = Post.query.get(post_id)
    post.title = request.form['title']
    post.content = request.form['content']
    db.session.commit()

    tags = request.form.getlist('tags')
    Tag.fill_tags(tags, post.id)

    return redirect(f"/posts/{post.id}")


@app.route('/posts/<int:post_id>/delete', methods=["POST"])
def delete_post(post_id):
    # Delete a specific post from the database.
    post = Post.query.filter_by(id=post_id).first()
    user = post.user
    Post.query.filter_by(id=post_id).delete()
    db.session.commit()
    return redirect(f'/users/{user.id}')


@app.route('/tags')
def show_tags():
    # Display a list of all tags.
    tags = Tag.query.all()
    return render_template('tags.html', tags=tags)


@app.route('/tags/new')
def show_new_tag_form():
    # Display the page to create a new tag.
    return render_template('new_tag.html')


@app.route('/tags/new', methods=["POST"])
def add_tag():
    # Create a new tag and add it to the database.
    name = request.form['newtag'].capitalize()
    tag = Tag(name=name)

    db.session.add(tag)
    db.session.commit()
    return redirect('/tags')


@app.route('/tags/<int:tag_id>')
def show_tag_page(tag_id):
    # Display a specific tag's information.
    tag = Tag.query.get(tag_id)
    return render_template('tag.html', tag=tag)


@app.route('/tags/<int:tag_id>/edit')
def show_edit_tag_form(tag_id):
    # Display the page to edit a specific tag's information.
    tag = Tag.query.get(tag_id)
    return render_template('edit_tag.html', tag=tag)


@app.route('/tags/<int:tag_id>/edit', methods=["POST"])
def edit_tag(tag_id):
    # Edit a specific tag's information and update the database.
    tag = Tag.query.get(tag_id)
    name = request.form['edittag'].capitalize()
    tag.name = name

    db.session.commit()
    return redirect(f"/tags/{tag.id}")


@app.route('/tags/<int:tag_id>/delete', methods=["POST"])
def delete_tag(tag_id):
    # Delete a specific tag from the database.
    Tag.query.filter_by(id=tag_id).delete()
    db.session.commit()
    return redirect('/tags')
