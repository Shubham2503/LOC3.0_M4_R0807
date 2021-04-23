import React, { useState } from "react";
import styles from "./index.module.css";
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import SignUp from "../../components/SignUp"

const Register = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [user, setUser] = useState(null);

    const handleSubmit = async () => {
        const formData = {
            username,
            email,
            password,
            height,
            weight,
            age,
        };
        await axios
            .post("/user", formData)
            .then((res) => {
                Cookies.set("id", res.data._id);
                props.is_loaded(true);
            })
            .catch((err) => console.log(err.message));
    };
    const setEmail1 = (e) => {
        setEmail(e.target.value)
    }
    const setUsername1 = (e) => {
        setUsername(e.target.value)
    }
    const setAge1 = (e) => {
        setAge(e.target.value)
    }
    const setPassword1 = (e) => {
        setPassword(e.target.value)
    }
    const setHeight1 = (e) => {
        setHeight(e.target.value)
    }
    const setWeight1 = (e) => {
        setWeight(e.target.value)
    }
    return (
        <>
        <SignUp setEmail = {setEmail1} setAge = {setAge1} setHeight = {setHeight1} setPassword = {setPassword1} setUsername = {setUsername1} setWeight = {setWeight1}  />
        <div className={styles.box}>
            <h3>Register</h3>
            <Form className="container">
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="username"
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
                            name="password"
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
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Register
            </Button>
        </div>
        </>
    );
};

export default Register;
