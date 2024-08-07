from __future__ import annotations
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from crossword_builder_api.settings import Settings


def setup_cors(
    app: FastAPI,
    settings: Settings
) -> None:
    if settings.ENVIRONMENT == "development":
        app.add_middleware(
            CORSMiddleware,
            allow_origins=["http://localhost:3000"],
            allow_methods=["*"],
            allow_headers=["*"]
        )
