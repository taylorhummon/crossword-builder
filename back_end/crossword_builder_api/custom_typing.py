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
FilledSquareType = Literal["■"]
EmptySquareType = Literal["□"]
