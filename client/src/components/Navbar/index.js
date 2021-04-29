import React, { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router";

import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));

const Navbr = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const logout = () => {
    props.is_loaded(false);
    Cookies.remove("id");
  };

  return (
    <div>
      <AppBar color="primary" position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon
              onClick={() => {
                setDrawerOpen(true);
              }}
            />
          </IconButton>
          <Typography
            variant="h5"
            className={classes.title}
            onClick={() => {
              history.push(`/`);
            }}>
            Fittfy
          </Typography>
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        className={"hello"}
        anchor="left"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(!drawerOpen);
        }}
      >
        <Divider />
        <List style={{ width: "250px" }}>
          {["Scoreboard", "Exercise", "Goal", "Create Post", "User"].map(
            (text, index) => (
              <div
                role="presentation"
                onClick={() => {
                  setDrawerOpen(false);
                }}
                onKeyDown={() => {
                  setDrawerOpen(false);
                }}
              >
                <ListItem
                  button
                  key={text}
                  onClick={() => {
                    history.push(`/${text.toLowerCase().split(" ").join("")}`);
                  }}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </div>
            )
          )}
        </List>
      </Drawer>
      <hr />
    </div>
  );
};

export default Navbr;
