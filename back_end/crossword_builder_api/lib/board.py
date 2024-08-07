from __future__ import annotations
import re

from crossword_builder_api.lib.pattern import ActivePattern
from crossword_builder_api.utilities.character import Character, EMPTY_SQUARE, FILLED_SQUARE
from crossword_builder_api.utilities.math import calculate_remainder_and_quotient


UPPERCASE_LETTER_REGULAR_EXPRESSION = re.compile('^[A-Z]$')

class Board:
    def __init__(
        self: Board,
        width: int,
        height: int,
        squares: list[Character],
        active_index: int,
    ) -> None:
        if len(squares) != width * height:
            raise Exception("squares must be an array of size width * height")
        if active_index >= width * height:
            raise Exception("active_index cannot be greater or equal to width * height")
        self.width: int
        self.width = width
        self.height: int
        self.height = height
        self._squares: list[Character]
        self._squares = _ensure_active_square_is_empty(squares, active_index)
        remainder_and_quotient = calculate_remainder_and_quotient(active_index, width)
        self.active_column: int
        self.active_column = remainder_and_quotient[0]
        self.active_row: int
        self.active_row = remainder_and_quotient[1]

    def character_at(
        self: Board,
        i: int,
        j: int
    ) -> Character:
        index = j * self.width + i
        if (i < 0 or j < 0 or i >= self.width or j >= self.height):
            raise Exception(f"indices out of bounds: {i}, {j}")
        return self._squares[index]

    def horizontal_pattern_for(
        self: Board,
        start: int,
        end: int
    ) -> ActivePattern:
        characters = [
            self.character_at(i, self.active_row)
            for i in range(start, end + 1)
        ]
        relative_active_index = self.active_column - start
        return ActivePattern(characters, relative_active_index)

    def vertical_pattern_for(
        self: Board,
        start: int,
        end: int
    ) -> ActivePattern:
        characters = [
            self.character_at(self.active_column, j)
            for j in range(start, end + 1)
        ]
        relative_active_index = self.active_row - start
        return ActivePattern(characters, relative_active_index)

    def left_bound(
        self: Board
    ) -> int:
        i = self.active_column
        while (
            i - 1 >= 0 and
            self.character_at(i - 1, self.active_row) != FILLED_SQUARE
        ):
            i -= 1
        return i

    def right_bound(
        self: Board
    ) -> int:
        i = self.active_column
        while (
            i + 1 < self.width and
            self.character_at(i + 1, self.active_row) != FILLED_SQUARE
        ):
            i += 1
        return i

    def top_bound(
        self: Board
    ) -> int:
        j = self.active_row
        while (
            j - 1 >= 0 and
            self.character_at(self.active_column, j - 1) != FILLED_SQUARE
        ):
            j -= 1
        return j

    def bottom_bound(
        self: Board
    ) -> int:
        j = self.active_row
        while (
            j + 1 < self.height and
            self.character_at(self.active_column, j + 1) != FILLED_SQUARE
        ):
            j += 1
        return j


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
