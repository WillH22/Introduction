from unittest import TestCase
from app import app, boggle_game
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def setUp(self):
        """Stuff to do before every test."""
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        """Make sure information is in the session and HTML is displayed"""
        with self.client:
            response = self.client.get('/')
            self.assertIn('board', session)
            self.assertIsNone(session.get('user_score'))
            self.assertIsNone(session.get('game_count'))
            self.assertIn(b'We Boggling', response.data)
            self.assertIn(b'Time:', response.data)
            self.assertIn(b'Total score:', response.data)
            self.assertIn(b'Game #', response.data)

    def test_valid_word(self):
        """Test if word is valid by modifying the board in the session"""
        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [["C", "A", "T", "T", "T"],
                                 ["C", "A", "T", "T", "T"],
                                 ["C", "A", "T", "T", "T"],
                                 ["C", "A", "T", "T", "T"],
                                 ["C", "A", "T", "T", "T"]]
        response = self.client.post('/word', json={'word': 'cat'})
        self.assertEqual(response.json['result'], 'ok')

    def test_invalid_word(self):
        """Test if word is in the dictionary"""
        self.client.get('/')
        response = self.client.post('/word', json={'word': 'impossible'})
        self.assertEqual(response.json['result'], 'not-on-board')

    def test_non_english_word(self):
        """Test if word is on the board"""
        self.client.get('/')
        response = self.client.post(
            '/word', json={'word': 'fsjdakfkldsfjdslkfjdlksf'})
        self.assertEqual(response.json['result'], 'not-word')
