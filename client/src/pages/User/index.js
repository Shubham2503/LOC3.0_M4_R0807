import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import {Card, Button, Badge, Col, Row, Container} from 'react-bootstrap'
import axios from 'axios'

const User = () => {

    const [data, setData] = useState(null)

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        await axios.get('/user/6055fd6eb17d53243c8015c1')
        .then(res => {
            setData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    console.log(data)

    if (data === null)
        return null



    return (
        <Container className={styles.container}>
            <Row>
                <h2>User Details</h2>
            </Row>
            <Row>
                <p>User Name : {data.username}</p>
            </Row>
            <Row className={styles.row}>
                <Col className={styles.col}>
                    <p>Height : {data.height}</p>
                    <p>Weight : {data.weight}</p>
                </Col>
                <Col className={styles.col}>
                    <p>Age : {data.age}</p>
                    <p>Gender : {data.gender}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default User