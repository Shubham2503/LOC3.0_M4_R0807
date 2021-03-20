import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import axios from 'axios'
import Table from 'react-bootstrap/Table'

const Scoreboard = () => {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        getTransaction()
    }, [])


    const getTransaction = async () => {
        await axios.get('/score')
            .then(res => {
                setTransactions(res.data)
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
                    {transactions.map((ele, index) => {
                        return (
                            <tr>
                                <td key={index}>{index+1}</td>
                                <td key={index}>{ele.username}</td>
                                <td key={index}>{ele.score}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Scoreboard