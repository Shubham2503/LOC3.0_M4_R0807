import React, { useState } from "react";
import styles from "./index.module.css";
import { Form, Col, Modal } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "../../components/Chart";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

const Createpost = () => {
    const classes = useStyles();
    // function FormRow() {
    //     return (
    //         <React.Fragment>
    //             <Grid item xs={4}>
    //                 <Paper className={classes.paper}>item</Paper>
    //             </Grid>
    //             <Grid item xs={4}>
    //                 <Paper className={classes.paper}>item</Paper>
    //             </Grid>
    //         </React.Fragment>
    //     );
    // }
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [url, setUrl] = useState("");
    const [tag1, setTag1] = useState("");
    const [tag2, setTag2] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [show, setShow] = useState(false);
    const [iserror, setIserror] = useState(false);

    const handleClick = async () => {
        await axios
            .post("/post/create", {
                user: Cookies.get("id"),
                title,
                description: desc,
                images: url,
                tags: [{ tag: tag1 }, { tag: tag2 }],
            })
            .then((res) => {
                console.log(res);
                setShow(true);
                setIserror(false);
            })
            .catch((err) => {
                console.log(err);
                setShow(true);
                setIserror(true);
            });
    };

    return (
        <>
            <div className={styles.container}>
                {/* <Form>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Enter title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Add Description"
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Tag 1</Form.Label>
                            <Form.Control
                                type="text"
                                name="tag1"
                                placeholder="Tag 1"
                                onChange={(e) => setTag1(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Tag 2</Form.Label>
                            <Form.Control
                                type="text"
                                name="tag2"
                                placeholder="Tag 2"
                                onChange={(e) => setTag2(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            placeholder="Image URL"
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" onClick={handleClick}>
                        Submit
                    </Button>
                </Form> */}

                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>POST</Modal.Title>
                    </Modal.Header>
                    {!iserror ? (
                        <Modal.Body>Woohoo, post added successfuly</Modal.Body>
                    ) : (
                        <Modal.Body>
                            opsee, something went wrong with your post check
                            whether your post containt explicit content.
                        </Modal.Body>
                    )}
                    <Modal.Footer>
                        {!iserror ? (
                            <Button
                                variant="success"
                                onClick={() => setShow(false)}
                            >
                                Close
                            </Button>
                        ) : (
                            <Button
                                variant="danger"
                                onClick={() => setShow(false)}
                            >
                                Close
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </div>
            <Container style={{ width: "80%", marginTop: "5rem" }}>
                <Paper style={{}}>
                    <Container>
                        <div className={classes.root}>
                            <Grid container spacing={2} xs={12}>
                                <Container style={{ padding: "1rem" }}>
                                    <center>
                                        <Typography variant="h4">
                                            Create Post
                                        </Typography>
                                    </center>
                                </Container>
                                <Grid item xs={12}>
                                    <TextField
                                        style={{ width: "100%" }}
                                        // label="e.g. 2 Bananas"
                                        autoFocus="true"
                                        placeholder="Enter the title"
                                        id="outlined-size-normal"
                                        variant="outlined"
                                        color="secondary"
                                        label="Title"
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="Add Desciption"
                                        style={{ width: "100%" }}
                                        id="outlined-size-normal"
                                        variant="outlined"
                                        multiline
                                        rows="5"
                                        color="secondary"
                                        label="Description"
                                        onChange={(e) =>
                                            setDesc(e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        style={{ width: "100%" }}
                                        placeholder="Tag 1"
                                        id="outlined-size-normal"
                                        variant="outlined"
                                        color="secondary"
                                        name="tag1"
                                        label="Tag1"
                                        onChange={(e) =>
                                            setTag1(e.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        style={{ width: "100%" }}
                                        placeholder="Tag 2"
                                        id="outlined-size-normal"
                                        variant="outlined"
                                        color="secondary"
                                        name="tag2"
                                        label="Tag2"
                                        onChange={(e) =>
                                            setTag2(e.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="Image URL"
                                        style={{ width: "100%" }}
                                        id="filled-search"
                                        variant="outlined"
                                        color="secondary"
                                        label="Image URL"
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}></Grid>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={1}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        startIcon={<SaveIcon />}
                                        onClick={handleClick}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </Paper>
            </Container>
        </>
    );
};

export default Createpost;
