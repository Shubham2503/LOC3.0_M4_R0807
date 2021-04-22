import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router";

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
  const history = useHistory();
  return (
    <div>
      <div className={classes.root}>
        <AppBar color="secondary" position="static">
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              Fittfy
            </Typography>
            <Button onClick={() => history.push("/login")} color="inherit">
              Login
            </Button>
            <Button onClick={() => history.push("/register")} color="inherit">
              Register
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      <hr />
    </div>
  );
};

export default Navbr;
