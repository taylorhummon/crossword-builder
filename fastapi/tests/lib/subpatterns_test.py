from __future__ import annotations
import pytest

from crossword_builder_api.lib.subpatterns import (
    compute_subpatterns,
    compute_subpatterns_trim_left,
    compute_subpatterns_trim_right
)


def test_compute_subpatterns():
    assert compute_subpatterns("a..b.@c.d") == ["@c", "@c.d", "b.@c", ".b.@c", "b.@c.d", ".b.@c.d", "a..b.@c", "a..b.@c.d"]
    assert compute_subpatterns("@c.d") == ["@c", "@c.d"]
    assert compute_subpatterns("a..b.@") == ["@", "b.@", ".b.@", "a..b.@"]
    assert compute_subpatterns("@") == ["@"]
    with pytest.raises(Exception):
        compute_subpatterns("a..b.c.d")

def test_compute_subpatterns_trim_left():
    assert compute_subpatterns_trim_left("a..b.@c.d") == ["@c.d", "b.@c.d", ".b.@c.d", "a..b.@c.d"]
    assert compute_subpatterns_trim_left("a..b.@") == ["@", "b.@", ".b.@", "a..b.@"]
    assert compute_subpatterns_trim_left("@") == ["@"]
    with pytest.raises(Exception):
        compute_subpatterns_trim_left("a..b.c.d")

def test_compute_subpatterns_trim_right():
    assert compute_subpatterns_trim_right("a..b.@c.d") == ["a..b.@c", "a..b.@c.d"]
    assert compute_subpatterns_trim_right("@c.d") == ["@c", "@c.d"]
    assert compute_subpatterns_trim_right("@") == ["@"]
    with pytest.raises(Exception):
        compute_subpatterns_trim_right("a..b.c.d")
