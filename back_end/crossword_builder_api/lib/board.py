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
        self._bounds: Tuple[int, int, int, int] | None

        self.width = width
        self.height = height
        self._squares = _ensure_active_square_is_empty(squares, active_index)
        (
            self.active_column,
            self.active_row
        ) = calculate_remainder_and_quotient(active_index, width)
        self._bounds = None

    def character_at(
        self: Board,
        i: int,
        j: int
    ) -> Character:
        if (i < 0 or j < 0 or i >= self.width or j >= self.height):
            raise Exception(f"indices out of bounds: {i}, {j}")
        return self._squares[j * self.width + i]

    def horizontal_pattern_through_active_square(
        self: Board,
        start: int | None = None,
        end: int | None = None
    ) -> ActivePattern:
        if start == None:
            start = self._bound_left_of_active_square
        if end == None:
            end = self._bound_right_of_active_square
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
            start = self._bound_above_active_square
        if end == None:
            end = self._bound_below_active_square
        if self.active_row not in range(start, end + 1):
            raise Exception("active square must sit between start and end")
        characters = [
            self.character_at(self.active_column, j)
            for j in range(start, end + 1)
        ]
        relative_active_index = self.active_row - start
        return ActivePattern(characters, relative_active_index)

    @property
    def _bound_left_of_active_square(
        self: Board
    ) -> int:
        if self._bounds == None:
            self._bounds = self._compute_bounds()
        return self._bounds[0]

    @property
    def _bound_right_of_active_square(
        self: Board
    ) -> int:
        if self._bounds == None:
            self._bounds = self._compute_bounds()
        return self._bounds[1]

    @property
    def _bound_above_active_square(
        self: Board
    ) -> int:
        if self._bounds == None:
            self._bounds = self._compute_bounds()
        return self._bounds[2]

    @property
    def _bound_below_active_square(
        self: Board
    ) -> int:
        if self._bounds == None:
            self._bounds = self._compute_bounds()
        return self._bounds[3]

    def _compute_bounds(
        self: Board
    ) -> Tuple[int, int, int, int]:
        bound_left = self.active_column
        bound_right = self.active_column
        bound_above = self.active_row
        bound_below = self.active_row
        while (
            bound_left - 1 >= 0 and
            self.character_at(bound_left - 1, self.active_row) != FILLED_SQUARE
        ):
            bound_left -= 1
        while (
            bound_right + 1 < self.width and
            self.character_at(bound_right + 1, self.active_row) != FILLED_SQUARE
        ):
            bound_right += 1
        while (
            bound_above - 1 >= 0 and
            self.character_at(self.active_column, bound_above - 1) != FILLED_SQUARE
        ):
            bound_above -= 1
        while (
            bound_below + 1 < self.height and
            self.character_at(self.active_column, bound_below + 1) != FILLED_SQUARE
        ):
            bound_below += 1
        return (bound_left, bound_right, bound_above, bound_below)


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
