import React from 'react'
import styles from './index.module.css'
import { Form, Button, Col, Modal, Table } from 'react-bootstrap'


const Register = () => {
    return (
        <div className={styles.box}>
            <h3>Register</h3>
            <Form className="container">
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" name="title" placeholder="User Name" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="pass" placeholder="Password" />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Height</Form.Label>
                        <Form.Control type="number" name="height" placeholder="Height" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Weight</Form.Label>
                        <Form.Control type="number" name="weight" placeholder="Weight" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" name="age" placeholder="Age" />
                    </Form.Group>
                </Form.Row>
            </Form>
            <Button variant="primary">
                Register
            </Button>

        </div>
    );

}

export default Register;