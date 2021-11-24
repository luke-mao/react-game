import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const styles = (theme) => ({
  position: 'fixed',
  top: '0',

  // height is 100% minus the footer bar height at 50px.
  height: 'calc(100% - 50px)',

  // width: the sidebar has 30px, 60px and 100px.
  [theme.breakpoints.down('md')]: {
    left: '30px',
    width: 'calc(100% - 30px)',
  },
  [theme.breakpoints.only('md')]: {
    left: '60px',
    width: 'calc(100% - 60px)',
  },
  [theme.breakpoints.up('lg')]: {
    left: '100px',
    width: 'calc(100% - 100px)',
  },

  // add color to check the position
  // backgroundColor: '#666',
});

export default function MainBody({ children }) {
  const theme = useTheme();

  return (
    <Box
      sx={styles(theme)}
    >
      {children}
    </Box>
  )
}
