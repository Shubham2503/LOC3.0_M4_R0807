import React, { useState } from "react";
import styles from "./index.module.css";
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import SignUp from "../../components/SignUp";
import { Helmet } from "react-helmet";

const Register = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [user, setUser] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        setEmail(e.target.value);
    };
    const setUsername1 = (e) => {
        setUsername(e.target.value);
    };
    const setAge1 = (e) => {
        setAge(e.target.value);
    };
    const setPassword1 = (e) => {
        setPassword(e.target.value);
    };
    const setHeight1 = (e) => {
        setHeight(e.target.value);
    };
    const setWeight1 = (e) => {
        setWeight(e.target.value);
    };
    return (
        <>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Fittfy-Register</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
            </div>
            <SignUp
                onSubmit={handleSubmit}
                setEmail={setEmail1}
                setAge={setAge1}
                setHeight={setHeight1}
                setPassword={setPassword1}
                setUsername={setUsername1}
                setWeight={setWeight1}
            />
        </>
    );
};

export default Register;
