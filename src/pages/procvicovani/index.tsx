import React, { useEffect, useState } from 'react';
import { AppBar, CssBaseline, Drawer, Toolbar, List, ListItem, ListItemText, Typography, Divider, Collapse, Avatar, CircularProgress } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdcIcon from '@mui/icons-material/MenuBookRounded';
import MathIcon from '@mui/icons-material/PercentRounded';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';

import { useAuthContext } from '../../components/auth-context-provider';


const drawerWidth = 240;



const SideBar = () => {

  const { currentUser } = useAuthContext();

  const [openRollable1, setOpenRollable1] = useState(false);
  const [openRollable2, setOpenRollable2] = useState(false);
  
  const handleRollable1Click = () => {
    setOpenRollable1(!openRollable1);
  };

  const handleRollable2Click = () => {
    setOpenRollable2(!openRollable2);
  };

  
  


  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
        }}
        variant="permanent"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary={currentUser?.displayName} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleRollable1Click}>
            <AdcIcon /> {/* Icon for Rollable Item 1 */}
            <ListItemText primary="Rollable Item 1" />
            {openRollable1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={openRollable1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {["pravopis", "slovní zásoba", "skladba", "tvarosloví", "porozumění textu", "sloh", "literatura"].map((item) => (
                <ListItem key={item}>
                  <ListItemText primary={`${item}`} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListItem onClick={handleRollable2Click}>
            
            <MathIcon /> {/* Icon for Rollable Item 2 */}
            <ListItemText primary="Rollable Item 2" />
            {openRollable2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={openRollable2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {["výrazy", "rovnice", "zlomky", "práce s daty", "geometrie", "převody jednotek", "aplikační úlohy"].map((item) => (
                <ListItem button key={item}>
                    <CircularProgress color="success" size={20} thickness={10} variant="determinate" value={75} sx={{mx: 2}} />
                  <ListItemText primary={`${item}`}/>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
  <ListItem>
    <FeedRoundedIcon /> {/* Replace YourIconComponent with the icon you want to use */}
    <ListItemText primary="Test" />
  </ListItem>
</List>
      </Drawer>
      <main style={{ flexGrow: 1 }}>
        <Toolbar />
        {/* Content for the main section */}
      </main>
    </div>
  );
};

export default SideBar;
