from __future__ import annotations
from fastapi import FastAPI

from crossword_builder_api.settings import Settings
from crossword_builder_api.cors import setup_cors
from crossword_builder_api.models.suggestions import SuggestionsRequestData, Suggestions
from crossword_builder_api.lib.matcher import Matcher
from crossword_builder_api.lib.suggestions import build_suggestions


settings = Settings()
app = FastAPI(title="Crossword Builder API", debug=settings.DEBUG)
setup_cors(app, settings)

matcher = Matcher()

@app.post("/make_suggestions", response_model=Suggestions)
async def make_suggestions(
    data: SuggestionsRequestData
):
    return build_suggestions(
        matcher = matcher,
        board_width = data.boardWidth,
        board_height = data.boardHeight,
        squares = data.squares,
        active_index = data.activeIndex,
        can_suggest_filled = data.canSuggestFilled
    )
