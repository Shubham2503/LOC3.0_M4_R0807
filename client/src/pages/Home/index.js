import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Card, Button, Badge, Col, Row, Container} from 'react-bootstrap'
import styles from './index.module.css'
import { Link } from "react-router-dom"

const Home = () => {
    const [data, setData] = useState(null)
    const [count, setCount] = useState(0)

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        await axios.get('/post/getAllPost')
        .then(res => {
            setData(res.data)
        }).catch(err => {
            console.log(err)
        })
        setCount(count+1)
    }

    console.log(data)
    const handleClick = async (id) => {
        await axios.post('/post/increaselike/'+ id)
        .then(res => {
            getData()
        }).catch(err => {
            console.log(err)
        })
    }
    if(data === null)
    return null
    return (
        <>
        <Container md={3} className={styles.container}>
            <Row>
            {data.map((val, ind) => {
                    return(
                        <Col>
                            <Card style={{ minWidth: '20rem', maxWidth: '100%', marginBottom: 10 }}>
                            <Card.Img height={220} width={100} variant="top" src={val.images} />
                            <Card.Body>
                                <Card.Title>{val.title}</Card.Title>
                                {(val.tags.length > 0) && (
                                    <>
                                        <Badge pill variant="primary">
                                            <Link className={styles.navLink} to={"/post/" + val.tags[0].tag}>{val.tags[0].tag}</Link>
                                        </Badge>{' '}
                                        <Badge pill variant="success">
                                            <Link className={styles.navLink} to={"/post/" + val.tags[1].tag}>{val.tags[1].tag}</Link>
                                        </Badge>
                                        <br/>
                                    </>
                                )}
                                <Card.Text>{val.description}</Card.Text>
                                <Button variant="primary" onClick={(e) => handleClick(val._id)}>{val.likes} Likes</Button>
                                
                            </Card.Body>
                            </Card>
                        </Col>
                    )
                })
            }
            </Row>                 
            </Container>
        </>
    )
}

export default Home