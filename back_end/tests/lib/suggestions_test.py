from __future__ import annotations

from crossword_builder_api.lib.suggestions import build_suggestions_list
from crossword_builder_api.utilities.alphabet import build_uppercase_alphabet
from crossword_builder_api.models.suggestions_lists import SuggestionsListInParams


WORDS_FOR_MOCK = build_uppercase_alphabet() + [
    "AC", "AT", "OG", "LA",
    "CAT", "ABS", "ACE", "DOG", "SAT", "SOG",
    "ACED", "ACES", "ACER", "CATS", "DOGS", "RACE", "SOGS"
]

class MockWordsFinder:
    def words_of_length(
        self: MockWordsFinder,
        length: int
    ) -> list[str]:
        return [
            word
            for word in WORDS_FOR_MOCK
            if len(word) == length
        ]

mock_words_finder = MockWordsFinder()

def test_build_suggestions_list_when_active_square_is_None_and_cannot_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 1,
        squareValues = ["A", "C", "E", None],
        activeSquareIndex = 3,
        canSuggestFill = False
    )
    suggestions_list = build_suggestions_list(mock_words_finder, suggestions_list_in_params)
    assert suggestions_list == { "D", "R", "S" }

def test_build_suggestions_list_when_active_square_is_filled_and_cannot_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 1,
        squareValues = ["A", "C", "E", "~"],
        activeSquareIndex = 3,
        canSuggestFill = False
    )
    suggestions_list = build_suggestions_list(mock_words_finder, suggestions_list_in_params)
    assert suggestions_list == { "D", "R", "S" }

def test_build_suggestions_list_when_active_square_is_a_letter_and_cannot_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 1,
        squareValues = ["A", "C", "E", "D"],
        activeSquareIndex = 3,
        canSuggestFill = False
    )
    suggestions_list = build_suggestions_list(mock_words_finder, suggestions_list_in_params)
    assert suggestions_list == { "D", "R", "S" }

def test_build_suggestions_list_when_constrained_in_two_dimensions_and_cannot_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 3,
        squareValues = [
          "A", "C", "E", "~",
          "~", "A", "~", "O",
          None, "T", "A", "G",
        ],
        activeSquareIndex = 3,
        canSuggestFill = False
    )
    suggestions_list = build_suggestions_list(mock_words_finder, suggestions_list_in_params)
    assert suggestions_list == { "D", "S" }

def test_build_suggestions_list_when_active_square_is_surrounded_by_filled_squares_and_can_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 1,
        squareValues = ["A", None, None, None],
        activeSquareIndex = 2,
        canSuggestFill = True
    )
    suggestions_list = build_suggestions_list(mock_words_finder, suggestions_list_in_params)
    assert suggestions_list == set(["~"]).union(build_uppercase_alphabet())

def test_build_suggestions_list_when_active_square_is_adjacent_to_letter_and_can_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 1,
        squareValues = ["A", None, None, None],
        activeSquareIndex = 1,
        canSuggestFill = True
    )
    suggestions_list = build_suggestions_list(mock_words_finder, suggestions_list_in_params)
    assert suggestions_list == { "B", "C", "T", "~" }

def test_build_suggestions_list_when_active_square_is_between_letters_and_can_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 1,
        squareValues = ["A", None, "S", None],
        activeSquareIndex = 1,
        canSuggestFill = True
    )
    suggestions_list = build_suggestions_list(mock_words_finder, suggestions_list_in_params)
    assert suggestions_list == { "B", "~" }


def test_build_suggestions_list_when_constrained_in_two_dimensions_and_can_suggest_fill():
    suggestions_list_in_params = SuggestionsListInParams(
        boardWidth = 4,
        boardHeight = 3,
        squareValues = [
          "A", "C", "E", "~",
          "~", "A", "~", "O",
          None, "T", "A", "G",
        ],
        activeSquareIndex = 3,
        canSuggestFill = True
    )
    suggestions_list = build_suggestions_list(mock_words_finder, suggestions_list_in_params)
    assert suggestions_list == { "D", "S", "~" }