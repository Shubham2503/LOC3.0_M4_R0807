import React, { useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "@material-ui/core/Button";
import SignInSide from "../../components/SignInSide";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
const Login = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const inp1 = (e) => {
    setEmail(e.target.value);
  };
  const inp2 = (e) => {
    setPass(e.target.value);
  };

  const is_loaded = (val) => {
    props.is_loaded(val);
  };
  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post(`/user/login`, {
        email: email,
        password: pass,
      })
      .then((res) => {
        const temp_data = res.data;
        console.log(temp_data);
        if (temp_data) {
          Cookies.set("id", temp_data);

          is_loaded(true);
          setError(false);
          console.log(error);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
        setSuccess(false);
        setOpen(true);
      });
  };

  return (
    <>
      <SignInSide
        onEmailChange={inp1}
        onPasswordChange={inp2}
        onSubmit={submit}
      />

      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Incorrect email or password!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Login;
