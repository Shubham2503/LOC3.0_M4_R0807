import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import axios from 'axios'
import Table from 'react-bootstrap/Table'

const Scoreboard = () => {
    const [score, setScore] = useState([])

    useEffect(() => {
        getTransaction()
    }, [])
    console.log(score)

    const getTransaction = async () => {
        await axios.get('/score')
            .then(res => {
                setScore(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div className={styles.container}>
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>UserName</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {score.map((ele, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{ele.username}</td>
                                <td>{ele.score}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Scoreboard