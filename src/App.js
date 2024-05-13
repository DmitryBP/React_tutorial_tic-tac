import { useState } from 'react';
import { Board } from './Board';

// 2. В апп у нас только компонента game 
export default function Game() {
  // Описываем состояние истории как массив из 9 Null
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // Задаем состояние текущего хода равное 0 изменяется в переделах (0...9)
  const [currentMove, setCurrentMove] = useState(0);
  // Определяем переменную которая отвечает на вопрос будетли следующий ход за Х 
  // принимает true если переменная текущий ход возврачает четное значение 
  const xIsNext = currentMove % 2 === 0;
  // Определяем переменную текущая клетка равной текущему коду из массива истории ходов
  const currentSquares = history[currentMove];

  //----------------------
  // Определяем обработчик хода, этот обработчи будет прокинут через пропс в board
  // будет вызваться при выполнении соответствующих условий в обработчика клика на клетке
  // принимая на вход следующую клетку
  function handlePlay(nextSquares) {
    // Определим переменную следующий в истории как массив всех элементов массива истории
    //  от 0 до текущего хода (0...9) + 1 и еще следующая клетка (ее мы и получаем на вход)
    // Короче при клике записываем номер клетки в историю 
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // И обновляем состояние истории ходов
    setHistory(nextHistory);
    // и состояние переменной текущий ход 
    setCurrentMove(nextHistory.length - 1);
  }
  //----------------------

  // Определяем обработчик клика по кнопкам списка исптории ходов 
  // Кликаем по кнопке хода получаем номер хода
  function jumpTo(nextMove) {
    // назначаем этот номер хода номером текущего хода 
    setCurrentMove(nextMove);
  }
  //----------------------

  // moves это массив истории преобразованный в разметку элементов списка ходов в виде кнопок 
  const moves = history.map((squares, move) => {
    // надпись на кнопке зависит от номера хода = key 
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
    <div className='game'>
      <div className='game-board'>
        {/* 3 рисуем борд*/}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        {/* 4 рисуем список ходов */}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
