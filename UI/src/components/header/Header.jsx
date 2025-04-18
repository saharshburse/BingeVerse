// import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"

// const Header = () => {
//     return (
//         <div className="header">
//             <div className="headerLeft">
//                 <Link to="/"> <img alt="" className="header_icon" src="Logo.png"/></Link>
//                 <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
//                 <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
//                 <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
//             </div>
//             <div>
//             <Link to="/register" style={{textDecoration: "none"}}><span>Register</span></Link>
//             <Link to="/login" style={{textDecoration: "none"}}><span>Login</span></Link>
               

//             </div>
//         </div>
//     )
// }

// export default Header

import React, { useState } from 'react';
import { Menu, MenuItem, Avatar, IconButton } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null); // Menu anchor element
  const navigate = useNavigate(); // For navigation

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element for the menu
  };

  const closeMenu = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Redirect to profile page
    closeMenu();
  };

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page after sign out
    closeMenu();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', alignItems: 'center' }}>
      {/* <div> Add your app name or logo here BingeVerse</div> */}
      <div className="header">
             <div className="headerLeft">
                 <Link to="/"> <img alt="" className="header_icon" src="Logo.png"/></Link>
                 <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                 <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                 <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
             </div>
             <div>
             <Link to="/register" style={{textDecoration: "none"}}><span>Register</span></Link>
             <Link to="/login" style={{textDecoration: "none"}}><span>Login</span></Link>
               

             </div>
         </div>
      <div>
      
        <IconButton onClick={openMenu}>
          <Avatar alt="Profile" src="/profile.png" /> {/* Add a default profile image or use dynamic one */}
          <ArrowDropDown />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
        >
          <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
