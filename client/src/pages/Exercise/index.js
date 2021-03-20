import React, { useState } from 'react'
import styles from './index.module.css'
import { Form, Row, Col ,Button} from 'react-bootstrap'
import axios from 'axios'
import Autocomplete from 'react-autocomplete'
const Exercise = () => {
    const [meal,setMeal] = useState("")
    const [ex,setEx] = useState("")
    const [disp,setDisp] = useState("")
    const  [formdata, setFormdata] = useState("")

    const fetchMeal = async () => {

        await axios.post(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
            headers: {
                "x-app-id": process.env.REACT_APP_API_ID,
                "x-app-key": process.env.REACT_APP_API_KEY,
                "x-remote-user-id": process.env.REACT_APP_REMOTE_ID
            }
        })
            .then(res => {
                const temp_data = res.data.common.map((val, ind) => {
                   console.log(temp_data)
                })
                setData(temp_data)
            }).catch(err => {
                console.log(err)
            })

    }
    const submit = (e) => {
        console.log("worked")
        fetchMeal();
            
    }
    const ipHandler1 = (e) => {
        setMeal(e.target.value)
    }
    const ipHandler2 = (e) => {
        setEx(e.target.value)
    }
    const [search, setSearch] = useState('')
    const [data, setData] = useState([
        { label: 'apple' },
        { label: 'banana' },
        { label: 'pear' }
    ])
    console.log(search)
   // console.log(process.env.REACT_APP_API_ID)


    const handleUpdate = async (e, results) => {
        setSearch(e.target.value)


        await axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${search}`, {
            headers: {
                "x-app-id": process.env.REACT_APP_API_ID,
                "x-app-key": process.env.REACT_APP_API_KEY,
                "x-remote-user-id": process.env.REACT_APP_REMOTE_ID
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
            <Form >
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    {/* <Form.Label column sm={2}>
                    Food
                    </Form.Label>
                    <Col sm={10}>
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
                    </Col> */}

                    <Form.Label column sm={2}>
                        Exercise
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="textarea" placeholder="1000 steps" />
                    </Col>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>So What do you had for your Meal ?? </Form.Label>
                    <Form.Control onChange = {ipHandler1} as="textarea" rows={3} onClick = {submit} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea2">
                    <Form.Label>Tell Me About Your workout session??</Form.Label>
                    <Form.Control onChange = {ipHandler2} as="textarea" rows={3} />
                </Form.Group>
                <Button onClick = {submit}  variant="primary">Submit</Button>{' '}
            </Form>
            
        </div>
    )
}

export default Exercise;