import { calculateWinner } from './calculateWinner';
import { Square } from './Square';

export function Board({ xIsNext, squares, onPlay }) {
  
  const winner = calculateWinner(squares);
  let status;


  // Обработчик клика handleClick(i) срабатывает по клику на кнопку в конкретном Square
  // Обрабатывает 3 сценария 
  // 1. squares[i] уже или х или о - выход из обработчика
  // 2. функция определения победителя вернула или х или о - выход из обработчика
  // 3. Если следующих ход х то i тый элемент копии массива клеток записать х иначе записать о
  // Далее значение копии массива всплывае через onPlay(nextSquares) в handlePlay(nextSquares) компаненты App.js

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = 'X') : (nextSquares[i] = 'O');
    onPlay(nextSquares);
  }

  winner
    ? (status = 'Winner: ' + winner)
    : (status = 'Next player: ' + (xIsNext ? 'X' : 'O'));

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square
          value={squares[0]}
          onSquareClick={() => {
            handleClick(0);
          }}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => {
            handleClick(1);
          }}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => {
            handleClick(2);
          }}
        />
      </div>
      <div className='board-row'>
        <Square
          value={squares[3]}
          onSquareClick={() => {
            handleClick(3);
          }}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => {
            handleClick(4);
          }}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => {
            handleClick(5);
          }}
        />
      </div>
      <div className='board-row'>
        <Square
          value={squares[6]}
          onSquareClick={() => {
            handleClick(6);
          }}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => {
            handleClick(7);
          }}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => {
            handleClick(8);
          }}
        />
      </div>
    </>
  );
}
