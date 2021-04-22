import React, { useState } from "react";
import styles from "./index.module.css";
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Chart from "../../components/Chart";
import {
  IconButton,
  Container,
  Grid,
  Paper,
  TextField,
  Box,
  Fab,
  Tooltip,
  Zoom,
  Divider,
  Typography,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Send, Close } from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import LocalConvenienceStoreOutlinedIcon from "@material-ui/icons/LocalConvenienceStoreOutlined";

const Exercise = () => {
  const [meal, setMeal] = useState("");
  const [ex, setEx] = useState("");
  const [disp, setDisp] = useState("");
  const [calGained, setCalG] = useState(null);
  const [calLost, setCalL] = useState(null);
  const [score, setScore] = useState(0);

  const fetchMeal = async () => {
    const params = new URLSearchParams();
    params.append("query", meal);
    await axios
      .post(`https://trackapi.nutritionix.com/v2/natural/nutrients`, params, {
        headers: {
          "x-app-id": process.env.REACT_APP_API_ID,
          "x-app-key": process.env.REACT_APP_API_KEY,
          "x-remote-user-id": process.env.REACT_APP_REMOTE_ID,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        const temp_data = res.data.foods
          .map((val, ind) => {
            return val.nf_calories;
          })
          .reduce((el, ac) => el + ac);
        //  console.log(temp_data)
        setCalG(temp_data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchEx = async () => {
    const params = new URLSearchParams();
    params.append("query", ex);
    await axios
      .post(`https://trackapi.nutritionix.com/v2/natural/exercise`, params, {
        headers: {
          "x-app-id": process.env.REACT_APP_API_ID,
          "x-app-key": process.env.REACT_APP_API_KEY,
          "x-remote-user-id": process.env.REACT_APP_REMOTE_ID,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        const temp_data = res.data.exercises
          .map((val, ind) => {
            return val.nf_calories;
          })
          .reduce((el, ac) => el + ac);
        //  console.log(temp_data)
        setCalL(temp_data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculate = async (e) => {
    //console.log("worked")
    await fetchMeal();
    await fetchEx();
    setScore((+calLost / +calGained).toFixed(2));
  };
  const submit = () => {
    console.log("submitted");
    // submitting to rest api by getting user's id
  };
  const ipHandler1 = (e) => {
    setMeal(e.target.value);
  };
  const ipHandler2 = (e) => {
    setEx(e.target.value);
  };
  const [search, setSearch] = useState("");
  const [data, setData] = useState([
    { label: "apple" },
    { label: "banana" },
    { label: "pear" },
  ]);
  console.log(search);
  // console.log(process.env.REACT_APP_API_ID)

  return (
    <>
      {/* <div className={styles.container}>
        <h2>Current Score : {score}</h2>
        <Form className="container">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Row>
              <Col>
                <Form.Label>So What do you had for your Meal ?? </Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      onChange={ipHandler1}
                      as="textarea"
                      rows={3}
                      placeholder="eg 10 bananas"
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <Form.Label>Tell Me About Your workout session??</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      onChange={ipHandler2}
                      as="textarea"
                      rows={3}
                      placeholder="eg 10000 steps"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea3">
            <Row>
              <Col>
                <h4>Calories Gained</h4>
                {calGained ? calGained : 0}
              </Col>
              <Col>
                <h4>Calories Burned</h4>
                {calLost ? calLost : 0}
              </Col>
            </Row>
          </Form.Group>
          <Button onClick={calculate} variant="primary">
            Calculate
          </Button>{" "}
          <Button onClick={submit} variant="success">
            Submit
          </Button>{" "}
        </Form>

        {score !== 0 && <Chart gain={calGained} loss={calLost} />}
      </div> */}

      <Container style={{ width: "80%", marginTop: "5rem" }}>
        <Paper>
          <Grid item xs={12}>
            <Container style={{ padding: "1rem" }}>
              <Typography variant="h4">Current Score : {score}</Typography>
            </Container>

            <Container style={{ padding: "1rem" }}>
              <Typography variant="h6">
                So What do you had for your Meal ?
              </Typography>
            </Container>
            <Grid container spacing={3}>
              <Grid item xs style={{ padding: "1rem" }}>
                <TextField
                  // label="e.g. 2 Bananas"
                  onChange={ipHandler1}
                  multiline
                  rows={4}
                  style={{ width: "50ch" }}
                  placeholder="e.g. 2 Bananas"
                  id="outlined-size-normal"
                  variant="outlined"
                  color="secondary"
                />
              </Grid>
              <Grid item xs style={{ paddingTop: "3rem" }}>
                <Typography variant="h6">
                  Calories gained: {calGained ? calGained : 0}
                </Typography>
              </Grid>
            </Grid>

            <Container style={{ padding: "1rem" }}>
              <Typography variant="h6">
                And now, enter your workout session:
              </Typography>
            </Container>
            <Grid container spacing={3}>
              <Grid item xs style={{ padding: "1rem" }}>
                <TextField
                  onChange={ipHandler2}
                  multiline
                  rows={4}
                  style={{ width: "50ch" }}
                  placeholder="e.g. 3000 Steps"
                  id="outlined-size-normal"
                  variant="outlined"
                  color="secondary"
                />
              </Grid>
              <Grid item xs style={{ paddingTop: "3rem" }}>
                <Typography variant="h6">
                  Calories Burned: {calLost ? calLost : 0}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={3} style={{ margin: "1rem" }}>
            <Grid item xs={3}>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                startIcon={<LocalConvenienceStoreOutlinedIcon />}
                style={{ margin: 1 }}
                onClick={calculate}
              >
                Calculate
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                style={{ margin: 1 }}
                onClick={submit}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default Exercise;
