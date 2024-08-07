from __future__ import annotations
from fastapi import FastAPI

from crossword_builder_api.settings import Settings
from crossword_builder_api.cors import setup_cors
from crossword_builder_api.models.suggestions_lists import SuggestionsListInParams, SuggestionsListOutParams
from crossword_builder_api.lib.words import WordsFinder
from crossword_builder_api.lib.suggestions import build_suggestions_list


settings = Settings()
app = FastAPI(title="Crossword Builder API", debug=settings.DEBUG)
setup_cors(app, settings)

words_finder = WordsFinder()

@app.post("/suggestions_lists", response_model=SuggestionsListOutParams)
async def create_suggestions_list(
    params: SuggestionsListInParams
):
    return build_suggestions_list(words_finder, params)
