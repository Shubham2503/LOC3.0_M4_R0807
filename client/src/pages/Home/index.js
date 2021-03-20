import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Card, Button, Badge, Col, Row, Container} from 'react-bootstrap'
import styles from './index.module.css'

const Home = () => {
    const [data, setData] = useState(null)

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
            {data.map((val, ind) => {
                    return(
                        <div className={styles.container}>
                            <Card style={{ width: '18rem' }}>
                            <Card.Img height={180} width={100} variant="top" src={val.images} />
                            <Card.Body>
                                <Card.Title>{val.title}</Card.Title>
                                {(val.tags.length > 0) && (
                                    <>
                                        <Badge pill variant="primary">
                                            {val.tags[0].tag}
                                        </Badge>{' '}
                                        <Badge pill variant="success">
                                            {val.tags[1].tag}
                                        </Badge>
                                        <br/>
                                    </>
                                )}
                                <Card.Text>{val.description}</Card.Text>
                                <Button variant="primary" onClick={(e) => handleClick(val._id)}>{val.likes} Likes</Button>
                                
                            </Card.Body>
                            </Card>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Home