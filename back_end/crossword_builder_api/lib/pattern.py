from __future__ import annotations
from typing import Any
import re

from crossword_builder_api.utilities.character import Character, EMPTY_SQUARE, FILLED_SQUARE

UPPERCASE_LETTER_REGULAR_EXPRESSION = re.compile('^[A-Z]$')

class Pattern:
    def __init__(
        self: Pattern,
        characters: list[Character]
    ) -> None:
        self._characters: list[Character]
        self._characters = characters

    def __len__(
        self: Pattern
    ) -> int:
        return len(self._characters)

    def __eq__(
        self: Pattern,
        other: Any
    ) -> bool:
        if type(other) != Pattern:
            return False
        return other._characters == self._characters

    def as_regular_expression(
        self: Pattern
    ) -> re.Pattern:
        regular_expression_characters =  "".join([
            _character_for_regular_expression(character)
            for character in self._characters
        ])
        return re.compile(f"^{regular_expression_characters}$")

    def drop_first_character(
        self: Pattern
    ) -> Pattern:
        if len(self._characters) == 1:
            raise Exception("cannot drop first when pattern is length 1")
        return Pattern(self._characters[1 : len(self._characters)])

    def drop_last_character(
        self: Pattern
    ) -> Pattern:
        if len(self._characters) == 1:
            raise Exception("cannot drop last when pattern is length 1")
        return Pattern(self._characters[0 : len(self._characters) - 1])


def _character_for_regular_expression(
    character: Character
) -> str:
    if UPPERCASE_LETTER_REGULAR_EXPRESSION.match(character):
        return character
    if character == EMPTY_SQUARE:
        return "."
    if character == FILLED_SQUARE:
        raise Exception("should not find filled square when building regular expression for pattern")
    raise Exception("unexpected character: #{character}")


class ActivePattern(Pattern):
    def __init__(
        self: ActivePattern,
        characters: list[Character],
        active: int
    ) -> None:
        if active < 0 or active >= len(characters):
            raise Exception(f"active={active} is invalid for characters={characters}")
        super().__init__(characters)
        self.active: int
        self.active = active

    def __eq__(
        self: ActivePattern,
        other: Any
    ) -> bool:
        if type(other) != ActivePattern:
            return False
        return other._characters == self._characters and other.active == self.active

    def compute_subpatterns(
        self: ActivePattern
    ) -> list[ActivePattern]:
        subpatterns = [
            subsubpattern
            for subpattern in self.compute_subpatterns_trim_left()
            for subsubpattern in subpattern.compute_subpatterns_trim_right()
        ]
        subpatterns.sort(key = lambda subpattern: len(subpattern))
        return subpatterns

    def compute_subpatterns_trim_left(
        self: ActivePattern
    ) -> list[ActivePattern]:
        trim_points = []
        trim_points.append(0)
        for i in range(0, self.active):
            if self._characters[i] == EMPTY_SQUARE:
                trim_points.append(i + 1)
        return [
            ActivePattern(self._characters[trim_point : len(self)], self.active - trim_point)
            for trim_point in reversed(trim_points)
        ]

    def compute_subpatterns_trim_right(
        self: ActivePattern
    ) -> list[ActivePattern]:
        trim_points = []
        for i in range(self.active + 1, len(self)):
            if self._characters[i] == EMPTY_SQUARE:
                trim_points.append(i)
        trim_points.append(len(self))
        return [
            ActivePattern(self._characters[0 : trim_point], self.active)
            for trim_point in trim_points
        ]
