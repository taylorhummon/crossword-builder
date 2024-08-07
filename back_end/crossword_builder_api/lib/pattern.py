from __future__ import annotations
from typing import Any
import re

from crossword_builder_api.utilities.character import PatternCharacter, EMPTY_SQUARE, FILLED_SQUARE


UPPERCASE_LETTER_REGULAR_EXPRESSION = re.compile('^[A-Z]$')

class Pattern:
    def __init__(
        self: Pattern,
        characters: list[PatternCharacter]
    ) -> None:
        if any(character == FILLED_SQUARE for character in characters):
            raise Exception("patterns cannot contain filled squares")
        self._characters: list[PatternCharacter]
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

    def drop_leftmost_character(
        self: Pattern
    ) -> Pattern:
        if len(self._characters) == 0:
            raise Exception("cannot drop leftmost character of empty pattern")
        characters = self._characters[1 : len(self._characters)]
        return Pattern(characters)

    def drop_rightmost_character(
        self: Pattern
    ) -> Pattern:
        if len(self._characters) == 0:
            raise Exception("cannot drop rightmost character of empty pattern")
        characters = self._characters[0 : len(self._characters) - 1]
        return Pattern(characters)


class ActivePattern(Pattern):
    def __init__(
        self: ActivePattern,
        characters: list[PatternCharacter],
        active_index: int
    ) -> None:
        super().__init__(characters)
        if active_index < 0 or active_index >= len(characters):
            raise Exception(f"active_index={active_index} is invalid for characters={characters}")
        self.active_index: int
        self.active_index = active_index

    def __eq__(
        self: ActivePattern,
        other: Any
    ) -> bool:
        if type(other) != ActivePattern:
            return False
        return (
            other._characters == self._characters and
            other.active_index == self.active_index
        )

    def subpatterns(
        self: ActivePattern
    ) -> list[ActivePattern]:
        subpatterns = [
            subsubpattern
            for subpattern in self.subpatterns_trimming_left()
            for subsubpattern in subpattern.subpatterns_trimming_right()
        ]
        subpatterns.sort(key = lambda subpattern: len(subpattern))
        return subpatterns

    def subpatterns_trimming_left(
        self: ActivePattern
    ) -> list[ActivePattern]:
        trim_points = []
        trim_points.append(0)
        for i in range(0, self.active_index):
            if self._characters[i] == EMPTY_SQUARE:
                trim_points.append(i + 1)
        return [
            ActivePattern(
                self._characters[trim_point : len(self)],
                self.active_index - trim_point
            )
            for trim_point in reversed(trim_points)
        ]

    def subpatterns_trimming_right(
        self: ActivePattern
    ) -> list[ActivePattern]:
        trim_points = []
        for i in range(self.active_index + 1, len(self)):
            if self._characters[i] == EMPTY_SQUARE:
                trim_points.append(i)
        trim_points.append(len(self))
        return [
            ActivePattern(
                self._characters[0 : trim_point],
                self.active_index
            )
            for trim_point in trim_points
        ]


def _character_for_regular_expression(
    character: PatternCharacter
) -> str:
    if UPPERCASE_LETTER_REGULAR_EXPRESSION.match(character):
        return character
    if character == EMPTY_SQUARE:
        return "."
    raise Exception("unexpected character: #{character}")
