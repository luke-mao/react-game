import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { getNumGamesLeft, resetNumGamesLeft } from '../utils/utils';

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  line1: {
    color: 'blue',
    fontFamily: 'Monospace',
    mx: 1,
    mb: 2,
    textAlign: 'center',
  },
  box2: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    mx: 2,
  },
  line2: {
    color: 'blue',
    fontFamily: 'Monospace',
    display: 'inline',
  },
  button: {
    mx: 4,
    my: 2,
    display: 'inline',
  },
};

export default function DashBoard() {
  const [numGamesLeft, setNumGamesLeft] = useState(null);

  // after loading, check with local storage
  useEffect(() => {
    let record = getNumGamesLeft();

    if (record === 0) {
      alert('Congratulations on finishing all games!');
      resetNumGamesLeft();
      record = 3;
    }

    setNumGamesLeft(record);
  }, []);

  // button onclick
  const reset = () => {
    resetNumGamesLeft();
    setNumGamesLeft(3);
  };

  return (
    <Box
      sx={styles.box}
    >
      <Typography
        sx={styles.line1}
        variant='h5'
      >
        Please choose an option from the sidebar.
      </Typography>
      <Box
        sx={styles.box2}
      >
        <Typography
          sx={styles.line2}
          variant='h5'
        >
          {`Games left to win: ${numGamesLeft}`}
        </Typography>
        <Button
          sx={styles.button}
          variant='outlined'
          color='primary'
          size='small'
          onClick={reset}
        >
          reset
        </Button>
      </Box>
    </Box>
  )
}
