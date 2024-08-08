from __future__ import annotations

from crossword_builder_api.lib.pattern import Pattern, ActivePattern


def test_pattern_length():
    pattern = Pattern(list("□CA□"))
    assert len(pattern) == 4

def test_pattern_equality():
    assert Pattern(list("□CA□")) == Pattern(list("□CA□"))
    assert Pattern(list("□CA□")) != Pattern(list("□AC□"))

def test_as_regular_expression():
    pattern = Pattern(list("□CA□"))
    regular_expression = pattern.as_regular_expression()
    assert regular_expression.match("SCAR") != None
    assert regular_expression.match("SCOR") == None

def test_drop_first_character():
    pattern = Pattern(list("□CA□"))
    assert pattern.drop_first_character() == Pattern(list("CA□"))

def test_drop_last_character():
    pattern = Pattern(list("□CA□"))
    assert pattern.drop_last_character() == Pattern(list("□CA"))

def test_active_pattern_equality():
    assert ActivePattern(list("□CA□"), 3) == ActivePattern(list("□CA□"), 3)
    assert ActivePattern(list("□CA□"), 3) != ActivePattern(list("□AC□"), 3)
    assert ActivePattern(list("□CA□"), 3) != ActivePattern(list("□CA□"), 0)
    assert ActivePattern(list("□CA□"), 3) != Pattern(list("□CA□"))

def test_subpatterns_1():
    pattern = ActivePattern(list("A□□B□□C□D"), 5)
    assert pattern.subpatterns() == [
        ActivePattern(list("□C"), 0),
        ActivePattern(list("□C□D"), 0),
        ActivePattern(list("B□□C"), 2),
        ActivePattern(list("□B□□C"), 3),
        ActivePattern(list("B□□C□D"), 2),
        ActivePattern(list("□B□□C□D"), 3),
        ActivePattern(list("A□□B□□C"), 5),
        ActivePattern(list("A□□B□□C□D"), 5)
    ]

def test_subpatterns_2():
    pattern = ActivePattern(list("□C□D"), 0)
    assert pattern.subpatterns() == [
        ActivePattern(list("□C"), 0),
        ActivePattern(list("□C□D"), 0)
    ]

def test_subpatterns_3():
    pattern = ActivePattern(list("A□□B□□"), 5)
    assert pattern.subpatterns() == [
        ActivePattern(list("□"), 0),
        ActivePattern(list("B□□"), 2),
        ActivePattern(list("□B□□"), 3),
        ActivePattern(list("A□□B□□"), 5)
    ]

def test_subpatterns_4():
    pattern = ActivePattern(list("□"), 0)
    assert pattern.subpatterns() == [
        ActivePattern(list("□"), 0)
    ]

def test_subpatterns_trimming_left_1():
    pattern = ActivePattern(list("A□□B□□C□D"), 5)
    assert pattern.subpatterns_trimming_left() == [
        ActivePattern(list("□C□D"), 0),
        ActivePattern(list("B□□C□D"), 2),
        ActivePattern(list("□B□□C□D"), 3),
        ActivePattern(list("A□□B□□C□D"), 5)
    ]

def test_subpatterns_trimming_left_2():
    pattern = ActivePattern(list("A□□B□□"), 5)
    assert pattern.subpatterns_trimming_left() == [
        ActivePattern(list("□"), 0),
        ActivePattern(list("B□□"), 2),
        ActivePattern(list("□B□□"), 3),
        ActivePattern(list("A□□B□□"), 5)
    ]

def test_subpatterns_trimming_left_3():
    pattern = ActivePattern(list("□"), 0)
    assert pattern.subpatterns_trimming_left() == [
        ActivePattern(list("□"), 0)
    ]

def test_subpatterns_trimming_right_1():
    pattern = ActivePattern(list("A□□B□□C□D"), 5)
    assert pattern.subpatterns_trimming_right() == [
        ActivePattern(list("A□□B□□C"), 5),
        ActivePattern(list("A□□B□□C□D"), 5)
    ]

def test_subpatterns_trimming_right_2():
    pattern = ActivePattern(list("□C□D"), 0)
    assert pattern.subpatterns_trimming_right() == [
        ActivePattern(list("□C"), 0),
        ActivePattern(list("□C□D"), 0)
    ]

def test_subpatterns_trimming_right_3():
    pattern = ActivePattern(list("□"), 0)
    assert pattern.subpatterns_trimming_right() == [
        ActivePattern(list("□"), 0)
    ]
