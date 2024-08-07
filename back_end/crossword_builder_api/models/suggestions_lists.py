from __future__ import annotations
from typing import Annotated
from fastapi import Body
from pydantic import BaseModel, Field

from crossword_builder_api.utilities.character import (
    SuggestableCharacter, Character, EMPTY_SQUARE, FILLED_SQUARE
)


example_suggestions_list_in_params = {
    "boardWidth": 2,
    "boardHeight": 2,
    "squareValues": ["A", FILLED_SQUARE, "B", EMPTY_SQUARE],
    "activeSquareIndex": 0,
    "canSuggestFill": True
}

class SuggestionsListInParams(BaseModel):
    boardWidth: int = Field(ge=1)
    boardHeight: int = Field(ge=1)
    squareValues: list[Character]
    activeSquareIndex: int = Field(ge=0)
    canSuggestFill: bool

    model_config = { "json_schema_extra": { "examples": [example_suggestions_list_in_params] } }

example_suggestions_list_out_params = ["E", "Y", FILLED_SQUARE]

SuggestionsListOutParams = Annotated[
    list[SuggestableCharacter],
    Body(examples=[example_suggestions_list_out_params])
]
