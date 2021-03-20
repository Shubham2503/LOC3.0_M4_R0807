import React, { useState } from 'react'
import styles from './index.module.css'
import { Form, Row, Col } from 'react-bootstrap'

const Exercise = () => {
    const [search,setSearch] = useState('');
    console.log(search)
    return (
        <div className={styles.container}>
            <h2>Current Score : </h2>
            <Form>
                <Row>
                    <Col>
                        <Form.Control placeholder="Enter FOOD" onChange={(e) => {setSearch(e.target.value)}}/>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Exercise;