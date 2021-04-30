import React, { useEffect, useState } from "react";
import axios from "axios";
import EnhancedTable from "../../components/ScoreTable";
import { Container } from "@material-ui/core";
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
        {score ? <EnhancedTable score={score}></EnhancedTable> : null}
      </Container>
    </>
  );
};

export default Scoreboard;
