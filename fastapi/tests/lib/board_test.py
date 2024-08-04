from crossword_builder_api.lib.board import Board

def test_Board():
    board = Board(
        square_values = ["A", "~", "B", None],
        width = 2,
        height = 2,
        active_square_index = 0
    )
    assert board.width == 2
    assert board.height == 2
    assert board.active_column == 0
    assert board.active_row == 0
    assert board.square_value_at(0, 0) == "A"
    assert board.square_value_at(1, 0) == "~"
    assert board.square_value_at(0, 1) == "B"
    assert board.square_value_at(1, 1) == None
