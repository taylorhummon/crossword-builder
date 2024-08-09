from __future__ import annotations
from typing import Tuple

from crossword_builder_api.lib.pattern import ActivePattern
from crossword_builder_api.utilities.character import Character, EMPTY_SQUARE, FILLED_SQUARE
from crossword_builder_api.utilities.math import calculate_remainder_and_quotient


class Board:
    def __init__(
        self: Board,
        width: int,
        height: int,
        squares: list[Character],
        active_index: int,
    ) -> None:
        if len(squares) != width * height:
            raise Exception("squares must be a list of size width * height")
        if active_index >= width * height:
            raise Exception("active_index cannot be greater or equal to width * height")

        self.width: int
        self.height: int
        self._squares: list[Character]
        self.active_column: int
        self.active_row: int
        self.bound_left_of_active_square: int
        self.bound_right_of_active_square: int
        self.bound_above_active_square: int
        self.bound_below_active_square: int

        self.width = width
        self.height = height
        self._squares = _ensure_active_square_is_empty(squares, active_index)
        (
            self.active_column,
            self.active_row
        ) = calculate_remainder_and_quotient(active_index, width)
        (
            self.bound_left_of_active_square,
            self.bound_right_of_active_square,
            self.bound_above_active_square,
            self.bound_below_active_square
        ) = _bounds(
            width = self.width,
            height = self.height,
            squares = self._squares,
            active_column = self.active_column,
            active_row = self.active_row
        )

    def character_at(
        self: Board,
        i: int,
        j: int
    ) -> Character:
        return _character_at(
            width = self.width,
            height = self.height,
            squares = self._squares,
            i = i,
            j = j
        )

    def horizontal_pattern_through_active_square(
        self: Board,
        start: int | None = None,
        end: int | None = None
    ) -> ActivePattern:
        if start == None:
            start = self.bound_left_of_active_square
        if end == None:
            end = self.bound_right_of_active_square
        if self.active_column not in range(start, end + 1):
            raise Exception("active square must sit between start and end")
        characters = [
            self.character_at(i, self.active_row)
            for i in range(start, end + 1)
        ]
        relative_active_index = self.active_column - start
        return ActivePattern(characters, relative_active_index)

    def vertical_pattern_through_active_square(
        self: Board,
        start: int | None = None,
        end: int | None = None
    ) -> ActivePattern:
        if start == None:
            start = self.bound_above_active_square
        if end == None:
            end = self.bound_below_active_square
        if self.active_row not in range(start, end + 1):
            raise Exception("active square must sit between start and end")
        characters = [
            self.character_at(self.active_column, j)
            for j in range(start, end + 1)
        ]
        relative_active_index = self.active_row - start
        return ActivePattern(characters, relative_active_index)


### Private Helper Functions

# We're only using the Board to analyze suggestions.
# Given that, it's best to think of the active square as empty.
def _ensure_active_square_is_empty(
    squares: list[Character],
    active_index: int
) -> list[Character]:
    if squares[active_index] == EMPTY_SQUARE:
        return squares
    else:
        squares_copy = squares[:]
        squares_copy[active_index] = EMPTY_SQUARE
        return squares_copy

def _bounds(
    width: int,
    height: int,
    squares: list[Character],
    active_column: int,
    active_row: int
) -> Tuple[int, int, int, int]:
    bound_left = active_column
    bound_right = active_column
    bound_above = active_row
    bound_below = active_row
    while (
        bound_left - 1 >= 0 and
        _character_at(
            width = width,
            height = height,
            squares = squares,
            i = bound_left - 1,
            j = active_row
        ) != FILLED_SQUARE
    ):
        bound_left -= 1
    while (
        bound_right + 1 < width and
        _character_at(
            width = width,
            height = height,
            squares = squares,
            i = bound_right + 1,
            j = active_row
        ) != FILLED_SQUARE
    ):
        bound_right += 1
    while (
        bound_above - 1 >= 0 and
        _character_at(
            width = width,
            height = height,
            squares = squares,
            i = active_column,
            j = bound_above - 1
        ) != FILLED_SQUARE
    ):
        bound_above -= 1
    while (
        bound_below + 1 < height and
        _character_at(
            width = width,
            height = height,
            squares = squares,
            i = active_column,
            j = bound_below + 1
        ) != FILLED_SQUARE
    ):
        bound_below += 1
    return (bound_left, bound_right, bound_above, bound_below)

def _character_at(
    width: int,
    height: int,
    squares: list[Character],
    i: int,
    j: int
) -> Character:
    if (i < 0 or j < 0 or i >= width or j >= height):
        raise Exception(f"indices out of bounds: {i}, {j}")
    return squares[j * width + i]
