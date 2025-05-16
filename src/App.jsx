import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="square text-xl font-bold w-12 h-12 m-1 border-2 border-black rounded-sm cursor-pointer"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();

    nextSquares[i] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  let status = "";
  if (winner) {
    status = "Winner :" + winner;
  } else {
    status = "Next Player :" + (xIsNext ? "X" : "O");
  }
  return (
    <section className="flex justify-center gap-5">
      <div className="board flex flex-wrap w-42">
        {/* Loop tiap komponen Square */}
        {squares.map((value, idx) => (
          <Square
            key={idx}
            value={value}
            onSquareClick={() => handleClick(idx)}
          />
        ))}
      </div>
      <div className="info-menu flex flex-col justify-between w-30">
        <span className="status">{status}</span>
        <button
          onClick={handleReset}
          className="reset-button border-1 rounded-sm w-15"
        >
          Reset
        </button>
      </div>
    </section>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}
