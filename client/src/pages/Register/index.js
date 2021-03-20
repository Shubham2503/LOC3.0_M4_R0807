import React from "react";
import styles from "./index.module.css";

const Register = () => {
    return (
        <div className={styles.box}>
            <form>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="username"
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                    />
                </div>
                <div className="form-group">
                    <label>age</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="age"
                    />
                </div>
                <div className="form-group">
                    <label>weight</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="weight"
                    />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">
                    Register
                </button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
            </form>
        </div>
    );
};

export default Register;
