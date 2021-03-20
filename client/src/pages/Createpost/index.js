import React, { useState } from 'react'
import styles from './index.module.css'
import { Form, Button, Col, Row } from 'react-bootstrap'
import axios from 'axios'


const Createpost = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [url, setUrl] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);

    const handleClick = async () => {
        
        await axios.get('/post/create')
        .then(res => {
            
        }).catch(err => {
            console.log(err)
        })
    }
    
    return (
        <div className={styles.container}>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="email" name="title" placeholder="Enter email" onChange={e => setTitle(e.target.value)}/>
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Add Description" onChange={e => setDesc(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control  placeholder="Image URL" onChange={e => setUrl(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.File
                    className="position-relative"
                    name="file"
                    label="File"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleClick}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Createpost