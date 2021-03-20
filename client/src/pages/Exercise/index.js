import React, { useState } from 'react'
import styles from './index.module.css'
import { Form, Row, Col } from 'react-bootstrap'
import axios from 'axios'


const Exercise = () => {
    const [search,setSearch] = useState('')
    const [data,setData] = useState([])
    console.log(search)

    const handleUpdate = async (e) => {
        setSearch(e.target.value)
        const url = 'https://trackapi.nutritionix.com/v2/search/instant?' + search
        await axios.post(url,)
        .then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    } 

    return (
        <div className={styles.container}>
            <h2>Current Score : </h2>
            <Form>
                <Row>
                    <Col>
                        <Form.Control placeholder="Enter FOOD" onChange={handleUpdate}/>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Exercise;