import React, { useState, useRef } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';

interface NavbarItemProps {
  href: string;
  label: string;
  options: string[];
  picture: any[];
  description: string[];
}

const NavbarItem: React.FC<NavbarItemProps> = ({ href, label, options }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const timeoutRef = useRef<string |number|  any>(null);

  // Determine if the current route matches the href
  const isActive = router.pathname === href;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    clearTimeout(timeoutRef.current);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, 200); // Adjust the delay as needed (200 milliseconds in this example)
  };

  return (
    <div onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose}>
      <Button href={href}>
        {label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onMouseEnter={handleMenuOpen}
        onMouseLeave={handleMenuClose}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={handleMenuClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default NavbarItem;
