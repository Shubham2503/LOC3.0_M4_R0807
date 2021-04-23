import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import EnhancedTable from "../../components/ScoreTable";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { Skeleton } from "@material-ui/lab";
import {
  Card,
  Container,
  Grid,
  Paper,
  TextField,
  Fab,
  Tooltip,
  Zoom,
  Typography,
  Snackbar,
  IconButton,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { Publish } from "@material-ui/icons";
import { Close } from "@material-ui/icons";

const Scoreboard = () => {
  const [score, setScore] = useState([]);

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async (val) => {
    await axios
      .get("/score")
      .then((res) => {
        setScore(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container className="home">
        {/* <MetaTags>
          <title>Scoreboard</title>
          <meta
            id="meta-description"
            name="description"
            content="Modify your Class at Sharp AI Anti Cheat"
          />
          <meta id="og-title" property="og:title" content="Fittify" />
        </MetaTags> */}
        {/* <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>{classId}</h1>
          </Grid>
        </Grid> */}
        <EnhancedTable score={score}></EnhancedTable>
      </Container>
    </>
  );
};

export default Scoreboard;
