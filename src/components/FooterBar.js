import { Box, useTheme } from '@mui/system'
import React from 'react'

const styles = (theme) => ({
  position: 'fixed',
  height: '50px',
  bottom: '0',
  right: '0',
  backgroundColor: '#999',

  // span the full width, but consider the sidebar width.
  // sidebar has 30px, 60px, and 100px
  [theme.breakpoints.down('md')]: {
    width: 'calc(100% - 30px)',
  },
  [theme.breakpoints.only('md')]: {
    width: 'calc(100% - 60px)',
  },
  [theme.breakpoints.up('lg')]: {
    width: 'calc(100% - 100px)',
  },
});

export default function FooterBar() {
  const theme = useTheme();
  
  // the box has no content
  return (
    <Box
      sx={styles(theme)}
    />
  )
}
