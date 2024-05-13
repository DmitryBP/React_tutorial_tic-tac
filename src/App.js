import { useState } from 'react';
import { Board } from './Board';

// 2. В апп у нас только компонента game

// Описываем состояние истории - history как массив  
//  
// [
//  0:[null, null, null, null, null, null, null, null, null],
//  1:[null, 'x', null, null, null, null, null, null, null], 
//  ...
//  8:['o', 'x', 'o', 'x', 'o', 'x', 'o', 'x', 'o'],
// ]

// Задаем состояние текущего хода - currentMove изначально равное 0 изменяется в переделах (0...9) с каждым ходом
// Определяем переменную - xIsNext которая отвечает на вопрос будетли следующий ход за Х (true...false)
// принимает true если переменная текущий ход возврачает четное значение
// Определяем переменную - currentSquares, отражающую текущее состояние всех клеток для первого хода будет history[1] [null, 'x', null, null, null, null, null, null, null]

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); 
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  //----------------------
  // Определяем обработчик хода, этот обработчи будет прокинут через пропс в board
  // будет вызваться при выполнении соответствующих условий в обработчика клика на клетке
  // принимая на вход следующую клетку
  // Определим переменную следующий в истории как массив всех элементов массива истории
  //  от 0 до текущего хода (0...8) + 1 и еще следующая клетка (ее мы и получаем на вход)
  // Короче при клике записываем номер клетки в историю
  // И обновляем состояние истории ходов
  // и состояние переменной текущий ход

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  //----------------------

  // Определяем обработчик клика по кнопкам списка исптории ходов
  // Кликаем по кнопке хода получаем номер хода
  // назначаем этот номер хода номером текущего хода

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  //----------------------

  // moves это массив истории преобразованный в разметку элементов списка ходов в виде кнопок
  // надпись на кнопке зависит от номера хода = key

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        {/* назначаем обработчик клика и оприсание кнопки */}
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  // Разметка компаненты Game
  return (
    <div className="game">
      <div className="game-board">
        {/* 3 рисуем борд*/}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {/* 4 рисуем список ходов */}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
