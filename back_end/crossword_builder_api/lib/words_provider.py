from __future__ import annotations
import os.path
import re


UPPER_CASE_WORD_REGULAR_EXPRESSION = re.compile('^[A-Z]*$')
MIN_WORD_LENGTH = 1
MAX_WORD_LENGTH = 10

class WordsProvider:
    def __init__(
        self: WordsProvider
    ) -> None:
        self._words_lists: list[list[str]]
        self._words_lists = [
            _load_words_of_length(length)
            for length in range(MAX_WORD_LENGTH + 1)
        ]

    def words_of_length(
        self: WordsProvider,
        length: int
    ) -> list[str]:
        if length < MIN_WORD_LENGTH or length > MAX_WORD_LENGTH:
            return []
        else:
            return self._words_lists[length]


def _load_words_of_length(
    length: int
) -> list[str]:
    if length < MIN_WORD_LENGTH or length > MAX_WORD_LENGTH:
        return []
    filename = f"word_lists/words{length}.txt"
    if not os.path.isfile(filename):
        raise Exception(f"file does not exist: {filename}")
    with open(filename) as f:
        return [
            word
            for word in f.read().splitlines()
            if UPPER_CASE_WORD_REGULAR_EXPRESSION.match(word)
        ]
