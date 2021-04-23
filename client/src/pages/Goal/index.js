import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Form, Button, Col, Modal, Table } from "react-bootstrap";
import axios from "axios";
import Notification from "../../components/Notification";
import Cookies from "js-cookie";
import StickyFooter from "../../components/Footer";

const Goal = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [time, setTime] = useState("");
    const [data, setData] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(Cookies.get("id"));

    const handleNotification = () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 10);
    };

    const handleClick = async () => {
        handleNotification();
        await axios
            .post(`/goals/${Cookies.get("id")}`, {
                title,
                description: desc,
                time,
            })
            .then((res) => {
                getData();
                handleClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios
            .get(`/goals/${Cookies.get("id")}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    console.log(data);

    return (
        <>
            <div className={styles.container}>
                <Notification
                    title={"Added Goal"}
                    msg={"Good to see that new goals are added"}
                    visible={showNotification}
                />
                <h2>Your Goals</h2>
                <Button variant="primary" onClick={handleShow}>
                    Add Goal
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Goal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="container">
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="Enter title"
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
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

                            <Form.Group>
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                    type="time"
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClick}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                {data !== null && (
                    <Table
                        className={styles.table}
                        responsive
                        striped
                        bordered
                        hover
                        variant="dark"
                    >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>description</th>
                                <th>time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((ele, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{ele.title}</td>
                                        <td>{ele.description}</td>
                                        <td>{ele.time}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                )}
            </div>
            <StickyFooter />
        </>
    );
};

export default Goal;
