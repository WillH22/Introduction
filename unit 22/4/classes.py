import random


class SerialGenerator:
    def __init__(self, start=0):
        self.start = start
        self.current = start

    def generate(self):
        serial = self.current
        self.current += 1
        return serial

    def reset(self):
        self.current = self.start


class WordFinder:
    def __init__(self, file_path):
        self.words = self.read_words(file_path)
        self.num_words = len(self.words)
        print(f"{self.num_words} words read")

    def read_words(self, file_path):
        with open(file_path, 'r') as file:
            words = [word.strip() for word in file]
        return words

    def random(self):
        return random.choice(self.words)
