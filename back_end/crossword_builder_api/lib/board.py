from __future__ import annotations
import re

from crossword_builder_api.utilities.character import Character, EMPTY_SQUARE, FILLED_SQUARE
from crossword_builder_api.utilities.math import calculate_remainder_and_quotient


UPPERCASE_LETTER_REGULAR_EXPRESSION = re.compile('^[A-Z]$')

class Board:
    def __init__(
        self: Board,
        width: int,
        height: int,
        square_values: list[Character],
        active_square_index: int,
    ) -> None:
        if len(square_values) != width * height:
            raise Exception("square_values must be an array of size width * height")
        if active_square_index >= width * height:
            raise Exception("active_square_index cannot be greater or equal to width * height")
        self.width: int
        self.width = width
        self.height: int
        self.height = height
        self._square_values: list[Character]
        self._square_values = square_values
        remainder_and_quotient = calculate_remainder_and_quotient(active_square_index, width)
        self.active_column: int
        self.active_column = remainder_and_quotient[0]
        self.active_row: int
        self.active_row = remainder_and_quotient[1]

    def square_value_at(
        self: Board,
        i: int,
        j: int
    ) -> Character:
        index = j * self.width + i
        if (index < 0 or index >= self.width * self.height):
            raise Exception(f"indices out of bounds: {i}, {j}")
        return self._square_values[index]

    def left_bound(
        self: Board
    ) -> int:
        i = self.active_column
        while (
            i - 1 >= 0 and
            self.square_value_at(i - 1, self.active_row) != FILLED_SQUARE
        ):
            i -= 1
        return i

    def right_bound(
        self: Board
    ) -> int:
        i = self.active_column
        while (
            i + 1 < self.width and
            self.square_value_at(i + 1, self.active_row) != FILLED_SQUARE
        ):
            i += 1
        return i

    def top_bound(
        self: Board
    ) -> int:
        j = self.active_row
        while (
            j - 1 >= 0 and
            self.square_value_at(self.active_column, j - 1) != FILLED_SQUARE
        ):
            j -= 1
        return j

    def bottom_bound(
        self: Board
    ) -> int:
        j = self.active_row
        while (
            j + 1 < self.height and
            self.square_value_at(self.active_column, j + 1) != FILLED_SQUARE
        ):
            j += 1
        return j

    def horizontal_pattern_for(
        self: Board,
        start: int,
        end: int
    ) -> str:
        pattern_characters = [
            self._pattern_character_horizontal(i)
            for i in range(start, end + 1)
        ]
        return "".join(pattern_characters)

    def vertical_pattern_for(
        self: Board,
        start: int,
        end: int
    ) -> str:
        pattern_characters = [
            self._pattern_character_vertical(j)
            for j in range(start, end + 1)
        ]
        return "".join(pattern_characters)

    def _pattern_character_horizontal(
        self,
        i: int
    ) -> str:
        character = self.square_value_at(i, self.active_row)
        if (i == self.active_column):
            return "@"
        if (character == EMPTY_SQUARE):
            return "."
        if (UPPERCASE_LETTER_REGULAR_EXPRESSION.match(character)):
            return character
        raise Exception("unexpected character: #{character}")

    def _pattern_character_vertical(
        self,
        j: int
    ) -> str:
        character = self.square_value_at(self.active_column, j)
        if (j == self.active_row):
            return "@"
        if (character == EMPTY_SQUARE):
            return "."
        if (UPPERCASE_LETTER_REGULAR_EXPRESSION.match(character)):
            return character
        raise Exception("unexpected character: #{character}")
