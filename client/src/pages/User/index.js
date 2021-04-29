import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import {
    Card,
    Button,
    Badge,
    Col,
    Row,
    Container,
    Form,
    Table,
} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { Typography, Avatar, TextField, Divider } from '@material-ui/core'
import StickyFooter from "../../components/Footer";

const User = () => {
    const [data, setData] = useState(null);
    const [uname, setUname] = useState("");
    useEffect(() => {
        getData();
    }, []);
    console.log(Cookies.get("id"));
    const getData = async () => {
        await axios
            .get(`/user/${Cookies.get("id")}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    console.log(data);
    const handleClick = async () => {
        await axios
            .post(`/friend/${Cookies.get("id")}/${uname}`)
            .then((res) => {
                getData();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    if (data === null) return null;
    return (
        <>
            <Container className={styles.container}>
                <Avatar style={{height: '150px', width: '150px'}} alt="Remy Sharp" src="https://swarmandsting.com/wp-content/uploads/getty-images/2017/07/1201019072.jpeg" />
                <Typography variant="h4" component="h4">
                    {data.username}
                </Typography>
                <Typography variant="h6" component="h6">
                    User Details
                </Typography>
                <Row className={styles.row}>
                    <Col className={styles.col}>
                        <p>Height : {data.height}</p>
                        <p>Weight : {data.weight}</p>
                    </Col>
                    <Col className={styles.col}>
                        <p>Age : {data.age}</p>
                        <p>Gender : {data.gender}</p>
                    </Col>
                </Row>
                <hr style={{ width:'100%' }}/>
                <Typography variant="h6" component="h6">
                    Add friends
                </Typography>
                <TextField className={styles.searchBox} id="outlined-basic" label="Enter UserId" variant="outlined" onChange={(e) => setUname(e.target.value)}/>
                <Button variant="primary" onClick={handleClick}>
                    Submit
                </Button>
                <hr style={{ width:'100%' }}/>
            </Container>
            {/* <Container className={styles.container}>
                <Row>
                    <h2>User Details</h2>
                </Row>
                <Row>
                    <p>User Name : {data.username}</p>
                </Row>
                <Row className={styles.row}>
                    <Col className={styles.col}>
                        <p>Height : {data.height}</p>
                        <p>Weight : {data.weight}</p>
                    </Col>
                    <Col className={styles.col}>
                        <p>Age : {data.age}</p>
                        <p>Gender : {data.gender}</p>
                    </Col>
                </Row>
                <Row>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Add Friends</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="Enter userid"
                                    onChange={(e) => setUname(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" onClick={handleClick}>
                            Submit
                        </Button>
                    </Form>
                </Row>
                <Row style={{ width: "500px" }}>
                    {data.friends !== null && (
                        <Table
                            className={styles.table}
                            responsive
                            striped
                            bordered
                            hover
                            variant="dark"
                        >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Friends</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.friends.map((ele, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{ele.username}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    )}
                </Row>
            </Container> */}
            <StickyFooter />
        </>
    );
};

export default User;
