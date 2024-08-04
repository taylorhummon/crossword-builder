from fastapi import FastAPI

from crossword_builder_api.models.suggestions_lists import SuggestionsListInParams, SuggestionsListOutParams


app = FastAPI()

@app.post("/suggestions_lists", response_model=SuggestionsListOutParams)
async def create_suggestions_list(
    params: SuggestionsListInParams
):
    return frozenset(["A", "B", "Z", "~"])
