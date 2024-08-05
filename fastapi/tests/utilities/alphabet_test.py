from __future__ import annotations

from crossword_builder_api.utilities.alphabet import build_uppercase_alphabet


def test_build_alphabet():
    alphabet = build_uppercase_alphabet()
    assert alphabet[0] == "A"
    assert alphabet[-1] == "Z"
