import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  // IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  SvgIconComponent,
  AccountCircleTwoTone,
  MedicalInformation,
  LocalHospital,
} from "@mui/icons-material";

// import {
//   // KeyboardArrowDown,
//   VoiceChat,
//   History,
// } from "@mui/icons-material";

import logo from "../assets/logo.png";

interface IMenu {
  id: string;
  title: string;
  url: string;
  icon: SvgIconComponent;
}

const menus: IMenu[] = [
  {
    id: "session",
    title: "New Session",
    url: "/session",
    // icon: VoiceChat,
    icon: LocalHospital,
  },
  {
    id: "history",
    title: "Session History",
    url: "/history",
    // icon: History,
    icon: MedicalInformation,
  },
];

const DashboardOutlet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const userName = "Doctor";
  const userMessage = "Have a great day!";

  const navigate = useNavigate();

  // const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOnMenuSelected = (menu: IMenu) => {
    navigate(menu.url);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

  const list = () => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menus.map((menu, index) => (
          <ListItem key={menu.id} disablePadding>
            <ListItemButton>
              <ListItemIcon>{<menu.icon />}</ListItemIcon>
              <ListItemText
                primary={menu.title}
                onClick={() => handleOnMenuSelected(menu)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "background.default" }}>
      <CssBaseline />
      <AppBar position="fixed" color={"inherit"} elevation={0}>
        <Toolbar>
          <ListItemIcon onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon />
          </ListItemIcon>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div>Greetings, {userName}!</div>
            <div className="text-xs">{userMessage}</div>
          </Typography>
          <div>
            <AccountCircleTwoTone fontSize={"large"} color={"disabled"} />
          </div>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
        <Divider />
      </AppBar>
      <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
        <Toolbar
          sx={{
            padding: 0,
          }}
        >
          <img
            src={logo}
            alt="Logo"
            width={250}
            style={{ marginRight: "auto" }}
          />
        </Toolbar>
        <Divider />
        {list()}
      </Drawer>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardOutlet;
