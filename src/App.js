import {useState, useEffect} from 'react'
// import blueCandy from './images/blue.png'
// import greenCandy from '.images/green.jpeg'
// import orangeCandy from './images/orange.png'
// import purpleCandy from './images/purple.jpeg'
// import redCandy from './images/red.png'
// import yellowCandy from './images/yellow.jpeg'
// import blank from './images/blank.png'


let blue = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS8mvXjAQ3TsARdRNZeuia1sj-SBSXYT-l34vD961A4p5GbvUeWqhnFdpbCef1bJ8miEE&usqp=CAU';
let green = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe_KoDZpIG4n3cC6BtjB5SCuBIYS-0oO8-aXbAfBYxUtBrN7egOEsbw24D9-PR75Zlicg&usqp=CAU'
let orange = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrzQ0TW3xrhr2dMG4s4VJJj2fxhLJo-UL1W-FdFaHhUpL2jYbofYc3_ntGhn9cU13mSY&usqp=CAU'
let purple= 'https://img.myloview.com/posters/candy-isometric-wrapped-colorful-purple-confectionery-caramel-lollipop-vector-illustration-cartoon-style-400-273688338.jpg'
let red = 'https://img.myloview.com/posters/candy-colorful-sweet-bonbon-candy-in-bright-color-packaging-wrapping-sugar-sweet-food-dessert-caramel-chocolate-vector-illustration-isolated-cartoon-style-400-159617683.jpg'
let yellow = 'https://img.myloview.com/stickers/candy-sweets-on-white-background-vector-illustration-cartoon-style-400-117505262.jpg'
let blank = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJeaM6876hGQrnCDcz2JDmEYsqmrN54IPhgQ&usqp=CAU'

const width = 8;
const candyColors = [
  blue,
  green,
  orange,
  purple,
  red,
  yellow
]

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)

  const checkForColumnOfThree = () => { // check two squares below current square
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [
        i,
        i + width,
        i + width * 2
      ];
      const decidedColor = currentColorArrangement[i];

      // if each number is equal to the same color
      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true;
      }
    }
  }

  const checkForColumnOfFour = () => { // check two squares below current square
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [
        i,
        i + width,
        i + width * 2,
        i + width * 3
      ];
      const decidedColor = currentColorArrangement[i];

      // if each number is equal to the same color
      if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true;
      }
    }
  }

  const checkForRowOfThree = () => { // check two squares after current square
    for (let i = 0; i < 64; i++) {
      const RowOfThree = [
        i,
        i + 1,
        i + 2
      ];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6,
        7,
        14,
        15,
        22,
        23,
        30,
        31,
        38,
        39,
        46,
        47,
        54,
        55,
        63,
        64
      ]
      // omit squares at the end of the row
      if (notValid.includes(i)) 
        continue;
      

      // if each number is equal to the same color
      if (RowOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        RowOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true;
      }
    }
  }

  const checkForRowOfFour = () => { // check two squares after current square
    for (let i = 0; i < 64; i++) {
      const RowOfFour = [
        i,
        i + 1,
        i + 2
      ];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        5,
        6,
        7,
        13,
        14,
        15,
        21,
        22,
        23,
        29,
        30,
        31,
        37,
        38,
        39,
        45,
        46,
        47,
        53,
        54,
        55,
        62,
        63,
        64
      ]
      // omit squares at the end of the row
      if (notValid.includes(i)) 
        continue;
      

      // if each number is equal to the same color
      if (RowOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        RowOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true;
      }
    }
  }

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 64 - width; i++) {
      const firstRow = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ]
      const isFirstRow = firstRow.includes(i);
      // generate if it is empty in the first row
      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNumber]
      }
      // if square plus board length is empty move square + board length (straight down)
      if (currentColorArrangement[i + width] ===blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = blank
      }
    }
  }
  // move square
  const dragStart = (e) => {
    console.log(e.target)
    console.log('drat start')
    setSquareBeingDragged(e.target)
  }
  const dragDrop = (e) => {
    console.log(e.target)
    console.log('drat drop')
    setSquareBeingReplaced(e.target)
  }
  const dragEnd = (e) => {
    console.log(e.target)

    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)
    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()

    if (squareBeingReplacedId && validMove && (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else {
      currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
      setCurrentColorArrangement([...currentColorArrangement])
    }
  }

  const createBoard = () => {
    const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) { // get random colors
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      // push random color into array randomColorArragement width*width times
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 500)


    return() => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangement
  ])


  return (
    <div
      className="app">
      <div
        className="game">
        {
        currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            
            src={candyColor}
          
            alt={candyColor}
            data-id={index}
            draggable={true}
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
            onDragEnd={dragEnd}></img>
        ))
      } </div>
      <img source={require('./images/blue.png').default}/>
    </div>
  );
}

export default App;
