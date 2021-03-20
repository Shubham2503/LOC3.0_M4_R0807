import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import axios from 'axios'



const User = () => {

    const [data, setData] = useState("")
    const fetchData = async () => {
        axios.get('/user/6055fd6eb17d53243c8015c1')
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
    useEffect(() => {
        fetchData()

    },[])

   

    return (
        <div className={styles.container}>
            User
        </div>
    )
}

export default User