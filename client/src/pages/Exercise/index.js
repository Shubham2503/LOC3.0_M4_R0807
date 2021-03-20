import React, { useState } from 'react'
import styles from './index.module.css'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import Chart from '../../components/Chart'

const Exercise = () => {
    const [meal, setMeal] = useState("")
    const [ex, setEx] = useState("")
    const [disp, setDisp] = useState("")
    const [calGained, setCalG] = useState(null)
    const [calLost, setCalL] = useState(null)
    const [score, setScore] = useState(0)

    const fetchMeal = async () => {

        const params = new URLSearchParams()
        params.append('query', meal)
        await axios.post(`https://trackapi.nutritionix.com/v2/natural/nutrients`, params, {
            headers: {
                "x-app-id": process.env.REACT_APP_API_ID,
                "x-app-key": process.env.REACT_APP_API_KEY,
                "x-remote-user-id": process.env.REACT_APP_REMOTE_ID,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => {
                const temp_data = res.data.foods.map((val, ind) => {
                    return val.nf_calories
                }).reduce((el, ac) => (el + ac))
                //  console.log(temp_data)
                setCalG(temp_data)

            }).catch(err => {
                console.log(err)
            })

    }
    const fetchEx = async () => {
        const params = new URLSearchParams()
        params.append('query', ex)
        await axios.post(`https://trackapi.nutritionix.com/v2/natural/exercise`, params, {
            headers: {
                "x-app-id": process.env.REACT_APP_API_ID,
                "x-app-key": process.env.REACT_APP_API_KEY,
                "x-remote-user-id": process.env.REACT_APP_REMOTE_ID,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => {
                const temp_data = res.data.exercises.map((val, ind) => {
                    return val.nf_calories
                }).reduce((el, ac) => (el + ac))
                //  console.log(temp_data)
                setCalL(temp_data)
            }).catch(err => {
                console.log(err)
            })
    }


    const calculate = async (e) => {
        //console.log("worked")
        await fetchMeal();
        await fetchEx();
        setScore((+calLost / +calGained).toFixed(2))

    }
    const submit = () => {
        console.log("submitted")
        // submitting to rest api by getting user's id
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




    return (
        <div className={styles.container}>
            <h2>Current Score :  {score}</h2>
            <Form className="container" >

                {/* <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
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
                    </Col> 

                    <Form.Label column sm={2}>
                        Exercise
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="textarea" placeholder="1000 steps" />
                    </Col> 
             </Form.Group>  */}

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Row>
                        <Col>
                            <Form.Label  >So What do you had for your Meal ?? </Form.Label>
                            <Row>
                                <Col><Form.Control onChange={ipHandler1} as="textarea" rows={3} placeholder="eg 10 bananas"/></Col>
                            </Row>
                        </Col>
                        <Col>
                            <Form.Label>Tell Me About Your workout session??</Form.Label>
                            <Row>
                                <Col><Form.Control onChange={ipHandler2} as="textarea" rows={3} placeholder="eg 10000 steps"/></Col>
                            </Row>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea3">
                    <Row>
                        <Col>
                            <h4>Calories Gained</h4>
                            {calGained ? calGained : 0}

                        </Col>
                        <Col>
                            <h4>Calories Burned</h4>
                            {calLost ? calLost : 0}
                        </Col>
                    </Row>
                </Form.Group>

                <Button onClick={calculate} variant="primary">Calculate</Button>{' '}
                <Button onClick={submit} variant="success">Submit</Button>{' '}

            </Form>
            
            {(score !== 0) && 
                <Chart gain={calGained} loss={calLost} />
            }


        </div>
    )
}

export default Exercise;