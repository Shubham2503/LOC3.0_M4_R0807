import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import { Form, Button, Col, Modal } from 'react-bootstrap'
import axios from 'axios'


const Goal = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [time, setTime] = useState('')
    const [data, setData] = useState(null)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = () => {
        // await axios.post('/post/create', {
        //     title,
        //     description: desc,
        //     time
        // })
        // .then(res => {

        // }).catch(err => {
        //     console.log(err)
        // })
    }
    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        await axios.get('/goal/6055fd6eb17d53243c8015c1')
        .then(res => {
            setData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    console.log(data)

    return (
        <div className={styles.container}>
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
                                <Form.Control type="text" name="title" placeholder="Enter email" onChange={e => setTitle(e.target.value)} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Add Description" onChange={e => setDesc(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="time" onChange={e => setTime(e.target.value)} />
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
        </div>
    )
}

export default Goal