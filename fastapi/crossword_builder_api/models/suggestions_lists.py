from typing import List, Annotated
from fastapi import Body
from pydantic import BaseModel, Field

from crossword_builder_api.custom_typing import Letter, Tilde


class SuggestionsListInParams(BaseModel):
    boardWidth: int = Field(ge=1)
    boardHeight: int = Field(ge=1)
    squareValues: List[Letter | Tilde | None]
    activeSquareIndex: int = Field(ge=0)
    canSuggestFill: bool

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "boardWidth": 2,
                    "boardHeight": 2,
                    "squareValues": ["A", "~", "B", None],
                    "activeSquareIndex": 0,
                    "canSuggestFill": True
                }
            ]
        }
    }

SuggestionsListOutParams = Annotated[
    list[Letter | Tilde],
    Body(examples=[["E", "Y", "~"]])
]
