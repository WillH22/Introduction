from unittest import TestCase
from app import app, db
from models import User, Post

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False
app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']


class BloglyTestCase(TestCase):

    def setUp(self):
        # Set up the test client and create the test database
        self.client = app.test_client()
        db.drop_all()
        db.create_all()

    def tearDown(self):
        # Rollback any changes made during the test
        db.session.rollback()

    def test_full_name(self):
        # Test the full_name method of the User model
        user = User(first_name="Bob", last_name="Smith")
        self.assertEqual(user.full_name(), "Bob Smith")

    def test_users(self):
        # Test the /users route to see if it displays user information correctly
        user = User(first_name='Bob', last_name='Smith',
                    image_url="/static/default_image.png")
        db.session.add(user)
        db.session.commit()

        resp = self.client.get('/users')
        html = resp.get_data(as_text=True)

        self.assertEqual(resp.status_code, 200)
        self.assertIn('Bob Smith', html)

    def test_user(self):
        # Test the /users/<user_id> route to see if it displays user information correctly
        user = User(first_name='Bob', last_name='Smith',
                    image_url="/static/default_image.png")
        db.session.add(user)
        db.session.commit()

        resp = self.client.get(f"/users/{user.id}")
        html = resp.get_data(as_text=True)

        self.assertEqual(resp.status_code, 200)
        self.assertIn('<h1>Bob Smith</h1>', html)

    def test_add_user(self):
        # Test adding a new user
        data = {"firstname": "Frank", "lastname": "Rice",
                "image": "/static/default_image.png"}
        resp = self.client.post('/', data=data, follow_redirects=True)
        html = resp.get_data(as_text=True)

        self.assertEqual(resp.status_code, 200)
        self.assertIn('<h1>Frank Rice</h1>', html)

    def test_edit_user(self):
        # Test editing a user's information
        user = User(first_name='Bob', last_name='Smith',
                    image_url="/static/default_image.png")
        db.session.add(user)
        db.session.commit()

        data = {"firstname": "Frank", "lastname": "Rice",
                "image": "/static/default_image.png"}
        resp = self.client.post(
            f"/users/{user.id}/edit", data=data, follow_redirects=True)
        html = resp.get_data(as_text=True)

        self.assertEqual(resp.status_code, 200)
        self.assertIn('<h1>Frank Rice</h1>', html)

    def test_make_post(self):
        # Test creating a new post for a user
        user = User(first_name='Bob', last_name='Smith',
                    image_url="/static/default_image.png")
        db.session.add(user)
        db.session.commit()

        data = {"title": "New Post",
                "content": "This is a new post", "user_id": user.id}
        resp = self.client.post(
            f'/users/{user.id}/posts/new', data=data, follow_redirects=True)
        html = resp.get_data(as_text=True)

        self.assertEqual(resp.status_code, 200)
        self.assertIn('New Post', html)

    def test_delete_post(self):
        # Test deleting a post
        user = User(first_name='Bob', last_name='Smith',
                    image_url="/static/default_image.png")
        db.session.add(user)
        db.session.commit()

        post = Post(title='Title', content='Content', user_id=user.id)
        db.session.add(post)
        db.session.commit()

        resp = self.client.post(
            f'/posts/{post.id}/delete', follow_redirects=True)
        html = resp.get_data(as_text=True)

        self.assertEqual(resp.status_code, 200)
        self.assertNotIn('Title', html)  # Check if the post is deleted
