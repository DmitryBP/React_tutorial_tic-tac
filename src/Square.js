// Компанента клетки рендерит кнопку значение кнопки берет из пропса value которое передается из border 
// и задается свое для каждой клетки, так для 5й кретки value={squares[5]} 
// Кроме значения на кнопку вешается обработчик клика onClick={onSquareClick}
// По нажатию на клетку №5 вызови handleClick(5);
// onSquareClick={() => {
//   handleClick(5);
// }}


export function Square({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}