from __future__ import annotations

from crossword_builder_api.lib.words_provider import WordsProvider
from crossword_builder_api.models.suggestions_lists import SuggestionsListInParams
from crossword_builder_api.lib.board import Board
from crossword_builder_api.lib.pattern import ActivePattern, Pattern
from crossword_builder_api.utilities.character import FILLED_SQUARE


def build_suggestions(
    words_provider: WordsProvider,
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
        return _suggestions_when_can_suggest_fill(words_provider, board, pattern_a, pattern_b)
    else:
        return _suggestions_when_cannot_suggest_fill(words_provider, pattern_a, pattern_b)

def _suggestions_when_cannot_suggest_fill(
    words_provider: WordsProvider,
    pattern_a: ActivePattern,
    pattern_b: ActivePattern
) -> set[str]:
    suggestions_a = _suggestions_for_pattern(words_provider, pattern_a)
    suggestions_b = _suggestions_for_pattern(words_provider, pattern_b)
    return suggestions_a.intersection(suggestions_b)

def _suggestions_when_can_suggest_fill(
    words_provider: WordsProvider,
    board: Board,
    pattern_a: ActivePattern,
    pattern_b: ActivePattern
) -> set[str]:
    suggestions_a = _suggestions_for_all_subpatterns(words_provider, pattern_a)
    suggestions_b = _suggestions_for_all_subpatterns(words_provider, pattern_b)
    suggestions = suggestions_a.intersection(suggestions_b)
    if _will_suggest_fill(words_provider, board):
        suggestions.add(FILLED_SQUARE)
    return suggestions

def _suggestions_for_all_subpatterns(
    words_provider: WordsProvider,
    pattern: ActivePattern
) -> set[str]:
    return {
        suggestion
        for subpattern in pattern.subpatterns()
        for suggestion in _suggestions_for_pattern(words_provider, subpattern)
    }

def _suggestions_for_pattern(
    words_provider: WordsProvider,
    pattern: ActivePattern
) -> set[str]:
    i = pattern.active_index
    regular_expression = pattern.as_regular_expression()
    words = words_provider.words_of_length(len(pattern))
    return {
        word[i : i + 1]
        for word in words
        if regular_expression.match(word)
    }

def _will_suggest_fill(
    words_provider: WordsProvider,
    board: Board
) -> bool:
    left_pattern = board.horizontal_pattern_through_active_square(
        board.bound_left_of_active_square,
        board.active_column
    )
    if not _will_suggest_fill_trimming_left(words_provider, left_pattern):
        return False
    right_pattern = board.horizontal_pattern_through_active_square(
        board.active_column,
        board.bound_right_of_active_square
    )
    if not _will_suggest_fill_trimming_right(words_provider, right_pattern):
        return False
    above_pattern = board.vertical_pattern_through_active_square(
        board.bound_above_active_square,
        board.active_row
    )
    if not _will_suggest_fill_trimming_left(words_provider, above_pattern):
        return False
    below_pattern = board.vertical_pattern_through_active_square(
        board.active_row,
        board.bound_below_active_square
    )
    if not _will_suggest_fill_trimming_right(words_provider, below_pattern):
        return False
    return True

def _will_suggest_fill_trimming_left(
    words_provider: WordsProvider,
    pattern: ActivePattern
) -> bool:
    if pattern.active_index != len(pattern) - 1:
        raise Exception("expected rightmost character to be active")
    return any(
        _has_match(words_provider, subpattern.drop_rightmost_character())
        for subpattern in pattern.subpatterns_trimming_left()
    )

def _will_suggest_fill_trimming_right(
    words_provider: WordsProvider,
    pattern: ActivePattern
) -> bool:
    if pattern.active_index != 0:
        raise Exception("expected leftmost character to be active")
    return any(
        _has_match(words_provider, subpattern.drop_leftmost_character())
        for subpattern in pattern.subpatterns_trimming_right()
    )

def _has_match(
    words_provider: WordsProvider,
    pattern: Pattern
) -> bool:
    if len(pattern) == 0:
        return True
    regular_expression = pattern.as_regular_expression()
    words = words_provider.words_of_length(len(pattern))
    return any(
        regular_expression.match(word)
        for word in words
    )
