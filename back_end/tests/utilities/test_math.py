from __future__ import annotations
import pytest

from crossword_builder_api.utilities.math import calculate_remainder, calculate_remainder_and_quotient


def test_calculate_remainder():
    assert calculate_remainder(14, 3) == 2
    assert calculate_remainder(2, 3) == 2
    assert calculate_remainder(0, 3) == 0
    assert calculate_remainder(-2, 3) == 1
    assert calculate_remainder(-3, 3) == 0
    assert calculate_remainder(-4, 3) == 2
    with pytest.raises(Exception):
        calculate_remainder(5, -3)
    with pytest.raises(Exception):
        calculate_remainder(5, 0)
    with pytest.raises(Exception):
        calculate_remainder(0, 0)

def test_calculate_remainder_and_quotient():
    assert calculate_remainder_and_quotient(14, 3) == (2, 4)
    assert calculate_remainder_and_quotient(2, 3) == (2, 0)
    assert calculate_remainder_and_quotient(0, 3) == (0, 0)
    assert calculate_remainder_and_quotient(-2, 3) == (1, -1)
    assert calculate_remainder_and_quotient(-3, 3) == (0, -1)
    assert calculate_remainder_and_quotient(-4, 3) == (2, -2)
    with pytest.raises(Exception):
        calculate_remainder_and_quotient(5, -3)
    with pytest.raises(Exception):
        calculate_remainder_and_quotient(5, 0)
    with pytest.raises(Exception):
        calculate_remainder_and_quotient(0, 0)
