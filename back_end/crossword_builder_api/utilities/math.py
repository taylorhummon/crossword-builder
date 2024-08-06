from __future__ import annotations
from typing import Tuple


def calculate_remainder_and_quotient(
    numerator: int,
    denominator: int
) -> Tuple[int, int]:
    if (denominator <= 0):
        raise Exception("calculate_remainder_and_quotient() expects a positive denominator")
    remainder = calculate_remainder(numerator, denominator)
    quotient = (numerator - remainder) // denominator
    return (remainder, quotient)

def calculate_remainder(
    numerator: int,
    denominator: int
) -> int:
    possibly_negative = numerator % denominator
    if (possibly_negative < 0):
        return possibly_negative + denominator
    else:
        return possibly_negative
