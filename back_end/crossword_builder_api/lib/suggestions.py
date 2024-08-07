from __future__ import annotations

from crossword_builder_api.lib.words_finder import WordsFinder
from crossword_builder_api.models.suggestions_lists import SuggestionsListInParams
from crossword_builder_api.lib.board import Board
from crossword_builder_api.lib.pattern import ActivePattern, Pattern
from crossword_builder_api.utilities.character import FILLED_SQUARE


def build_suggestions(
    words_finder: WordsFinder,
    params: SuggestionsListInParams
) -> set[str]:
    board = Board(
        width=params.boardWidth,
        height=params.boardHeight,
        squares=params.squares,
        active_index=params.activeIndex
    )
    if params.canSuggestFill:
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
    pattern_a = board.horizontal_pattern_for(board.left_bound(), board.right_bound())
    pattern_b = board.vertical_pattern_for(board.top_bound(), board.bottom_bound())
    suggestions_set_a = _get_suggestions_set_for_all_subpatterns(words_finder, pattern_a)
    suggestions_set_b = _get_suggestions_set_for_all_subpatterns(words_finder, pattern_b)
    suggestions_set = suggestions_set_a.intersection(suggestions_set_b)
    if _will_suggest_fill(words_finder, board):
        return suggestions_set.union([FILLED_SQUARE])
    else:
        return suggestions_set

def _get_suggestions_set_for_all_subpatterns(
    words_finder: WordsFinder,
    pattern: ActivePattern
) -> set[str]:
    suggestions_set = set()
    subpatterns = pattern.compute_subpatterns()
    for subpattern in subpatterns:
        for suggestion in _get_suggestions_set_for_pattern(words_finder, subpattern):
            suggestions_set.add(suggestion)
    return suggestions_set

def _get_suggestions_set_for_pattern(
    words_finder: WordsFinder,
    pattern: ActivePattern
) -> set[str]:
    suggestions_set = set()
    i = pattern.active_index
    regular_expression = pattern.as_regular_expression()
    words = words_finder.words_of_length(len(pattern))
    for word in words:
        if regular_expression.match(word):
            letter = word[i : i + 1]
            suggestions_set.add(letter)
    return suggestions_set

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
    pattern: ActivePattern
) -> bool:
    if pattern.active_index != len(pattern) - 1:
        raise Exception("expected last character to be active")
    subpatterns = pattern.compute_subpatterns_trim_left()
    if any(len(subpattern) == 1 for subpattern in subpatterns):
        return True
    for subpattern in subpatterns:
        if _has_match(words_finder, subpattern.drop_last_character()):
            return True
    return False

def _will_suggest_fill_trim_right(
    words_finder: WordsFinder,
    pattern: ActivePattern
) -> bool:
    if pattern.active_index != 0:
        raise Exception("expected first character to be active")
    subpatterns = pattern.compute_subpatterns_trim_right()
    if any(len(subpattern) == 1 for subpattern in subpatterns):
        return True
    for subpattern in subpatterns:
        if _has_match(words_finder, subpattern.drop_first_character()):
            return True
    return False

def _has_match(
    words_finder: WordsFinder,
    pattern: Pattern
) -> bool:
    regular_expression = pattern.as_regular_expression()
    words = words_finder.words_of_length(len(pattern))
    for word in words:
        if regular_expression.match(word):
            return True
    return False
