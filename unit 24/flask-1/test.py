import unittest
from app import app


class AppTestCase(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def test_form(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Currency Converter', response.data)

    def test_results_valid_codes(self):
        response = self.app.get(
            '/results?convert_from=USD&convert_to=EUR&amount=100')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Currency Results', response.data)

    def test_results_invalid_from_code(self):
        response = self.app.get(
            '/results?convert_from=ABC&convert_to=EUR&amount=100', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Not a valid code', response.data)

    def test_results_invalid_to_code(self):
        response = self.app.get(
            '/results?convert_from=USD&convert_to=XYZ&amount=100', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Not a valid code', response.data)

    def test_results_invalid_amount(self):
        response = self.app.get(
            '/results?convert_from=USD&convert_to=EUR&amount=abc', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Not a valid amount', response.data)


if __name__ == '__main__':
    unittest.main()
