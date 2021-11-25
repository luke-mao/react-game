import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';
import DialogWindow from '../components/DialogWindow';
import { Typography, Button } from '@mui/material';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'space-around',
  },
  box: {
    width: '30%',
    height: '50%',
    border: '2px dashed #999',
    position: 'relative',
  },
  horizontalLine: {
    height: '7px',
    width: '30%',
    backgroundColor: 'black',
    position: 'absolute',
    left: '50%',
    bottom: '30px',
    transform: 'translate(-50%, -50%)',
  },
  verticalLine: {
    width: '7px',
    height: '80px',
    backgroundColor: 'black',
    position: 'absolute',
    left: '50%',
    bottom: '0px',
    transform: 'translate(-50%, -50%)',
  },
  block: {
    height: '13px',
    position: 'absolute',
    border: '1px solid black',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  messageText: {
    fontSize: '14pt',
  },
  extraContent: {
    mt: 2,
    mb: 2,
    width: '100%',
    height: 'fit-content',
    textAlign: 'center',
  }
};

// colors, max number of blocks = 5.
// all blocks have the same height, but different widths
const colors = ['red', 'orange', 'yellow', 'blue', 'green'];
const widths = ['30%', '40%', '50%', '60%', '70%'];

export default function Snek() {
  // initailly, the board is empty.
  // each array represents a box
  const [board, setBoard] = useState([[], [], []]);

  // remember the user input
  const [numBlocks, setNumBlocks] = useState(0);

  // remember the from
  const [blockFrom, setBlockFrom] = useState(null);

  // dialog window
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // total moves
  const [totalMoves, setTotalMoves] = useState(0);

  // one click to move FROM, another click to move TO.
  // every time moves the block at the top.
  // and that block on FROM must be smaller than the block on TO.
  const move = (idx) => {
    if (blockFrom === null) {
      setBlockFrom(idx);
    }
    else {
      // blockFrom has value, now is the blockTo
      const blockTo = idx;

      // valid move: blockTo !== blockFrom, and blockFrom has block, 
      // and the top block of blockFrom is less than empty blockTo, or top block of blockTo
      const check1 = blockTo !== blockFrom;
      const check2 = board[blockFrom].length !== 0;
      const check3 = board[blockTo].length === 0 
        || parseFloat(board[blockFrom][0].width) < parseFloat(board[blockTo][0].width)
      ;

      if (check1 && check2 && check3) {
        // increase total moves
        setTotalMoves(totalMoves + 1);

        // move the top block
        const newBoard = [...board];
        const thisBlock = newBoard[blockFrom].shift();
        newBoard[blockTo] = [thisBlock, ...newBoard[blockTo]];
        setBoard(newBoard);

        // check if win already.
        // also check if the game is completed.
        // the rule has restricted the move, so only check if the array length is enough.
        if (newBoard[2].length === numBlocks) {
          setIsDialogOpen(true);
          
          // update the localStorage
          const numGamesLeft = parseInt(localStorage.getItem('numGamesLeft'));
          localStorage.setItem('numGamesLeft', numGamesLeft - 1);
        }
      }

      // now, the move is either invalid, or valid & completed,
      // reset the blockFrom
      setBlockFrom(null);
    }
  }

  const navigate = useNavigate();
  const goToHomePage = () => navigate('/', { replace: true });

  // button click to reset the game
  const resetGame = () => {
    setTotalMoves(0);
    setBlockFrom(null);
    setIsDialogOpen(false);
    setBoard(getInitialBoard(numBlocks));
  };

  // set the 'top' for the block. 
  // take account of the total number of blocks in that container
  const blockBottomPosition = (idx, numBlocks) => {
    return {
      bottom: `${32 + (numBlocks - idx - 1) * 12}px`,
    };
  };

  const blockFromStyle = (blockIdx) => {
    return {
      backgroundColor: blockIdx === blockFrom ? '#8080805c' : 'transparent',
    };
  };

  // input the board numBlocks, and output the initial board
  const getInitialBoard = (numberBlocks) => {
    // now put the blocks onto the bar
    const blocks = new Array(numberBlocks).fill([]);
    for (let i = 0; i < blocks.length; i++) {
      blocks[i] = {
        backgroundColor: colors[i],
        width: widths[i],
      }
    };

    const initialBoard = [blocks, [], []];
    return initialBoard;
  }

  // ask the use number of blocks
  useEffect(() => {
    let inputNumBlocks = 3;
    while (true) {
      const userInput = prompt('Please enter the number of blocks (3, 4, or 5):');

      if (userInput !== null && userInput !== '') {
        userInput.trim();
        if (userInput === '3' || userInput === '4' || userInput === '5') {
          inputNumBlocks = parseInt(userInput);
          break;
        }
      }

      alert('Invalid input. Please enter 3, 4, or 5.');
    }

    // store the number of blocks
    setNumBlocks(inputNumBlocks);
    setBoard(getInitialBoard(inputNumBlocks));
  }, []);

  return (
    <Box
      sx={styles.container}
    >
      <Box
        sx={styles.extraContent}
      >
        <Typography
          variant='h5'
          fontFamily='Monospace'
          color='text.primary'
        >
          One click to register the box 'From', and another click to register the box 'To'.
        </Typography>
      </Box>
      {board.map((blocks, idx) => (
        <Box
          key={idx}
          sx={{ ...styles.box, ...blockFromStyle(idx) }}
          onClick={() => move(idx)}
        >
          <Box
            sx={styles.horizontalLine}
          />
          <Box
            sx={styles.verticalLine}
          />
          {blocks.map((block, idx2) => (
            <Box
              key={`block ${idx2}`}
              sx={{ ...block, ...styles.block, ...blockBottomPosition(idx2, blocks.length) }}
            />
          ))}
        </Box>
      ))}
      <Box
        sx={styles.extraContent}
      >
        <Button
          variant='contained'
          color='primary'
          size='medium'
          onClick={resetGame}
        >
          Reset
        </Button>
      </Box>
      <DialogWindow
        isOpen={isDialogOpen}
        buttonText='OK'
        buttonOnClick={goToHomePage}
      >
        <Typography
          sx={styles.messageText}
        >
          {`Success in ${totalMoves} moves`}
        </Typography>
      </DialogWindow>
    </Box>
  )
}
