import { Typography } from '@mui/material';
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import DialogWindow from '../components/DialogWindow';
import { decreaseNumGamesLeft } from '../utils/utils';

const styles = {
  box: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBox: {
    width: '100%',
    mb: 10,
    textAlign: 'center',
  },
  boardWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    width: '25px',
    height: '25px',
    border: '1px solid #000',
  },
  messageText: {
    fontSize: '14pt',
  },
};

// the head direction
const LEFT = 1;
const RIGHT = 2;
const TOP = 3;
const BOTTOM = 4;

// the board is 10 * 10
const CELL_NUMBER = 10;

// game status
const WIN_LENGTH = 20;
const WIN = 5;
const LOSE = 6;
const UNDERGOING = 7;

// initial snake location.
// top left corner, and the cell to the right
const INITIAL_SNAKE = [
  {rowIdx: 0, colIdx: 1},
  {rowIdx: 0, colIdx: 0}, 
];

export default function Snek() {
  // initially, the snake heads right
  const [headDirection, setHeadDirection] = useState(RIGHT);

  // initially, it occupy top left and the cell to the right, so its length is 2
  const [snakeCells, setSnakeCells] = useState(INITIAL_SNAKE);

  // initially, food
  const [foodLocation, setFoodLocation] = useState({});

  // board
  const [board, setBoard] = useState([]);

  // game status
  const [gameStatus, setGameStatus] = useState(UNDERGOING);

  // dialog after win or lose
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // a timer to increment every 0.5 seconds.
  // and use useEffect to monitor that timer, 
  // so the snakeCells update every 0.5 seconds.
  // otherwise, write 'move' inside the useEffect, 
  // it only have the very initial version of the snakeCells
  const [timer, setTimer] = useState(0);

  const getInitialBoard = () => {
    const initialBoard = new Array(CELL_NUMBER).fill([]);
    for (let i = 0; i < CELL_NUMBER; i++) {
      initialBoard[i] = new Array(CELL_NUMBER).fill([]);
    }

    return initialBoard;
  }

  // a snake has cell background #999.
  // a food has cell background #252525.
  // if the snake meets the food, then snake style dominates
  const snakeAndFoodStyle = (rowIdx, colIdx) => {
    const result = {
      backgroundColor: 'transparent',
    }

    // check if the snake in this cell
    let found = false;
    for (let i = 0; i < snakeCells.length; i++) {
      if (snakeCells[i].rowIdx === rowIdx && snakeCells[i].colIdx === colIdx) {
        found = true;
        break;
      }
    }

    if (found) {
      result.backgroundColor = '#999';
    }
    else if (rowIdx === foodLocation.rowIdx && colIdx === foodLocation.colIdx) {
      result.backgroundColor = '#252525';
    }

    return result;
  };

  // during loading, set the initial board, and initial food location
  useEffect(() => {
    setBoard(getInitialBoard());
    setFoodLocation(getRandomFoodLocation());

    // the snake moves every 0.5 seconds, so the timer changes every 0.5 seconds.
    const timerInterval = window.setInterval(() => setTimer(timer => timer + 1), 500);

    // listen to the 4 arrow keys
    window.addEventListener('keydown', changeHeadDirection);

    // clean up the timer and the keydown listener
    return () => {
      clearInterval(timerInterval);
      window.removeEventListener('keydown', changeHeadDirection);
    } 
  }, []);

  // move the snake based on head direction.
  const move = () => {
    const snakeCellsCopy = [...snakeCells];
    const tailCell = snakeCellsCopy.pop();
    
    // copy the head
    const newHeadCell = {...snakeCellsCopy[0]};

    if (headDirection === TOP) {
      newHeadCell.rowIdx -= 1;
    }
    else if (headDirection === BOTTOM) {
      newHeadCell.rowIdx += 1;
    }
    else if (headDirection === LEFT) {
      newHeadCell.colIdx -= 1;
    }
    else if (headDirection === RIGHT) {
      newHeadCell.colIdx += 1;
    }

    // update the snake
    const newSnakeCells = [newHeadCell, ...snakeCellsCopy];
    
    // if the head of the snake meets the food, then show another food
    if (newHeadCell.rowIdx === foodLocation.rowIdx && newHeadCell.colIdx === foodLocation.colIdx) {
      setFoodLocation(getRandomFoodLocation());

      // also the snake poped cell is put back, since the length of the snake increases
      newSnakeCells.push(tailCell);
    }

    setSnakeCells(newSnakeCells);

    // now check the status
    const gameStatus = checkGameStatus(newSnakeCells);
    if (gameStatus !== UNDERGOING) {
      setIsDialogOpen(true);
      setGameStatus(gameStatus);

      // also remove the listener and click
    }
  } 

  // another useEffect to run when the timer changes
  useEffect(() => {
    if (gameStatus === UNDERGOING) {
      move();
    }
  }, [timer, gameStatus]);

  // get random food location
  const getRandomFoodLocation = () => {
    // all cells, cancel the position that the snake is in.
    let rowIdx = 0;
    let colIdx = 0;

    while (true) {
      rowIdx = Math.floor(Math.random() * CELL_NUMBER);
      colIdx = Math.floor(Math.random() * CELL_NUMBER);

      // check if this is the snake cells
      let found = false;
      for (let i = 0; i < snakeCells.length; i++) {
        if (snakeCells[i].rowIdx === rowIdx && snakeCells[i].colIdx === colIdx) {
          found = true;
          break;
        }
      }

      if (!found) {
        break;
      }
    } 

    return {rowIdx, colIdx};
  };

  // press 4 keys to change the head direction
  const changeHeadDirection = (e) => {
    if (e.key === 'ArrowUp') {
      setHeadDirection(TOP);
    }
    else if (e.key === 'ArrowDown') {
      setHeadDirection(BOTTOM);
    }
    else if (e.key === 'ArrowLeft') {
      setHeadDirection(LEFT);
    }
    else if (e.key === 'ArrowRight') {
      setHeadDirection(RIGHT);
    }
  };

  // check if win or lose.
  // win: snake length >= 20.
  // lose: move beyond the board, move to a cell with itself
  const checkGameStatus = (thisSnakeCells) => {
    // input the latest snake cells, prevent the react update delay
    if (thisSnakeCells.length >= WIN_LENGTH) {
      // update the record
      decreaseNumGamesLeft(3);
      return WIN;
    }

    // only need to check if the head is beyond the board
    const headCell = thisSnakeCells[0];
    const beyond = headCell.rowIdx < 0 
      || headCell.rowIdx >= CELL_NUMBER
      || headCell.colIdx < 0 
      || headCell.colIdx >= CELL_NUMBER
    ;

    if (beyond) {
      return LOSE;
    }

    // check if hit itself, simply check if the head is the same with any other cells
    let collide = false;
    
    for (let i = 1; i < thisSnakeCells.length; i++) {
      if (headCell.rowIdx === thisSnakeCells[i].rowIdx && headCell.colIdx === thisSnakeCells[i].colIdx) {
        collide = true;
        break;
      }
    }

    if (collide) {
      return LOSE;
    }

    // finally, undergoing
    return UNDERGOING;
  };

  // reset the game
  const resetGame = () => {
    setIsDialogOpen(false);
    setHeadDirection(RIGHT);
    setSnakeCells(INITIAL_SNAKE);
    setFoodLocation(getRandomFoodLocation());
    setGameStatus(UNDERGOING);
    setTimer(0);
  };

  return (
    <Box
      sx={styles.box}
    >
      <Box
        sx={styles.titleBox}
      >
        <Typography
          variant='h5'
          fontFamily='Monospace'
          color='text.primary'
        >
          Use arrow keys on the keyboard to control.
        </Typography>
      </Box>
      <Box
        sx={styles.boardWrapper}
      >
        {board.map((row, colIdx) => (
          <Box
            key={`row ${colIdx}`}
          >
            {row.map((cell, rowIdx) => (
              <Box
                key={`cell ${rowIdx} ${colIdx}`}
                sx={{...styles.cell, ...snakeAndFoodStyle(rowIdx, colIdx)}}
              />
            ))}
          </Box>
        ))}
      </Box>
      <DialogWindow
        isOpen={isDialogOpen}
        buttonText='Play again?'
        buttonOnClick={resetGame}
      >
        {gameStatus === WIN
          ? <Typography
              sx={styles.messageText}
            >
              Congratulations!
            </Typography>
          : <Typography
              sx={styles.messageText}
            >
              Oh no!
            </Typography>
        }
      </DialogWindow>
    </Box>
  )
}

