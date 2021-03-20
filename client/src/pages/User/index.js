import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { Card, Button, Badge, Col, Row, Container, Form, Table } from 'react-bootstrap'
import axios from 'axios'

const User = () => {

    const [data, setData] = useState(null)
    const [uname, setUname] = useState('')
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await axios.get('/user/6055fd6eb17d53243c8015c1')
            .then(res => {
                setData(res.data)
            }).catch(err => {
                console.log(err)
            })
    }


    console.log(data)

    const handleClick = async () => {
        await axios.post(`/friend/6055fd6eb17d53243c8015c1/${uname}`)
        .then(res => {
            getData()
        }).catch(err => {
            console.log(err)
        })
    }

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
            <Row>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Add Friends</Form.Label>
                            <Form.Control type="text" name="title" placeholder="Enter title" onChange={e => setUname(e.target.value)} />
                        </Form.Group>
                    </Form.Row>
                    
                    <Button variant="primary" onClick={handleClick}>
                        Submit
                    </Button>
                </Form>
            </Row>
            <Row style={{width: '500px'}}>
            {(data.friends !== null) && 
                <Table className={styles.table} responsive striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Friends</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.friends.map((ele, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{ele.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            }
                
            </Row>
        </Container>
    )
}

export default User