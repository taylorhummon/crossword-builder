from __future__ import annotations

from crossword_builder_api.lib.words_finder import WordsFinder


def test_WordsFinder():
    words_finder = WordsFinder()
    assert len(words_finder.words_of_length(1)) == 26
    assert len(words_finder.words_of_length(2)) == 427
    assert len(words_finder.words_of_length(0)) == 0
    assert len(words_finder.words_of_length(400)) == 0
