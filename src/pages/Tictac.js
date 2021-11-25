import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import DialogWindow from '../components/DialogWindow';
import { decreaseNumGamesLeft } from '../utils/utils';

// initial board
const initialBoard = new Array(9).fill('');

const styles = {
  box: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    width: '33%',
    height: '33%',
    m: 0,
    p: 0,
    fontSize: '2em',
    color: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: '14pt',
  }
};

// idx = 0, 1, 2, ... 8
const cellBorderStyle = (idx) => {
  const borders = {};
  const value = '2px solid #333';

  if (idx % 3 !== 2) {
    borders.borderRight = value;
  }

  if (idx <= 5) {
    borders.borderBottom = value;
  }

  return borders;
};

// two players have different background color
const cellBackgroundColor = (isPlayer1, content) => {
  if (content === 'o' || content === 'x') {
    return {
      backgroundColor: 'white',
    }
  }
  else {
    return {
      backgroundColor: isPlayer1 ? 'rgb(255,220,220)' : 'rgb(220,220,255)',
    };
  }
};

// code for three situations
const WIN = 1;
const TIE = 2;
const UNDERGOING = 3;

export default function Tictac() {
  // configure the initial board, and initial player
  const [board, setBoard] = useState(initialBoard);
  const [isPlayer1, setIsPlayer1] = useState(true);

  // the final dialog when game finishes
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // game result
  const [winner, setWinner] = useState('');
  const [player1Moves, setPlayer1Moves] = useState(0);
  const [player2Moves, setPlayer2Moves] = useState(0);

  const play = (idx) => {
    // first check if the cell idx is empty. 
    // if it is not empty, then leave it.
    if (board[idx] !== '') {
      alert('Please play a valid move!!');
      return;
    }

    // increment the moves
    if (isPlayer1) {
      setPlayer1Moves(player1Moves + 1);
    }
    else {
      setPlayer2Moves(player2Moves + 1);
    }

    const newBoard = [...board];
    newBoard[idx] = isPlayer1 ? 'o' : 'x';
    setBoard(newBoard);

    // check the game status
    const gameStatus = isComplete(newBoard);

    if (gameStatus === UNDERGOING) {
      setIsPlayer1(!isPlayer1);
    }
    else {
      // the game is either win, or tie.
      if (gameStatus === WIN) {
        if (isPlayer1) {
          setWinner('Player 1');
          decreaseNumGamesLeft(1);
        }
        else {
          setWinner('Player 2');
        }
      }

      setIsDialogOpen(true);
    }
  };

  // the game is complete, when
  // all 9 squares are filled,
  // or when there is 3 of 0 or x in a horizontal / vertical / diagonal row. 
  // input the new board, since the useState update may not be ready yet.
  const isComplete = (thisBoard) => {
    // first check if all 9 cells are filled
    let isAllFilled = true;
    for (let i = 0; i < thisBoard.length; i++) {
      if (thisBoard[i] === '') {
        isAllFilled = false;
        break;
      } 
    }

    // now check if a person win
    let isWin = false;

    // check horiztonal and vertical
    for (let i = 0; i < 3; i++) {
      const checkRow = thisBoard[3 * i] === thisBoard[3 * i + 1] 
        && thisBoard[3 * i] === thisBoard[3 * i + 2] 
        && thisBoard[3 * i ] !== ''
      ;

      const checkColumn = thisBoard[i] === thisBoard[i + 3]
        && thisBoard[i] === thisBoard[i + 6]
        && thisBoard[i] !== ''
      ;

      if (checkRow || checkColumn) {
        isWin = true;
        break;
      }
    }

    if (!isWin) {
      // check diagonal
      const checkDiagonal1 = thisBoard[0] === thisBoard[4]
        && thisBoard[4] === thisBoard[8]
        && thisBoard[0] !== ''
      ;

      const checkDiagonal2 = thisBoard[2] === thisBoard[4]
        && thisBoard[4] === thisBoard[6]
        && thisBoard[2] !== ''
      ;

      if (checkDiagonal1 || checkDiagonal2) {
        isWin = true;
      }
    }

    // determine WIN, TIE, UNDERGOING
    if (isWin) {
      return WIN;
    }
    else if (isAllFilled) {
      return TIE;
    }
    else {
      return UNDERGOING;
    }
  };

  // when the game finishes, the dialog pops out, 
  // close the dialog redirects the user to the home page.
  const navigate = useNavigate();
  const goToHomePage = () => navigate('/', { replace: true });

  return (
    <Box
      sx={styles.box}
    >
      {board.map((content, idx) => (
        <Box
          key={idx}
          sx={{...styles.cell, ...cellBorderStyle(idx), ...cellBackgroundColor(isPlayer1, content)}}
          onClick={() => play(idx)}
        >
          {content}
        </Box>
      ))}
      <DialogWindow
        isOpen={isDialogOpen}
        buttonText='OK'
        buttonOnClick={goToHomePage}
      >
        <Typography
          sx={styles.messageText}
        >
          {winner === '' ? 'No one wins' : `${winner} wins`}
        </Typography>
        <Typography
          sx={styles.messageText}
        >
          {`A total of ${winner === 'Player 1' || winner === '' ? player1Moves : player2Moves} moves were complete`}
        </Typography>
      </DialogWindow>
    </Box>
  )
}