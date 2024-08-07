from __future__ import annotations
import re

from crossword_builder_api.lib.words_finder import WordsFinder
from crossword_builder_api.models.suggestions_lists import SuggestionsListInParams
from crossword_builder_api.lib.board import Board
from crossword_builder_api.lib.subpatterns import (
    compute_subpatterns,
    compute_subpatterns_trim_left,
    compute_subpatterns_trim_right
)
from crossword_builder_api.utilities.character import FILLED_SQUARE


def build_suggestions_list(
    words_finder: WordsFinder,
    suggestions_list_in_params: SuggestionsListInParams
) -> set[str]:
    board = Board(
        width=suggestions_list_in_params.boardWidth,
        height=suggestions_list_in_params.boardHeight,
        squares=suggestions_list_in_params.squares,
        active_square_index=suggestions_list_in_params.activeSquareIndex
    )
    if suggestions_list_in_params.canSuggestFill:
        return _when_can_suggest_fill(words_finder, board)
    else:
        return _when_cannot_suggest_fill(words_finder, board)

def _when_cannot_suggest_fill(
    words_finder: WordsFinder,
    board: Board
) -> set[str]:
    horizontal_pattern = board.horizontal_pattern_for(board.left_bound(), board.right_bound())
    vertical_pattern = board.vertical_pattern_for(board.top_bound(), board.bottom_bound())
    suggestions_set_a = _get_suggestions_set_for_pattern(words_finder, horizontal_pattern)
    suggestions_set_b = _get_suggestions_set_for_pattern(words_finder, vertical_pattern)
    return suggestions_set_a.intersection(suggestions_set_b)

def _when_can_suggest_fill(
    words_finder: WordsFinder,
    board: Board
) -> set[str]:
    horizontal_pattern = board.horizontal_pattern_for(board.left_bound(), board.right_bound())
    vertical_pattern = board.vertical_pattern_for(board.top_bound(), board.bottom_bound())
    suggestions_set_a = _get_suggestions_set_for_all_subpatterns(words_finder, horizontal_pattern)
    suggestions_set_b = _get_suggestions_set_for_all_subpatterns(words_finder, vertical_pattern)
    suggestions_set = suggestions_set_a.intersection(suggestions_set_b)
    if _will_suggest_fill(words_finder, board):
        return suggestions_set.union([FILLED_SQUARE])
    else:
        return suggestions_set

def _get_suggestions_set_for_all_subpatterns(
    words_finder: WordsFinder,
    pattern: str
) -> set[str]:
    suggestions_set = set()
    subpatterns = compute_subpatterns(pattern)
    for subpattern in subpatterns:
        for suggestion in _get_suggestions_set_for_pattern(words_finder, subpattern):
            suggestions_set.add(suggestion)
    return suggestions_set

def _get_suggestions_set_for_pattern(
    words_finder: WordsFinder,
    pattern: str
) -> set[str]:
    suggestions_set = set()
    index = pattern.index("@")
    regular_expression = _regular_expression_for(pattern)
    words = words_finder.words_of_length(len(pattern))
    for word in words:
        if regular_expression.match(word):
            suggestions_set.add(word[index:index + 1])
    return suggestions_set

def _regular_expression_for(
    pattern: str
) -> re.Pattern:
    characters = [
        _replace_at_symbol_with_period(character)
        for character in pattern
    ]
    regular_expression_pattern_string = "".join(characters)
    return re.compile(f"^{regular_expression_pattern_string}$")

def _replace_at_symbol_with_period(
    character: str
) -> str:
    if character == '@':
        return '.'
    else:
        return character

def _will_suggest_fill(
    words_finder: WordsFinder,
    board: Board
) -> bool:
    left_pattern = board.horizontal_pattern_for(board.left_bound(), board.active_column)
    fill_ok_for_left = _will_suggest_fill_trim_left(words_finder, left_pattern)
    if not fill_ok_for_left:
        return False
    right_pattern = board.horizontal_pattern_for(board.active_column, board.right_bound())
    fill_ok_for_right = _will_suggest_fill_trim_right(words_finder, right_pattern)
    if not fill_ok_for_right:
        return False
    top_pattern = board.vertical_pattern_for(board.top_bound(), board.active_row)
    fill_ok_for_top = _will_suggest_fill_trim_left(words_finder, top_pattern)
    if not fill_ok_for_top:
        return False
    bottom_pattern = board.vertical_pattern_for(board.active_row, board.bottom_bound())
    fill_ok_for_bottom = _will_suggest_fill_trim_right(words_finder, bottom_pattern)
    if not fill_ok_for_bottom:
        return False
    return True

def _will_suggest_fill_trim_left(
    words_finder: WordsFinder,
    pattern: str
) -> bool:
    if pattern[-1] != "@":
        raise Exception("expected @ as last character")
    subpatterns = compute_subpatterns_trim_left(pattern)
    if "@" in subpatterns:
        return True
    for subpattern in subpatterns:
        if _has_match(words_finder, subpattern[:-1]):
            return True
    return False

def _will_suggest_fill_trim_right(
    words_finder: WordsFinder,
    pattern: str
) -> bool:
    if pattern[0] != "@":
        raise Exception("expected @ as first character")
    subpatterns = compute_subpatterns_trim_right(pattern)
    if "@" in subpatterns:
        return True
    for subpattern in subpatterns:
        if _has_match(words_finder, subpattern[1:]):
            return True
    return False

def _has_match(
    words_finder: WordsFinder,
    pattern: str
) -> bool:
    regular_expression = re.compile(f"^{pattern}$")
    words = words_finder.words_of_length(len(pattern))
    for word in words:
        if regular_expression.match(word):
            return True
    return False
