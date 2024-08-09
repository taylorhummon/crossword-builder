from __future__ import annotations

from crossword_builder_api.lib.matcher import Matcher
from crossword_builder_api.lib.board import Board
from crossword_builder_api.lib.pattern import ActivePattern
from crossword_builder_api.utilities.character import (
    Character, SuggestableCharacter, Letter, FILLED_SQUARE
)


def build_suggestions(
    matcher: Matcher,
    board_width: int,
    board_height: int,
    squares: list[Character],
    active_index: int,
    can_suggest_filled: bool
) -> set[SuggestableCharacter]:
    board = Board(board_width, board_height, squares, active_index)
    pattern_a = board.horizontal_pattern_through_active_square()
    pattern_b = board.vertical_pattern_through_active_square()
    if can_suggest_filled:
        return _suggestions_when_can_suggest_filled(matcher, board, pattern_a, pattern_b)
    else:
        return _suggestions_when_cannot_suggest_fill(matcher, pattern_a, pattern_b)

def _suggestions_when_cannot_suggest_fill(
    matcher: Matcher,
    pattern_a: ActivePattern,
    pattern_b: ActivePattern
) -> set[Letter]:
    suggestions_a = _suggestions_for_pattern(matcher, pattern_a)
    suggestions_b = _suggestions_for_pattern(matcher, pattern_b)
    return suggestions_a.intersection(suggestions_b)

def _suggestions_when_can_suggest_filled(
    matcher: Matcher,
    board: Board,
    pattern_a: ActivePattern,
    pattern_b: ActivePattern
) -> set[SuggestableCharacter]:
    suggestions_a = _suggestions_for_all_subpatterns(matcher, pattern_a)
    suggestions_b = _suggestions_for_all_subpatterns(matcher, pattern_b)
    suggestions = suggestions_a.intersection(suggestions_b)
    if _will_suggest_fill(matcher, board):
        suggestions.add(FILLED_SQUARE)
    return suggestions

def _suggestions_for_all_subpatterns(
    matcher: Matcher,
    pattern: ActivePattern
) -> set[Letter]:
    return {
        suggestion
        for subpattern in pattern.subpatterns()
        for suggestion in _suggestions_for_pattern(matcher, subpattern)
    }

def _suggestions_for_pattern(
    matcher: Matcher,
    pattern: ActivePattern
) -> set[Letter]:
    return matcher.matching_letters(pattern)

def _will_suggest_fill(
    matcher: Matcher,
    board: Board
) -> bool:
    left_pattern = board.horizontal_pattern_through_active_square(end = board.active_column)
    if not _will_suggest_fill_trimming_left(matcher, left_pattern):
        return False
    right_pattern = board.horizontal_pattern_through_active_square(start = board.active_column)
    if not _will_suggest_fill_trimming_right(matcher, right_pattern):
        return False
    above_pattern = board.vertical_pattern_through_active_square(end = board.active_row)
    if not _will_suggest_fill_trimming_left(matcher, above_pattern):
        return False
    below_pattern = board.vertical_pattern_through_active_square(start = board.active_row)
    if not _will_suggest_fill_trimming_right(matcher, below_pattern):
        return False
    return True

def _will_suggest_fill_trimming_left(
    matcher: Matcher,
    pattern: ActivePattern
) -> bool:
    if pattern.active_index != len(pattern) - 1:
        raise Exception("expected rightmost character to be active")
    return any(
        matcher.has_match(subpattern.drop_rightmost_character())
        for subpattern in pattern.subpatterns_trimming_left()
    )

def _will_suggest_fill_trimming_right(
    matcher: Matcher,
    pattern: ActivePattern
) -> bool:
    if pattern.active_index != 0:
        raise Exception("expected leftmost character to be active")
    return any(
        matcher.has_match(subpattern.drop_leftmost_character())
        for subpattern in pattern.subpatterns_trimming_right()
    )
