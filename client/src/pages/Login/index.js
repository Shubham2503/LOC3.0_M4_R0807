import React, { useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import Cookies from "js-cookie";

const Login = (props) => {
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(false);

    const inp1 = (e) => {
        setEmail(e.target.value);
    };
    const inp2 = (e) => {
        setPass(e.target.value);
    };

    const is_loaded = (val) => {
        props.is_loaded(val);
    };
    const submit = async () => {
        await axios
            .post(`/user/login`, {
                email: email,
                password: pass,
            })
            .then((res) => {
                const temp_data = res.data;
                console.log(temp_data);
                if (temp_data) {
                    Cookies.set("id", temp_data);

                    is_loaded(true);
                    setError(false);
                    console.log(error);
                }
            })
            .catch((err) => {
                setError(true);
                console.log(err);
                setSuccess(false);
            });
    };

    return (
        <div className={styles.box}>
            <h3>Log in</h3>

            <div className="form-group">
                <label>Email</label>
                <input
                    onChange={inp1}
                    value={email}
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    onChange={inp2}
                    value={pass}
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                />
            </div>

            {error === true && (
                <h6 style={{ color: "red" }}>* Wrong Email or Password</h6>
            )}
            <button onClick={submit} className="btn btn-dark btn-lg btn-block">
                Sign in
            </button>
        </div>
    );
};

export default Login;
