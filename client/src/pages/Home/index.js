import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Card, Button} from 'react-bootstrap'
import styles from './index.module.css'

const Home = () => {
    const [data, setData] = useState([])

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


    return (
        <>
            {data.map((val, ind) => {
                    return(
                        <div className={styles.container}>
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>{val.title}</Card.Title>
                                <Card.Text>{val.description}</Card.Text>
                                <Button variant="primary">VIEW</Button>
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