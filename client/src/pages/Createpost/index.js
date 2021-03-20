import React from 'react'
import styles from './index.module.css'
import { Form, Button, Col, Row } from 'react-bootstrap'


const Createpost = () => {
    return (
        <div className={styles.container}>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Add Description" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control  placeholder="Image URL" />
                </Form.Group>

                <Form.Group>
                    <Form.File
                    className="position-relative"
                    name="file"
                    label="File"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Createpost