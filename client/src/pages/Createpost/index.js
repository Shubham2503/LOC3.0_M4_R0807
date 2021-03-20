import React, { useState } from 'react'
import styles from './index.module.css'
import { Form, Button, Col } from 'react-bootstrap'
import axios from 'axios'


const Createpost = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [url, setUrl] = useState('')
    const [tag1, setTag1] = useState('')
    const [tag2, setTag2] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);

    const handleClick = async () => {

        await axios.post('/post/create', {
            title,
            description: desc,
            images: url,
            tags: [
                {"tag" : tag1},
                {"tag" : tag2}
            ]
        })
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
                        <Form.Control type="text" name="title" placeholder="Enter email" onChange={e => setTitle(e.target.value)}/>
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Add Description" onChange={e => setDesc(e.target.value)}/>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Tag 1</Form.Label>
                        <Form.Control type="text" name="tag1" placeholder="Tag 1" onChange={e => setTag1(e.target.value)}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Tag 2</Form.Label>
                        <Form.Control type="text" name="tag2" placeholder="Tag 2" onChange={e => setTag2(e.target.value)}/>
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control  placeholder="Image URL" onChange={e => setUrl(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleClick}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Createpost