import React from 'react'
import styles from './App.module.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from './pages/Home'
import Scoreboard from './pages/Scoreboard'
import Navbar from './components/Navbar'

const App = () => {
    return (
        <div className={styles.container}>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/scoreboard">
                        <Scoreboard />
                    </Route>
                    {/* <Route path="/user/:uid" component={User}/> */}
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
