from __future__ import annotations

from crossword_builder_api.lib.board import Board
from crossword_builder_api.lib.pattern import ActivePattern


def build_board(
  active_square_index: int
) -> Board:
    return Board(
        width = 4,
        height = 3,
        squares = [
            "A", "C", "E", "■",
            "■", "A", "■", "O",
            "□", "T", "A", "G",
        ],
        active_square_index = active_square_index
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

def test_left_bound():
    assert build_board(7).left_bound() == 3
    assert build_board(6).left_bound() == 1
    assert build_board(2).left_bound() == 0
    assert build_board(8).left_bound() == 0

def test_right_bound():
    assert build_board(0).right_bound() == 2
    assert build_board(4).right_bound() == 1
    assert build_board(8).right_bound() == 3

def test_top_bound():
    assert build_board(0).top_bound() == 0
    assert build_board(8).top_bound() == 2
    assert build_board(11).top_bound() == 1

def test_bottom_bound():
    assert build_board(0).bottom_bound() == 0
    assert build_board(1).bottom_bound() == 2
    assert build_board(3).bottom_bound() == 2

def test_horizontal_pattern_for():
    assert build_board(0).horizontal_pattern_for(0, 2) == ActivePattern(list("□CE"), 0)
    assert build_board(0).horizontal_pattern_for(0, 1) == ActivePattern(list("□C"), 0)
    assert build_board(0).horizontal_pattern_for(0, 0) == ActivePattern(list("□"), 0)
    assert build_board(1).horizontal_pattern_for(0, 2) == ActivePattern(list("A□E"), 1)
    assert build_board(1).horizontal_pattern_for(1, 2) == ActivePattern(list("□E"), 0)
    assert build_board(8).horizontal_pattern_for(0, 3) == ActivePattern(list("□TAG"), 0)
    assert build_board(9).horizontal_pattern_for(0, 3) == ActivePattern(list("□□AG"), 1)

def test_vertical_pattern_for():
    assert build_board(1).vertical_pattern_for(0, 2) == ActivePattern(list("□AT"), 0)
    assert build_board(5).vertical_pattern_for(0, 2) == ActivePattern(list("C□T"), 1)
    assert build_board(4).vertical_pattern_for(0, 2) == ActivePattern(list("A□□"), 1)
    assert build_board(4).vertical_pattern_for(1, 2) == ActivePattern(list("□□"), 0)
    assert build_board(8).vertical_pattern_for(2, 2) == ActivePattern(list("□"), 0)
