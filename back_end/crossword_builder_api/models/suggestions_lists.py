from __future__ import annotations
from typing import List, Annotated
from fastapi import Body
from pydantic import BaseModel, Field

from crossword_builder_api.custom_typing import Letter, Tilde


example_suggestions_list_in_params = {
    "boardWidth": 2,
    "boardHeight": 2,
    "squareValues": ["A", "~", "B", None],
    "activeSquareIndex": 0,
    "canSuggestFill": True
}

class SuggestionsListInParams(BaseModel):
    boardWidth: int = Field(ge=1)
    boardHeight: int = Field(ge=1)
    squareValues: List[Letter | Tilde | None]
    activeSquareIndex: int = Field(ge=0)
    canSuggestFill: bool

    model_config = { "json_schema_extra": { "examples": [example_suggestions_list_in_params] } }

example_suggestions_list_out_params = ["E", "Y", "~"]

SuggestionsListOutParams = Annotated[
    list[Letter | Tilde],
    Body(examples=[example_suggestions_list_out_params])
]
