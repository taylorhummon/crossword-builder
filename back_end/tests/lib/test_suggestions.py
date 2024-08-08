from __future__ import annotations
from typing import cast

from crossword_builder_api.lib.suggestions import build_suggestions
from crossword_builder_api.lib.words_provider import WordsProvider
from crossword_builder_api.utilities.character import build_letters
from crossword_builder_api.models.suggestions_lists import SuggestionsListInParams


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

def test_build_suggestions_when_active_square_is_empty_and_cannot_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 1,
        squares = ["A", "C", "E", "□"],
        activeIndex = 3,
        canSuggestFill = False
    )
    suggestions_list = build_suggestions(mock_words_provider, suggestions_list_in_params)
    assert suggestions_list == { "D", "R", "S" }

def test_build_suggestions_when_active_square_is_filled_and_cannot_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 1,
        squares = ["A", "C", "E", "■"],
        activeIndex = 3,
        canSuggestFill = False
    )
    suggestions_list = build_suggestions(mock_words_provider, suggestions_list_in_params)
    assert suggestions_list == { "D", "R", "S" }

def test_build_suggestions_when_active_square_is_a_letter_and_cannot_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 1,
        squares = ["A", "C", "E", "D"],
        activeIndex = 3,
        canSuggestFill = False
    )
    suggestions_list = build_suggestions(mock_words_provider, suggestions_list_in_params)
    assert suggestions_list == { "D", "R", "S" }

def test_build_suggestions_when_constrained_in_two_dimensions_and_cannot_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 3,
        squares = [
          "A", "C", "E", "■",
          "■", "A", "■", "O",
          "□", "T", "A", "G",
        ],
        activeIndex = 3,
        canSuggestFill = False
    )
    suggestions_list = build_suggestions(mock_words_provider, suggestions_list_in_params)
    assert suggestions_list == { "D", "S" }

def test_build_suggestions_when_active_square_is_surrounded_by_filled_squares_and_can_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 1,
        squares = ["A", "□", "□", "□"],
        activeIndex = 2,
        canSuggestFill = True
    )
    suggestions_list = build_suggestions(mock_words_provider, suggestions_list_in_params)
    assert suggestions_list == set(["■"]).union(build_letters())

def test_build_suggestions_when_active_square_is_adjacent_to_letter_and_can_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 1,
        squares = ["A", "□", "□", "□"],
        activeIndex = 1,
        canSuggestFill = True
    )
    suggestions_list = build_suggestions(mock_words_provider, suggestions_list_in_params)
    assert suggestions_list == { "B", "C", "T", "■" }

def test_build_suggestions_when_active_square_is_between_letters_and_can_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 1,
        squares = ["A", "□", "S", "□"],
        activeIndex = 1,
        canSuggestFill = True
    )
    suggestions_list = build_suggestions(mock_words_provider, suggestions_list_in_params)
    assert suggestions_list == { "B", "■" }


def test_build_suggestions_when_constrained_in_two_dimensions_and_can_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 3,
        squares = [
          "A", "C", "E", "■",
          "■", "A", "■", "O",
          "□", "T", "A", "G",
        ],
        activeIndex = 3,
        canSuggestFill = True
    )
    suggestions_list = build_suggestions(mock_words_provider, suggestions_list_in_params)
    assert suggestions_list == { "D", "S", "■" }
