from __future__ import annotations

from crossword_builder_api.lib.words_provider import WordsProvider
from crossword_builder_api.lib.pattern import ActivePattern, Pattern
from crossword_builder_api.utilities.character import Letter


class Matcher:
    def __init__(
        self: Matcher,
        words_provider: WordsProvider | None = None
    ) -> None:
        if words_provider == None:
            words_provider = WordsProvider()
        self._words_provider: WordsProvider
        self._words_provider = words_provider

    def matching_letters(
        self: Matcher,
        pattern: ActivePattern
    ) -> set[Letter]:
        i = pattern.active_index
        regular_expression = pattern.as_regular_expression()
        words = self._words_provider.words_of_length(len(pattern))
        return {
            word[i : i + 1]
            for word in words
            if regular_expression.match(word)
        }

    def has_match(
        self: Matcher,
        pattern: Pattern
    ) -> bool:
        if len(pattern) == 0:
            return True
        regular_expression = pattern.as_regular_expression()
        words = self._words_provider.words_of_length(len(pattern))
        return any(
            regular_expression.match(word)
            for word in words
        )
