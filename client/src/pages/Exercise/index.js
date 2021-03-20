import React, { useState } from 'react'
import styles from './index.module.css'
import { Form, Row, Col, Button, Toast } from 'react-bootstrap'
import axios from 'axios'

const Exercise = () => {
    const [meal, setMeal] = useState("")
    const [ex, setEx] = useState("")
    const [disp, setDisp] = useState("")
    const [calGained, setCalG] = useState(null)
    const [calLost, setCalL] = useState(null)
    
    const [score,setScore] = useState(0)


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
        params.append('query', 'squats')
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
        setScore((+calLost/+calGained).toFixed(2))

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
                const temp_data = null;
                setData(temp_data)
            }).catch(err => {
                console.log(err)
            })
    }

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
                    <Form.Label  >So What do you had for your Meal ?? </Form.Label>
                    <Row>
                        <Col><Form.Control onChange={ipHandler1} as="textarea" rows={3} /></Col>

                    </Row>
                    <Row>

                        <Col>
                            <h4>Calories Gained</h4>
                            {calGained ? calGained : 0}

                        </Col>
                    </Row>

                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea2">
                    <Form.Label>Tell Me About Your workout session??</Form.Label>
                    <Row>
                        <Col><Form.Control onChange={ipHandler2} as="textarea" rows={3} /></Col>

                    </Row>
                    <Row>

                        <Col>
                            <h4>Calories Burned</h4>
                            {calLost ? calLost : 0}

                        </Col>
                    </Row>

                </Form.Group>
                <Button onClick={calculate} variant="primary">Calculate</Button>{' '}
                <Button onClick={submit} variant="success">Submit</Button>{' '}

            </Form>
            <div className = {styles.toast}>
            <Toast >
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">Total Calories Burned !!</strong>
                    
                </Toast.Header>
                <Toast.Body>You haved burned {calLost ? calLost : 0} Calories</Toast.Body>
            </Toast>
            </div>
           


        </div>
    )
}

export default Exercise;