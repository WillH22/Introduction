"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


from app import app
import os
from unittest import TestCase

from models import db, User, Message, Follows, Likes

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
    """Test User Model."""

    def setUp(self):
        """Create test client, add sample data."""
        # Drop and recreate the database tables
        db.drop_all()
        db.create_all()

        self.uid = 12345
        # Create a test user and add it to the database
        u = User.signup("test", "test@test.com", "password", None)
        u.id = self.uid
        db.session.add(u)
        db.session.commit()

        self.u = User.query.get(self.uid)

    def tearDown(self):
        # Rollback the database session to remove test data
        db.session.rollback()

    def test_user_model(self):
        """Test basic user model functionality."""
        # User should have no messages and no followers initially
        self.assertEqual(len(self.u.messages), 0)
        self.assertEqual(len(self.u.followers), 0)

    def test_message_model(self):
        """Test basic message model functionality."""
        m = Message(
            text="Testing 123...",
            user_id=self.uid
        )
        db.session.add(m)
        db.session.commit()

        # User should have one message after adding it
        self.assertEqual(len(self.u.messages), 1)
        self.assertEqual(self.u.messages[0].text, "Testing 123...")

    def test_message_likes(self):
        """Test when a new user likes another user's messages."""
        m1 = Message(
            text="Test 1",
            user_id=self.uid
        )
        m2 = Message(
            text="Test 2",
            user_id=self.uid
        )
        new_user = User.signup(
            "newtest", "new@test.com", "password", None)
        new_uid = 67890
        new_user.id = new_uid
        db.session.add_all([m1, m2, new_user])
        db.session.commit()

        # Append the message to the new user's likes
        new_user.likes.append(m1)
        db.session.commit()

        # Retrieve all likes of the new user
        likes = Likes.query.filter_by(user_id=new_user.id).all()

        # There should be one like and it should be for m1
        self.assertEqual(len(likes), 1)
        self.assertEqual(likes[0].message_id, m1.id)
