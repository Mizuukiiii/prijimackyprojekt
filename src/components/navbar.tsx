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
import firebaseApp from '@/firebase/config';
import { authUtils } from '../firebase/auth-utils';
import { useAuthContext } from './auth-context-provider';
import { Popper, Grow, Paper, ClickAwayListener, MenuList } from '@mui/material';

const stranky = [
  ['procvicovani', 'Procvičování'],
];



function Navbar() {
  const { currentUser } = useAuthContext();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [openProfileMenu, setOpenProfileMenu] = React.useState(false);
  const anchorRefProfileMenu = React.useRef<HTMLButtonElement>(null);

  const handleToggleProfileMenu = () => {
    setOpenProfileMenu((prevOpen) => !prevOpen);
  };

  const handleCloseProfileMenu = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRefProfileMenu.current &&
      anchorRefProfileMenu.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpenProfileMenu(false);
  };

  function handleProfileMenuKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenProfileMenu(false);
    } else if (event.key === 'Escape') {
      setOpenProfileMenu(false);
    }
  }

  const prevOpenProfileMenu = React.useRef(openProfileMenu);
  React.useEffect(() => {
    if (prevOpenProfileMenu.current === true && openProfileMenu === false) {
      anchorRefProfileMenu.current!.focus();
    }

    prevOpenProfileMenu.current = openProfileMenu;
  }, [openProfileMenu]);

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
              PrijimackyMaster
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
          {currentUser?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
          <MenuItem onClick={() => router.push('/admin')}>
                  <Typography textAlign="center">Stránka Admina</Typography>
                </MenuItem>
                )}
          {currentUser?.displayName ? (
            <Box sx={{ mr: 5 }}>
              <Button
                ref={anchorRefProfileMenu}
                id="profile-menu-button"
                aria-controls={openProfileMenu ? 'profile-menu' : undefined}
                aria-expanded={openProfileMenu ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggleProfileMenu}
              >
                {currentUser.displayName}
              </Button>
              <Popper
                open={openProfileMenu}
                anchorEl={anchorRefProfileMenu.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseProfileMenu}>
                        <MenuList
                          autoFocusItem={openProfileMenu}
                          id="profile-menu"
                          aria-labelledby="profile-menu-button"
                          onKeyDown={handleProfileMenuKeyDown}
                        >
                          {/* <MenuItem onClick={handleCloseProfileMenu}>
                            <Link href="/muj-ucet" passHref>
                              <Typography color="inherit" variant="inherit">
                                Můj Účet
                              </Typography>
                            </Link>
                          </MenuItem> */}
                          <MenuItem onClick={handleCloseProfileMenu}>
                            <Link href="/historie" passHref>
                              <Typography color="inherit" variant="inherit">
                                Historie
                              </Typography>
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleLogout}>Odhlásit se</MenuItem>

                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>
          ) : (
            <Link href={'/login'} key={'login'}>
              <Button
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  border: 0,
                  borderRadius: 4,
                  mt: 2,
                  mr: 2,
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  color: 'white',
                  height: 40,
                  padding: '0 30px',
                }}
              >
                Přihlásit se
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export { Navbar };

