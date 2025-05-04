import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isLoggedIn = !!localStorage.getItem("token");

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ background: "#111" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Section */}
        <div className="headerLeft">
          <Link to="/">
            <img alt="logo" className="header_icon" src="/Logo.png" />
          </Link>
          <Link to="/movies/popular" style={{ textDecoration: "none" }}>
            <span>Popular</span>
          </Link>
          <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
            <span>Top Rated</span>
          </Link>
          <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
            <span>Upcoming</span>
          </Link>
        </div>

        {/* Right Section */}
        <Box>
          {isLoggedIn ? (
            <>
              <IconButton onClick={handleMenuOpen}>
                <Avatar src="/profile.png" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleProfile}>My Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
