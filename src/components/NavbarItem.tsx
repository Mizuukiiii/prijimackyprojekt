import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

interface NavbarItemProps {
    href: string;
    label: string;
    options: string[];
    picture: any;
    description: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ href, label }) => {
  const router = useRouter();

  // Determine if the current route matches the href
  const isActive = router.pathname === href;

  return (
    <Button href={href}>
      {label}
    </Button>
  );
};

export default NavbarItem;
