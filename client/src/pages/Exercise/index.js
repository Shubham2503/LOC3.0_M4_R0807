import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import LocalConvenienceStoreOutlinedIcon from "@material-ui/icons/LocalConvenienceStoreOutlined";
import PieChart from "../../components/PieChart";
import Cookies from "js-cookie";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Helmet } from "react-helmet";

const Exercise = () => {
    useEffect(() => {
        if (calLost) {
            const updateScore = (parseInt(calLost) * 100) / parseInt(calGained);
            setScore(updateScore);
        }
    });

    const [open, setOpen] = React.useState(false);
    const [meal, setMeal] = useState("");
    const [ex, setEx] = useState("");
    const [calGained, setCalG] = useState(null);
    const [calLost, setCalL] = useState(null);
    const [score, setScore] = useState(0);
    const [count, setCount] = useState(0);
    const [pieData, setPieData] = useState([
        {
            id: "calLost",
            label: "Calories Lost",
            value: 0,
            color: "hsl(150, 100%, 40%)",
        },
        {
            id: "calGained",
            label: "Calories Gained",
            value: 0,
            color: "hsl(42, 70%, 50%)",
        },
    ]);

    useEffect(() => {
        setPieData([
            {
                id: "calLost",
                label: "Calories Lost",
                value: calLost,
                color: "hsl(150, 100%, 40%)",
            },
            {
                id: "calGained",
                label: "Calories Gained",
                value: calGained,
                color: "hsl(42, 70%, 50%)",
            },
        ]);
    }, [count]);

    const fetchMeal = async () => {
        const params = new URLSearchParams();
        params.append("query", meal);
        await axios
            .post(
                `https://trackapi.nutritionix.com/v2/natural/nutrients`,
                params,
                {
                    headers: {
                        "x-app-id": process.env.REACT_APP_API_ID,
                        "x-app-key": process.env.REACT_APP_API_KEY,
                        "x-remote-user-id": process.env.REACT_APP_REMOTE_ID,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )
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
            .post(
                `https://trackapi.nutritionix.com/v2/natural/exercise`,
                params,
                {
                    headers: {
                        "x-app-id": process.env.REACT_APP_API_ID,
                        "x-app-key": process.env.REACT_APP_API_KEY,
                        "x-remote-user-id": process.env.REACT_APP_REMOTE_ID,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )
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
        await fetchMeal().then(async () => {
            await fetchEx().then(() => {
                setCount(count + 1);
            });
        });
    };
    const submit = async () => {
        // submitting to rest api by getting user's id

        await axios.post(`/score/update/${Cookies.get("id")}`, {
            score: parseInt(score.toString()),
        });
        console.log("Updated");

        setOpen(true);
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

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Excerise</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
            </div>
            <Container style={{ width: "80%", marginTop: "5rem" }}>
                <Paper>
                    <Grid item xs={12}>
                        <Container style={{ padding: "1rem" }}>
                            <Typography variant="h4">
                                Current Score : {score.toPrecision(4)}
                            </Typography>
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
                    {score !== 0 && (
                        <Paper style={{ height: "20rem" }} elevation={0}>
                            <PieChart data={pieData}></PieChart>
                        </Paper>
                    )}

                    <Grid container spacing={3} style={{ margin: "1rem" }}>
                        <Grid item xs={3}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="large"
                                startIcon={
                                    <LocalConvenienceStoreOutlinedIcon />
                                }
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

            {/* snackbar */}
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Results Saved"
                    action={
                        <React.Fragment>
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={handleClose}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </div>
        </>
    );
};

export default Exercise;
