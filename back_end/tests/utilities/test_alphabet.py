from __future__ import annotations

from crossword_builder_api.utilities.character import build_letters


def test_build_letters():
    letters = build_letters()
    assert len(letters) == 26
    assert letters[0] == "A"
    assert letters[25] == "Z"
