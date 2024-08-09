from __future__ import annotations
from typing import cast

from crossword_builder_api.lib.words_provider import WordsProvider
from crossword_builder_api.lib.matcher import Matcher
from crossword_builder_api.lib.pattern import ActivePattern, Pattern
from crossword_builder_api.utilities.character import build_letters


WORDS_FOR_MOCK = build_letters() + [
    "AC", "AT", "OG", "LA",
    "CAT", "ABS", "ACE", "DOG", "SAT", "SOG",
    "ACED", "ACES", "ACER", "CATS", "DOGS", "RACE", "SOGS"
]

class MockWordsProvider:
    def words_of_length(
        self: MockWordsProvider,
        length: int
    ) -> list[str]:
        return [
            word
            for word in WORDS_FOR_MOCK
            if len(word) == length
        ]

mock_words_provider = cast(WordsProvider, MockWordsProvider())
matcher = Matcher(mock_words_provider)

def test_matching_letters():
    assert matcher.matching_letters(ActivePattern(["A", "C", "E", "□"], 3)) == { "D", "R", "S" }
    assert matcher.matching_letters(ActivePattern(["A", "□", "E", "□"], 1)) == { "C" }
    assert matcher.matching_letters(ActivePattern(["□", "A", "□", "□"], 0)) == { "C", "R" }

def test_hash_match():
    assert matcher.has_match(Pattern(["A", "C", "E", "□"])) == True
    assert matcher.has_match(Pattern(["□", "□", "□"])) == True
    assert matcher.has_match(Pattern(["S", "□", "G"])) == True
    assert matcher.has_match(Pattern(["S", "O", "G"])) == True
    assert matcher.has_match(Pattern(["S", "□", "Z"])) == False
    assert matcher.has_match(Pattern(["S", "A", "Z"])) == False
