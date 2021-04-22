import React, { useState } from "react";
import styles from "./index.module.css";
import { Form, Button, Col, Modal, Container } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { Grid, Paper, TextField } from "@material-ui/core";
import { ResponsivePie } from "@nivo/pie";

const Createpost = () => {
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

  const data = [
    {
      id: "hack",
      label: "hack",
      value: 494,
      color: "hsl(344, 70%, 50%)",
    },
    {
      id: "stylus",
      label: "stylus",
      value: 164,
      color: "hsl(42, 70%, 50%)",
    },
  ];
  return (
    <>
      <div className={styles.container}>
        <Form>
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
        </Form>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>POST</Modal.Title>
          </Modal.Header>
          {!iserror ? (
            <Modal.Body>Woohoo, post added successfuly</Modal.Body>
          ) : (
            <Modal.Body>
              opsee, something went wrong with your post check whether your post
              containt explicit content.
            </Modal.Body>
          )}
          <Modal.Footer>
            {!iserror ? (
              <Button variant="success" onClick={() => setShow(false)}>
                Close
              </Button>
            ) : (
              <Button variant="danger" onClick={() => setShow(false)}>
                Close
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>

      <Grid className="mainContainer">
        {/* <MetaTags>
          <title>Create Exam | Sharp AI</title>
          <meta
            id="meta-description"
            name="description"
            content="Create Exam at Sharp AI"
          />
          <meta
            id="og-title"
            property="og:title"
            content="Sharp AI Anti Cheat"
          />
        </MetaTags> */}
        <Paper elevation={0}>
          <Grid className="createPost">
            <Grid item xs={12}>
              <TextField
                className="createPostTextField"
                label="Create Exam Code"
                id="outlined-size-normal"
                variant="outlined"
                color="secondary"
                multiline
                rowsMax="3"
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default Createpost;
