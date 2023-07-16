"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


from app import app
import os
from unittest import TestCase
from sqlalchemy import exc

from models import db, User, Message, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app


# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""
        db.drop_all()
        db.create_all()

        # Create test users
        self.u1 = User.signup("test1", "test1@test.com", "password", None)
        self.u2 = User.signup("test2", "test2@test.com", "password", None)

        db.session.commit()

        self.client = app.test_client()

    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res

    def test_user_follows(self):
        # Test if users can follow each other
        self.u1.following.append(self.u2)
        db.session.commit()

        # Test followers and following
        self.assertEqual(len(self.u2.followers), 1)
        self.assertEqual(len(self.u1.followers), 0)
        self.assertEqual(len(self.u1.following), 1)
        self.assertEqual(len(self.u2.following), 0)
        self.assertEqual(self.u1.following[0].id, self.u2.id)
        self.assertEqual(self.u2.followers[0].id, self.u1.id)

    def test_is_following(self):
        self.u1.following.append(self.u2)
        db.session.commit()

        # Test if is_following correctly detects the relationship
        self.assertTrue(self.u1.is_following(self.u2))
        self.assertFalse(self.u2.is_following(self.u1))

    def test_is_followed_by(self):
        self.u1.following.append(self.u2)
        db.session.commit()

        # Test if is_followed_by correctly detects the relationship
        self.assertTrue(self.u2.is_followed_by(self.u1))
        self.assertFalse(self.u1.is_followed_by(self.u2))

    def test_valid_signup(self):
        # Test valid user signup
        test_user = User.signup(
            "test_user", "test_user@test.com", "password", None)
        db.session.commit()

        # Retrieve the user from the database and assert the attributes
        user = User.query.filter_by(username="test_user").one()
        self.assertEqual(user.username, "test_user")
        self.assertEqual(user.email, "test_user@test.com")
        self.assertEqual(user.image_url, "/static/images/default-pic.png")
        self.assertNotEqual(user.password, "password")
        self.assertTrue(user.password.startswith("$2b$"))

    def test_invalid_username_signup(self):
        # Test invalid username signup (None)
        with self.assertRaises(exc.IntegrityError):
            User.signup(None, "test_user@test.com", "password", None)
            db.session.commit()

    def test_invalid_email_signup(self):
        # Test invalid email signup (None)
        with self.assertRaises(exc.IntegrityError):
            User.signup("test_user", None, "password", None)
            db.session.commit()

    def test_invalid_password_signup(self):
        # Test invalid password signup (empty string)
        with self.assertRaises(ValueError):
            User.signup("test_user", "test_user@test.com", "", None)

        # Test invalid password signup (None)
        with self.assertRaises(ValueError):
            User.signup("test_user", "test_user@test.com", None, None)

    def test_valid_authentication(self):
        # Test valid user authentication
        user = User.authenticate(self.u1.username, "password")
        self.assertEqual(user.id, self.u1.id)

    def test_invalid_username(self):
        # Test invalid username authentication
        self.assertFalse(User.authenticate("wrong_username", "password"))

    def test_wrong_password(self):
        # Test wrong password authentication
        self.assertFalse(User.authenticate(self.u1.username, "wrong_password"))
