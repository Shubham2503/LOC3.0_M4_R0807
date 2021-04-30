import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Form, Button, Col, Modal } from "react-bootstrap";
import axios from "axios";
import Notification from "../../components/Notification";
import Cookies from "js-cookie";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Goal = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [data, setData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(Cookies.get("id"));

  const handleNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 10);
  };

  const handleClick = async () => {
    handleNotification();
    await axios
      .post(`/goals/${Cookies.get("id")}`, {
        title,
        description: desc,
        time,
      })
      .then((res) => {
        getData();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`/goals/${Cookies.get("id")}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(data);
  const classes = useStyles();

  return (
    <>
      <div className={styles.container}>
        <Notification
          title={"Added Goal"}
          msg={"Good to see that new goals are added"}
          visible={showNotification}
        />
        <h2>Your Goals</h2>
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ marginBottom: "1rem" }}
        >
          Add Goal
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Goal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="container">
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Add Description"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClick}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        {data !== null && (
          <>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Title</StyledTableCell>

                    <StyledTableCell align="right">Description</StyledTableCell>
                    <StyledTableCell align="right">Time</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        {row.title}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.description}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.time}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    </>
  );
};

export default Goal;
