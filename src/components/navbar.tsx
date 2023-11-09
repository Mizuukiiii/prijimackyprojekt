import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import router from 'next/router';
import * as React from 'react';
import { firebaseApp } from '@/firebase/config';
import { authUtils } from '../firebase/auth-utils';
import { useAuthContext } from './auth-context-provider';

const stranky = [
  ['procvicovani', 'Procvičování'],
  ['cenik', 'Ceník'],
];

function Navbar() {
  const { currentUser } = useAuthContext();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = async () => {
    await authUtils.logout();
    return router.push('/');
  };
  return (
    
    <AppBar
      position="static"
      style={{
        color: 'blue',
        background: 'white',
        position: 'fixed',
        top: 0,
        zIndex: 2,
      }}
      elevation={0}
    >
      <Container maxWidth="xl" style={{ paddingLeft: '10%' }}>
        <Toolbar disableGutters>
          <Link href={`/`} key={'/'}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'roboto',
                fontWeight: 700,
                color: '#1961ff',
                textDecoration: 'none',
              }}
            >
              Prijimacky
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {stranky.map((page) => (
                <MenuItem key={page[1]} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Procvičování
          </Typography>
          <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' }, pl: 2 }}>
            {stranky.map((page) => (
              <Link href={`/${page[0]}`} key={page[0]}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ pt: 1, pr: 1, mr: 2, color: 'black', display: 'block' }}
                >
                  <Typography
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                  >
                    {page[1]}
                  </Typography>
                </Button>
              </Link>
            ))}
          </Box>

          {currentUser?.displayName ? (
            <Box sx={{ mr: 5 }}>{currentUser.displayName}</Box>
          ) : (
            <Link href={'/login'} key={'login'}>
              <Button
                variant="contained"
                sx={{ mr: 2, backgroundColor: '#1961ff' }}
              >
                Přihlásit se
              </Button>
            </Link>
          )}

          {currentUser?.displayName ? (
            <Button
              variant="contained"
              sx={{ ml: 2, backgroundColor: '#1961ff' }}
              onClick={handleLogout}
            >
              Odhlásit se
            </Button>
          ) : (
            ' '
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export { Navbar };

