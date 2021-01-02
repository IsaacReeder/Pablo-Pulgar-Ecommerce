import React from "react";
import { Link, useHistory } from "react-router-dom";

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

  const history = useHistory();
  const redirectButtonClick = (id) => {
    history.push(id);
    handleClose();
  };
  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        <li>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Works
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              {/* //// */}
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClickr}
              >
                Fine Art
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
            <MenuItem>
              {/* //// */}
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick3}
              >
                Collaborations
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorE2}
                keepMounted
                open={Boolean(anchorE2)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => redirectButtonClick("/2")}>
                  Installation
                </MenuItem>
                <MenuItem onClick={() => redirectButtonClick("/3")}>
                  Paintings
                </MenuItem>
                <MenuItem onClick={() => redirectButtonClick("/4")}>
                  Collages
                </MenuItem>
                <MenuItem onClick={() => redirectButtonClick("/1")}>
                  Print
                </MenuItem>
              </Menu>
              <Menu
                id="simple-menu"
                anchorEl={anchorE3}
                keepMounted
                open={Boolean(anchorE3)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => redirectButtonClick("/5")}>
                  Clothing
                </MenuItem>
                <MenuItem onClick={() => redirectButtonClick("/6")}>
                  Fanzines
                </MenuItem>
                <MenuItem onClick={() => redirectButtonClick("/7")}>
                  Video
                </MenuItem>
              </Menu>
              {/* //// */}
            </MenuItem>
          </Menu>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
