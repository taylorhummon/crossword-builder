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

Tilde = Literal["~"]
