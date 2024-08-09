from __future__ import annotations
from typing import cast

from crossword_builder_api.lib.suggestions import build_suggestions
from crossword_builder_api.lib.words_provider import WordsProvider
from crossword_builder_api.lib.matcher import Matcher
from crossword_builder_api.utilities.character import build_letters


WORDS_FOR_MOCK = build_letters() + [
    "AC", "AT", "OG", "LA",
    "CAT", "ABS", "ACE", "DOG", "SAT", "SOG",
    "ACED", "ACES", "ACER", "CATS", "DOGS", "RACE", "SOGS"
]

class MockWordsProvider:
    def words_of_length(
        self: MockWordsProvider,
        length: int
    ) -> list[str]:
        return [
            word
            for word in WORDS_FOR_MOCK
            if len(word) == length
        ]

mock_words_provider = cast(WordsProvider, MockWordsProvider())
matcher = Matcher(mock_words_provider)

def test_build_suggestions_when_active_square_is_empty_and_cannot_suggest_fill():
    suggestions = build_suggestions(
        matcher = matcher,
        board_width = 4,
        board_height = 1,
        squares = ["A", "C", "E", "□"],
        active_index = 3,
        can_suggest_filled = False
    )
    assert suggestions == { "D", "R", "S" }

def test_build_suggestions_when_active_square_is_filled_and_cannot_suggest_fill():
    suggestions = build_suggestions(
        matcher = matcher,
        board_width = 4,
        board_height = 1,
        squares = ["A", "C", "E", "■"],
        active_index = 3,
        can_suggest_filled = False
    )
    assert suggestions == { "D", "R", "S" }

def test_build_suggestions_when_active_square_is_a_letter_and_cannot_suggest_fill():
    suggestions = build_suggestions(
        matcher = matcher,
        board_width = 4,
        board_height = 1,
        squares = ["A", "C", "E", "D"],
        active_index = 3,
        can_suggest_filled = False
    )
    assert suggestions == { "D", "R", "S" }

def test_build_suggestions_when_constrained_in_two_dimensions_and_cannot_suggest_fill():
    suggestions = build_suggestions(
        matcher = matcher,
        board_width = 4,
        board_height = 3,
        squares = [
          "A", "C", "E", "■",
          "■", "A", "■", "O",
          "□", "T", "A", "G",
        ],
        active_index = 3,
        can_suggest_filled = False
    )
    assert suggestions == { "D", "S" }

def test_build_suggestions_when_active_square_is_surrounded_by_filled_squares_and_can_suggest_filled():
    suggestions = build_suggestions(
        matcher = matcher,
        board_width = 4,
        board_height = 1,
        squares = ["A", "□", "□", "□"],
        active_index = 2,
        can_suggest_filled = True
    )
    assert suggestions == set(["■"]).union(build_letters())

def test_build_suggestions_when_active_square_is_adjacent_to_letter_and_can_suggest_filled():
    suggestions = build_suggestions(
        matcher = matcher,
        board_width = 4,
        board_height = 1,
        squares = ["A", "□", "□", "□"],
        active_index = 1,
        can_suggest_filled = True
    )
    assert suggestions == { "B", "C", "T", "■" }

def test_build_suggestions_when_active_square_is_between_letters_and_can_suggest_filled():
    suggestions = build_suggestions(
        matcher = matcher,
        board_width = 4,
        board_height = 1,
        squares = ["A", "□", "S", "□"],
        active_index = 1,
        can_suggest_filled = True
    )
    assert suggestions == { "B", "■" }

def test_build_suggestions_when_constrained_in_two_dimensions_and_can_suggest_filled():
    suggestions = build_suggestions(
        matcher = matcher,
        board_width = 4,
        board_height = 3,
        squares = [
          "A", "C", "E", "■",
          "■", "A", "■", "O",
          "□", "T", "A", "G",
        ],
        active_index = 3,
        can_suggest_filled = True
    )
    assert suggestions == { "D", "S", "■" }
