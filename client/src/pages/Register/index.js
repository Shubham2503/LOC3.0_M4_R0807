import React, { useState } from "react";
import styles from "./index.module.css";
import { Form, Button, Col, Modal, Table } from "react-bootstrap";
import axios from "axios";

const Register = () => {
    const [usename, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");

    const handleClick = async () => {
        await axios
            .post("/user", {
                usename,
                email,
                password,
                height,
                weight,
                age,
            })
            .then((res) => {})
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={styles.box}>
            <h3>Register</h3>
            <Form className="container">
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="User Name"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="pass"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Height</Form.Label>
                        <Form.Control
                            type="number"
                            name="height"
                            placeholder="Height"
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            type="number"
                            name="weight"
                            placeholder="Weight"
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            name="age"
                            placeholder="Age"
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
            </Form>
            <Button variant="primary" type="submit" onClick={handleClick}>
                Register
            </Button>
        </div>
    );
};

export default Register;
