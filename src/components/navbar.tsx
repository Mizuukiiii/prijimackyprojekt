import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import NavbarItem from './NavbarItem';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <Toolbar sx={{ display: 'flex' }}>
        <Typography variant="h6" component="div" sx={{ color: 'blue', ml: '5vw' }}>
          Your Logo or Brand
        </Typography>
        <Box sx={{ justifyContent: 'flex-start', ml:5 }}>
          <NavbarItem href="/" label="Procvičování" options={[]} picture={[]} description={[]} />
          <NavbarItem href="/about" label="Blog" options={[]} picture={[]} description={[]} />
          <NavbarItem href="/contact" label="O projektu" options={[]} picture={[]} description={[]} />
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
