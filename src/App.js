import {useState, useEffect} from 'react'

// import blueCandy from './images/blue.png'

// import greenCandy from '.images/green.jpeg'

// import orangeCandy from './images/orange.png'

// import purpleCandy from './images/purple.jpeg'

// import redCandy from './images/red.png'

// import yellowCandy from './images/yellow.jpeg'

// import blank from './images/blank.png'


let blue = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS8mvXjAQ3TsARdRNZeuia1sj-SBSXYT-l34vD961A4p5GbvUeWqhnFdpbCef1bJ8miEE&usqp=CAU';
let green = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe_KoDZpIG4n3cC6BtjB5SCuBIYS-0oO8-aXbAfBYxUtBrN7egOEsbw24D9-PR75Zlicg&usqp=CAU';
let orange = 'https://img.myloview.com/stickers/candy-sweets-on-white-background-vector-illustration-cartoon-style-400-117505262.jpg';
let purple = 'https://img.myloview.com/posters/candy-isometric-wrapped-colorful-purple-confectionery-caramel-lollipop-vector-illustration-cartoon-style-400-273688338.jpg';
let red = 'https://img.myloview.com/posters/candy-colorful-sweet-bonbon-candy-in-bright-color-packaging-wrapping-sugar-sweet-food-dessert-caramel-chocolate-vector-illustration-isolated-cartoon-style-400-159617683.jpg';
let yellow = 'https://media.istockphoto.com/vectors/candy-colorful-sweet-bonbon-candies-in-bright-color-packaging-sugar-vector-id1135045314?k=20&m=1135045314&s=170667a&w=0&h=cFlqdEKu3tf8muDneZfLO-enqOUS5cyduiOuovfOiz4=';
let blank = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJeaM6876hGQrnCDcz2JDmEYsqmrN54IPhgQ&usqp=CAU';

const width = 8;
const boardHeight = width;
const candyColors = [
  blue,
  green,
  orange,
  purple,
  red,
  yellow
];

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState('');
  const [squareBeingReplaced, setSquareBeingReplaced] = useState('');
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkForColorOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [
        i,
        i + width,
        i + width * 2,
        i + width * 3
      ];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      if (columnOfFour.every((square) => currentColorArrangement[square] === decidedColor) && ! isBlank) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
  };

  const checkForColorOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [
        i,
        i + width,
        i + width * 2
      ];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (columnOfThree.every((square) => currentColorArrangement[square] === decidedColor) && ! isBlank) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [
        i,
        i + 1,
        i + 2,
        i + 3
      ];
      const decidedColor = currentColorArrangement[i];

      const notValid = () => {
        const arrayOfNotValid = [];
        for (let j = 1; j <= boardHeight; j++) {
          let arrayForEachRow = [
            width * j - 3,
            width * j - 2,
            width * j - 1
          ];
          arrayOfNotValid.push(... arrayForEachRow);
        }
        return arrayOfNotValid;
      };
      
      const isBlank = currentColorArrangement[i] === blank;
      if (notValid().toString().includes(i)) 
        continue;
      

      if (rowOfFour.every((square) => currentColorArrangement[square] === decidedColor) && ! isBlank) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [
        i,
        i + 1,
        i + 2
      ];
      const decidedColor = currentColorArrangement[i];

      const notValid = () => {
        const arrayOfNotValid = [];
        for (let j = 1; j <= boardHeight; j++) {
          let arrayForEachRow = [
            width * j - 2,
            width * j - 1
          ];
          arrayOfNotValid.push(... arrayForEachRow);
        }
        return arrayOfNotValid;
      };
      
      const isBlank = currentColorArrangement[i] === blank;
      if (notValid().toString().includes(i)) 
        continue;
      

      if (rowOfThree.every((square) => currentColorArrangement[square] === decidedColor) && ! isBlank) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
  };

  const moveDown = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }

      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));

    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src');
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src');

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColorOfFour();
    const isAColumnOfThree = checkForColorOfThree();
    const isARowOfFour = checkForRowOfFour();
    const isARowOfThree = checkForRowOfThree();

    if (squareBeingReplacedId && validMove && (isAColumnOfFour || isAColumnOfThree || isARowOfFour || isARowOfThree)) {
      console.log('valid move');
      setSquareBeingDragged('');
      setSquareBeingReplaced('');
    } else {
      console.log('not valid move');
      currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src');
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * boardHeight; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColorOfFour();
      checkForRowOfFour();
      checkForColorOfThree();
      checkForRowOfThree();
      moveDown();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 300);
    return() => clearInterval(timer);
  }, [
    checkForColorOfFour,
    checkForRowOfFour,
    checkForColorOfThree,
    checkForColorOfThree,
    moveDown,
    currentColorArrangement
  ]);

  return (
    <div
      className='body'>
      {' '}
      <h1
        className='scoreBoard'>Your Score is: {scoreDisplay}</h1>
      <div
        className='app'>
        <div
          className='game'>
          {
          currentColorArrangement.map((candyColor, index) => (
            <img
              key={index}
              src={candyColor}
              draggable={true}
              data-id={index}
              onDragStart={dragStart}
              onDragOver={
                (e) => e.preventDefault()
              }
              onDragEnter={
                (e) => e.preventDefault()
              }
              onDragLeave={
                (e) => e.preventDefault()
              }
              onDrop={dragDrop}
              onDragEnd={dragEnd}/>
          ))
        } </div>
      </div>
    </div>
  );
};

export default App;
