from __future__ import annotations

from crossword_builder_api.lib.board import Board
from crossword_builder_api.lib.pattern import ActivePattern


def build_board(
  active_index: int
) -> Board:
    return Board(
        width = 4,
        height = 3,
        squares = [
            "A", "C", "E", "■",
            "■", "A", "■", "O",
            "□", "T", "A", "G",
        ],
        active_index = active_index
    )


def test_Board():
    board = build_board(7)
    assert board.width == 4
    assert board.height == 3
    assert board.active_column == 3
    assert board.active_row == 1
    assert board.character_at(0, 0) == "A"
    assert board.character_at(0, 2) == "□"
    assert board.character_at(3, 1) == "□" # the active square should be empty
    assert board.character_at(3, 2) == "G"

def test_bound_left_of_active_square():
    assert build_board(7)._bound_left_of_active_square == 3
    assert build_board(6)._bound_left_of_active_square == 1
    assert build_board(2)._bound_left_of_active_square == 0
    assert build_board(8)._bound_left_of_active_square == 0

def test_bound_right_of_active_square():
    assert build_board(0)._bound_right_of_active_square == 2
    assert build_board(4)._bound_right_of_active_square == 1
    assert build_board(8)._bound_right_of_active_square == 3

def test_bound_above_active_square():
    assert build_board(0)._bound_above_active_square == 0
    assert build_board(8)._bound_above_active_square == 2
    assert build_board(11)._bound_above_active_square == 1

def test_bound_below_active_square():
    assert build_board(0)._bound_below_active_square == 0
    assert build_board(1)._bound_below_active_square == 2
    assert build_board(3)._bound_below_active_square == 2

def test_horizontal_pattern_through_active_square():
    assert build_board(0).horizontal_pattern_through_active_square() == ActivePattern(list("□CE"), 0)
    assert build_board(0).horizontal_pattern_through_active_square(0, 2) == ActivePattern(list("□CE"), 0)
    assert build_board(0).horizontal_pattern_through_active_square(0, 1) == ActivePattern(list("□C"), 0)
    assert build_board(0).horizontal_pattern_through_active_square(0, 0) == ActivePattern(list("□"), 0)
    assert build_board(1).horizontal_pattern_through_active_square(0, 2) == ActivePattern(list("A□E"), 1)
    assert build_board(1).horizontal_pattern_through_active_square(1, 2) == ActivePattern(list("□E"), 0)
    assert build_board(8).horizontal_pattern_through_active_square(0, 3) == ActivePattern(list("□TAG"), 0)
    assert build_board(9).horizontal_pattern_through_active_square(0, 3) == ActivePattern(list("□□AG"), 1)

def test_vertical_pattern_through_active_square():
    assert build_board(1).vertical_pattern_through_active_square() == ActivePattern(list("□AT"), 0)
    assert build_board(1).vertical_pattern_through_active_square(0, 2) == ActivePattern(list("□AT"), 0)
    assert build_board(5).vertical_pattern_through_active_square(0, 2) == ActivePattern(list("C□T"), 1)
    assert build_board(4).vertical_pattern_through_active_square(0, 2) == ActivePattern(list("A□□"), 1)
    assert build_board(4).vertical_pattern_through_active_square(1, 2) == ActivePattern(list("□□"), 0)
    assert build_board(8).vertical_pattern_through_active_square(2, 2) == ActivePattern(list("□"), 0)
