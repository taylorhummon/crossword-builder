from __future__ import annotations
from typing import Annotated, Literal
from pydantic import StringConstraints


Letter = Annotated[
    str,
    StringConstraints(
        min_length=1,
        max_length=1,
        pattern="^[A-Z]$"
    )
]
EmptySquareType = Literal["□"]
FilledSquareType = Literal["■"]
SuggestableCharacter = Letter | FilledSquareType
Character = Letter | FilledSquareType | EmptySquareType

def build_letters() -> list[Letter]:
    character_code_for_A = ord("A")
    return [
        chr(character_code_for_A + index)
        for index in range(26)
    ]

EMPTY_SQUARE = "□"
FILLED_SQUARE = "■"
