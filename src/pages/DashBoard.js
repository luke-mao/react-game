import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'

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
    fontSize: '2em',
    fontFamily: 'Monospace',
  },
  box2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line2: {
    color: 'blue',
    fontSize: '2em',
    display: 'inline',
    fontFamily: 'Monospace',
  },
  button: {
    display: 'inline',
    ml: 5,
  },
};

export default function DashBoard() {
  const [numGamesLeft, setNumGamesLeft] = useState(3);

  // after loading, check with local storage
  useEffect(() => {
    // get from the local storage, check if the number if valid.
    let isSet = false;

    if (localStorage.getItem('numGamesLeft') !== null) {
      // check the stored value
      const value = localStorage.getItem('numGamesLeft');
      const regex = /^\d+$/;

      if (value.match(regex)) {
        const numValue = parseInt(value);

        // if the value is 0, alert message shows congratulations
        if (numValue === 0) {
          alert('Congratulations!!!');
          reset();
          isSet = true;
        }
        else if (numValue <= 3) {
          setNumGamesLeft(numValue);
          isSet = true;
        }
      }
    }

    if (!isSet) {
      localStorage.setItem('numGamesLeft', '3');
    }
  }, []);

  // button onclick
  const reset = () => {
    setNumGamesLeft(3);
    localStorage.setItem('numGamesLeft', '3');
  };

  return (
    <Box
      sx={styles.box}
    >
      <Typography
        sx={styles.line1}
      >
        Please choose an option from the sidebar.
      </Typography>
      <Box
        sx={styles.box2}
      >
        <Typography
          sx={styles.line2}
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
