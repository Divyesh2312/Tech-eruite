import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Header = () => {
  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Product Management System
        </Typography>
        <Box>
          <Typography variant="body1" component="span">
            Divyesh
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
