import React, { useEffect, useState } from "react";
import axios from "axios";
import EnhancedTable from "../../components/ScoreTable";
import { Container } from "@material-ui/core";
import { Helmet } from "react-helmet";
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
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Leader Board</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
            </div>
            <Container className="home">
                {score ? <EnhancedTable score={score}></EnhancedTable> : null}
            </Container>
        </>
    );
};

export default Scoreboard;
