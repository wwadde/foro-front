import { useState } from "react";

export default function Game() {

  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill('')]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[]) {
    
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {

    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} cuadrados={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


interface SquareProps {
  value: string;
  onSquareClick: () => void;
}



function Square({ value, onSquareClick }: SquareProps) {
  return <button className="square" onClick={onSquareClick}>{value}</button>
}


interface BoardProps {
  xIsNext: boolean;
  cuadrados: string[];
  onPlay: (parametro: string[]) => void;
}


function Board({ xIsNext, cuadrados, onPlay }: BoardProps) {


  function handleSquareClick(posicion: number) {

    if (cuadrados[posicion] || calculateWinner(cuadrados)) {
      return;
    }

    const siguientesCuadrados = cuadrados.slice();

    if (xIsNext) {
      siguientesCuadrados[posicion] = "X";
    }
    else {
      siguientesCuadrados[posicion] = "O";
    }
    onPlay(siguientesCuadrados);
  }


  const winner = calculateWinner(cuadrados);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }


  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={cuadrados[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={cuadrados[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={cuadrados[2]} onSquareClick={() => handleSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={cuadrados[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={cuadrados[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={cuadrados[5]} onSquareClick={() => handleSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={cuadrados[6]} onSquareClick={() => handleSquareClick(6)} />
        <Square value={cuadrados[7]} onSquareClick={() => handleSquareClick(7)} />
        <Square value={cuadrados[8]} onSquareClick={() => handleSquareClick(8)} />
      </div>
    </>
  );
}


function calculateWinner(cuadrados: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cuadrados[a] && cuadrados[a] === cuadrados[b] && cuadrados[a] === cuadrados[c]) {
      return cuadrados[a];
    }
  }
  return null;
}