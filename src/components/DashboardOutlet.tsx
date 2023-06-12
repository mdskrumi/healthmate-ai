import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { SvgIconComponent } from "@mui/icons-material";

import { KeyboardArrowDown, VoiceChat, History } from "@mui/icons-material";

import logo from "../assets/logo.png";

const drawerWidth = 240;

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
    icon: VoiceChat,
  },
  {
    id: "history",
    title: "Session History",
    url: "/history",
    icon: History,
  },
];

const DashboardOutlet: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMenu, setSelectedMenu] = useState<null | string>(null);

  const userName = "Dr. Andreas";
  const userMessage =
    "I hope you are in good mood because many patients are waiting for you!";

  const navigate = useNavigate();

  const location = useLocation();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOnMenuSelected = (menu: IMenu) => {
    setSelectedMenu(menu.id);
    navigate(menu.url);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedMenu(null);
    }
  }, [location.pathname]);

  return (
    <Box sx={{ display: "flex", bgcolor: "background.default" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          // backgroundColor: "trans",
        }}
        color="default"
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: "16px" }}
          >
            <div>Good Morning, {userName}!</div>
            <div className="text-sm text-gray-500">{userMessage}</div>
          </Typography>
          <div>
            <AccountCircleIcon fontSize={"large"} />
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <KeyboardArrowDown />
            </IconButton>
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
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <div onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" />
          </div>
        </Toolbar>
        <Divider />
        <List>
          {menus.map((item, _) => (
            <ListItem
              key={item.title}
              disablePadding
              className={
                selectedMenu && selectedMenu === item.id ? "bg-gray-100" : ""
              }
            >
              <ListItemButton onClick={() => handleOnMenuSelected(item)}>
                <ListItemIcon>{<item.icon />}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardOutlet;
