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
    pattern_a = board.horizontal_pattern_through_active_square(
        board.bound_left_of_active_square,
        board.bound_right_of_active_square
    )
    pattern_b = board.vertical_pattern_through_active_square(
        board.bound_above_active_square,
        board.bound_below_active_square
    )
    if params.canSuggestFill:
        return _suggestions_when_can_suggest_fill(words_finder, board, pattern_a, pattern_b)
    else:
        return _suggestions_when_cannot_suggest_fill(words_finder, pattern_a, pattern_b)

def _suggestions_when_cannot_suggest_fill(
    words_finder: WordsFinder,
    pattern_a: ActivePattern,
    pattern_b: ActivePattern
) -> set[str]:
    suggestions_a = _suggestions_for_pattern(words_finder, pattern_a)
    suggestions_b = _suggestions_for_pattern(words_finder, pattern_b)
    return suggestions_a.intersection(suggestions_b)

def _suggestions_when_can_suggest_fill(
    words_finder: WordsFinder,
    board: Board,
    pattern_a: ActivePattern,
    pattern_b: ActivePattern
) -> set[str]:
    suggestions_a = _suggestions_for_all_subpatterns(words_finder, pattern_a)
    suggestions_b = _suggestions_for_all_subpatterns(words_finder, pattern_b)
    suggestions = suggestions_a.intersection(suggestions_b)
    if _will_suggest_fill(words_finder, board):
        suggestions.add(FILLED_SQUARE)
    return suggestions

def _suggestions_for_all_subpatterns(
    words_finder: WordsFinder,
    pattern: ActivePattern
) -> set[str]:
    return {
        suggestion
        for subpattern in pattern.subpatterns()
        for suggestion in _suggestions_for_pattern(words_finder, subpattern)
    }

def _suggestions_for_pattern(
    words_finder: WordsFinder,
    pattern: ActivePattern
) -> set[str]:
    i = pattern.active_index
    regular_expression = pattern.as_regular_expression()
    words = words_finder.words_of_length(len(pattern))
    return {
        word[i : i + 1]
        for word in words
        if regular_expression.match(word)
    }

def _will_suggest_fill(
    words_finder: WordsFinder,
    board: Board
) -> bool:
    left_pattern = board.horizontal_pattern_through_active_square(
        board.bound_left_of_active_square,
        board.active_column
    )
    if not _will_suggest_fill_trim_left(words_finder, left_pattern):
        return False
    right_pattern = board.horizontal_pattern_through_active_square(
        board.active_column,
        board.bound_right_of_active_square
    )
    if not _will_suggest_fill_trim_right(words_finder, right_pattern):
        return False
    top_pattern = board.vertical_pattern_through_active_square(
        board.bound_above_active_square,
        board.active_row
    )
    if not _will_suggest_fill_trim_left(words_finder, top_pattern):
        return False
    bottom_pattern = board.vertical_pattern_through_active_square(
        board.active_row,
        board.bound_below_active_square
    )
    if not _will_suggest_fill_trim_right(words_finder, bottom_pattern):
        return False
    return True

def _will_suggest_fill_trim_left(
    words_finder: WordsFinder,
    pattern: ActivePattern
) -> bool:
    if pattern.active_index != len(pattern) - 1:
        raise Exception("expected last character to be active")
    subpatterns = pattern.subpatterns_trimming_left()
    if any(
        len(subpattern) == 1
        for subpattern in subpatterns
    ):
        return True
    return any(
        _has_match(words_finder, subpattern.drop_last_character())
        for subpattern in subpatterns
    )

def _will_suggest_fill_trim_right(
    words_finder: WordsFinder,
    pattern: ActivePattern
) -> bool:
    if pattern.active_index != 0:
        raise Exception("expected first character to be active")
    subpatterns = pattern.subpatterns_trimming_right()
    if any(
        len(subpattern) == 1
        for subpattern in subpatterns
    ):
        return True
    return any(
        _has_match(words_finder, subpattern.drop_first_character())
        for subpattern in subpatterns
    )

def _has_match(
    words_finder: WordsFinder,
    pattern: Pattern
) -> bool:
    regular_expression = pattern.as_regular_expression()
    words = words_finder.words_of_length(len(pattern))
    return any(
        regular_expression.match(word)
        for word in words
    )
