import React from "react";

import "./NavBar.css";
import signature from "../../assets/signature.png";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [anchorE3, setAnchorE3] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickr = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClick3 = (event) => {
    setAnchorE3(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorE2(null);
    setAnchorE3(null);
  };
  return (
    <div>
      <header className="header">
        <div className="logo">
          <img
            style={{
              marginLeft: "5%",
              width: "15rem",
              // position: "absolute",
              cursor: "grab",
              zIndex: "1000",
            }}
            src={signature}
            alt="Pablo Pulgar: Artist, warrior, musician, and financial virtuoso."
          ></img>
        </div>
        <ul className="main-nav">
          {/* WORKING ON NESTED MENU BELOW*/}
          <li>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Open Menu
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem>
                {/* //// */}
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClickr}
                >
                  Open Menu
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorE2}
                  keepMounted
                  open={Boolean(anchorE2)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Nested menu</MenuItem>
                </Menu>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorE3}
                  keepMounted
                  open={Boolean(anchorE3)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Nested menu</MenuItem>
                </Menu>
                {/* //// */}
              </MenuItem>
            </Menu>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default NavBar;
