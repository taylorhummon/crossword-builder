from __future__ import annotations

from crossword_builder_api.lib.words_provider import WordsProvider


def test_WordsProvider():
    words_provider = WordsProvider()
    assert len(words_provider.words_of_length(1)) == 26
    assert len(words_provider.words_of_length(2)) == 427
    assert len(words_provider.words_of_length(0)) == 0
    assert len(words_provider.words_of_length(400)) == 0
