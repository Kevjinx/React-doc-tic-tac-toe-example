import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// class Square extends React.Component {

//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}
// 			>
//         {this.props.value}
//       </button>
//     );
//   }
// }

const calculateWinner = squares => {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      //square[a] to check for truthy value, since starting value is null
      squares[a]
      && squares[a] === squares[b]
      && squares[b] === squares[c]
      ) {
        return squares[a]
      }
  }

  return null;

}

//?? how to prevent onClick happening second time?
const Square = props => {
  return (
    <button
      className='square'
      //!! review difference between functional component and class component
      onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {

  handleClick(i) {
    //call slice() to create a shallow copy of squares to modify instead of modifying the existing array
    //this allows us to "time travel" to review previous moves
    //plus we can detect changes much easier with immutable objects
    //!! need to modify
    if (!this.state.squares[i] || !calculateWinner(this.state.squares)) {
      const squares = this.state.squares.slice();

      squares[i] = this.state.xIsNext ? 'X' : 'O';

      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      })
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.handleClick(i)}
      />
    );
  }

  render() {




    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }]
    }
  }


  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares)
    let status;
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}



// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
