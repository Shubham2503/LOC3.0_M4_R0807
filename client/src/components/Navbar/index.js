import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import Cookies from "js-cookie";
import {
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
import Button from "@material-ui/core/Button";
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
}));

const Navbr = (props) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const logout = () => {
    props.is_loaded(false);
    Cookies.remove("id");
  };

  return (
    <div className={styles.container}>
      <Navbar collapseOnSelect expand="md">
        <Navbar.Brand>
          <Link
            className={styles.navBrand}
            style={{ textDecoration: "none" }}
            to="/"
          >
            {" "}
            <h1 className={styles.head1}>Home</h1>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className={styles.rNavbar}>
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Item>
              <Link className={styles.navLink} to="/scoreboard">
                Scoreboard
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className={styles.navLink} to="/exercise">
                Exercise
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className={styles.navLink} to="/goal">
                Goal
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className={styles.navLink} to="/createpost">
                Create Post
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className={styles.navLink} to="/user">
                User
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link onClick={logout} className={styles.navLink} to="/logout">
                Logout
              </Link>
            </Nav.Item>
            {/* <Nav.Item>
                            <Link className={styles.navLink}to="/alltransaction" >Transaction</Link>
                        </Nav.Item> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <AppBar color="secondary" position="static">
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
          <Typography variant="h5" className={classes.title}>
            Fittfy
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(true);
        }}
      >
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <hr />
    </div>
  );
};

export default Navbr;
