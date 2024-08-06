from __future__ import annotations


def build_uppercase_alphabet():
    character_code = ord("A")
    return [
        chr(character_code + i)
        for i in range(26)
    ]
