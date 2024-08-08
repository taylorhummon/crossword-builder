from __future__ import annotations
from typing import Annotated
from fastapi import Body
from pydantic import BaseModel, Field

from crossword_builder_api.utilities.character import (
    SuggestableCharacter, Character, EMPTY_SQUARE, FILLED_SQUARE
)


example_suggestions_params = {
    "boardWidth": 2,
    "boardHeight": 2,
    "squares": ["A", FILLED_SQUARE, "B", EMPTY_SQUARE],
    "activeIndex": 0,
    "canSuggestFilled": True
}
example_suggestions = ["E", "Y", FILLED_SQUARE]

class SuggestionsRequestData(BaseModel):
    boardWidth: int = Field(ge=1)
    boardHeight: int = Field(ge=1)
    squares: list[Character]
    activeIndex: int = Field(ge=0)
    canSuggestFilled: bool

    model_config = { "json_schema_extra": { "examples": [example_suggestions_params] } }

Suggestions = Annotated[
    list[SuggestableCharacter],
    Body(examples=[example_suggestions])
]
