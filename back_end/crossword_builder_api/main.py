from __future__ import annotations
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from crossword_builder_api.models.suggestions_lists import SuggestionsListInParams, SuggestionsListOutParams
from crossword_builder_api.lib.words import WordsFinder
from crossword_builder_api.lib.suggestions import build_suggestions_list


app = FastAPI()
words_finder = WordsFinder()

DEVELOPMENT_ORIGINS = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=DEVELOPMENT_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/suggestions_lists", response_model=SuggestionsListOutParams)
async def create_suggestions_list(
    params: SuggestionsListInParams
):
    return build_suggestions_list(words_finder, params)
