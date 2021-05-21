import React from 'react';
import './Game.css';
import Board from './Board';
import Suggestions from './Suggestions';

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-suggestions">
          <Suggestions />
        </div>
      </div>
    );
  }
}

export default Game;
