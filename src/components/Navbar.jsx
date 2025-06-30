import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{'background-color': '#098706'}} position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left side: Home / About */}
        <Box>
          <Button color="inherit" href="/">Home</Button>

           {/* Settings Dropdown */}
          <Button
            color="inherit"
            onClick={handleOpenSettings}
          >
            Settings
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseSettings}
          >
            <MenuItem component={Link} to="/trainers" onClick={handleCloseSettings}>
              Trainers
            </MenuItem>
            {/* Add more menu items here if needed */}
          </Menu>

          <Button color="inherit" href="/about">About</Button>
        </Box>

        {/* Right side: Register / Login */}
        <Box>
          <Button color="inherit" href="/register">Register</Button>
          <Button color="inherit" href="/login">Login</Button>
          <Button color="inherit" href="/logout">Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
