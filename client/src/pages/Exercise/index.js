import React, { useState } from 'react'
import styles from './index.module.css'
import { Form, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Autocomplete from 'react-autocomplete'
const Exercise = () => {

    const [search,setSearch] = useState('')
    const [data,setData] = useState([
        { label: 'apple' },
        { label: 'banana' },
        { label: 'pear' }
    ])
    console.log(search)
    console.log(process.env.REACT_APP_API_ID)


    const handleUpdate = async (e,results) => {
        setSearch(e.target.value)


        await axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${search}`,{
            headers: {
                "x-app-id" : process.env.REACT_APP_API_ID,
                "x-app-key" : process.env.REACT_APP_API_KEY,
                "x-remote-user-id" : process.env.REACT_APP_REMOTE_ID
            }
        })
        .then(res => {
            const temp_data = res.data.common.map((val, ind) => {
                return {
                    label: val.food_name
                }
            })
            setData(temp_data)
        }).catch(err => {
            console.log(err)
        })
    } 

    return (
        <div className={styles.container}>
            <h2>Current Score : </h2>
            <Form>
                <Row className={styles.row}>
                    <Col>
                    <Autocomplete
                        className={styles.search}
                        getItemValue={(item) => item.label}
                        items={data}
                        renderItem={(item, isHighlighted) =>
                            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.label}
                            </div>
                        }
                        value={search}
                        onChange={handleUpdate}
                        onSelect={(val) => setSearch(val)}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Exercise;