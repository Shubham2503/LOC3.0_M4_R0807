import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from "react-router-dom"
import styles from './index.module.css'


const Navbr = () => {
    return (
        <div className={styles.container}>
            <Navbar collapseOnSelect expand="md">
                <Navbar.Brand><Link className={styles.navBrand} style={{ textDecoration: "none"}} to="/"> <h1 className={styles.head1} >Home</h1></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className={styles.rNavbar}>
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Nav.Item>
                            <Link className={styles.navLink} to="/scoreboard">Scoreboard</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className={styles.navLink}to="/exercise" >Exercise</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <hr/>
        </div>
    )
}

export default Navbr