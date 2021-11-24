import React from 'react'
import { Box } from '@mui/system';
import Logo from '../images/logo.png';
import { Avatar, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

const styles = (theme) => ({
  sidebar: {
    position: 'fixed',
    backgroundColor: '#eee', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    width: '100px',

    // the width changes between 30px, 60px, 100px
    [theme.breakpoints.down('md')]: {
      width: '30px',
    },
    [theme.breakpoints.only('md')]: {
      width: '60px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '100px',
    },
  },
  logo: {
    marginTop: '15px',
    marginBottom: '15px',
    height: '50px',
    width: '50px',

    // logo disappears for under 800px
    display: {
      xs: 'none',
      sm: 'none',
      md: 'block',
      lg: 'block',
      xl: 'block',
    },
  },
  stackLinks: {
    mt: 5,
  },
  // sepaaration of 1400px, the textcontent changes
  displaySmall: {
    // below 800px
    display: {
      xs: 'block',
      sm: 'block',
      md: 'block',
      lg: 'none',
      xl: 'none'
    }
  },
  displayBig: {
    // more than 1400px
    display: {
      xs: 'none',
      sm: 'none',
      md: 'none',
      lg: 'block',
      xl: 'block',
    }
  }
});

export default function Sidebar() {
  console.log(styles);
  const theme = useTheme();

  return (
    <Box
      sx={styles(theme).sidebar}
    >
      <Avatar
        variant='square'
        sx={styles(theme).logo}
        src={Logo}
        alt='logo'
      />
      <Stack
        sx={styles(theme).stackLinks}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={7}
      >
        {/* each link has three display mode */}
        <Link 
          to='/home'
          component={RouterLink}
        >
          <Typography sx={styles(theme).displaySmall}>H</Typography>
          <Typography sx={styles(theme).displayBig}>Home</Typography>
        </Link>
        <Link 
          to='/tictac'
          component={RouterLink}
        >
          <Typography sx={styles(theme).displaySmall}>Ti</Typography>
          <Typography sx={styles(theme).displayBig}>Tictac</Typography>
        </Link>
        <Link 
          to='/tower'
          component={RouterLink}
        >
          <Typography sx={styles(theme).displaySmall}>To</Typography>
          <Typography sx={styles(theme).displayBig}>Tower</Typography>
        </Link>
        <Link 
          to='/snek'
          component={RouterLink}
        >
          <Typography sx={styles(theme).displaySmall}>S</Typography>
          <Typography sx={styles(theme).displayBig}>Snek</Typography>
        </Link>
      </Stack>
    </Box>
  )
}
