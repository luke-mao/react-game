import React from 'react';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

const styles = {
  backgroundColor: '#fff',
  border: '1px solid #333',
  height: '150px',
  width: '300px',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

export default function DialogWindow({ isOpen, children, buttonText, buttonOnClick }) {
  if (isOpen) {
    return (
      <Box
        sx={styles}
      >
        {children}
        <Button
          sx={{ mt: 2 }}
          variant='contained'
          color='secondary'
          size='small'
          onClick={buttonOnClick}
        >
          {buttonText}
        </Button>
      </Box>
    );
  }
  else {
    return <></>
  }
}
