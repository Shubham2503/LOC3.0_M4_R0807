import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Scoreboard from "./pages/Scoreboard";
import Exercise from "./pages/Exercise";
import Createpost from "./pages/Createpost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post_tag from "./pages/Post_tag";
import Goal from "./pages/Goal";
import User from "./pages/User";
import Notification from "./components/Notification";
import Navbar from "./components/Navbar";
import Navbar1 from "./components/Navbar1";
import Cookies from "js-cookie";
import StickyFooter from './components/Footer'

const App = () => {
    const [isLogedin, setIsLogedin] = useState(false);
    const is_loaded = (data) => {
        setIsLogedin(data);
    };

    useEffect(() => {
        if (Cookies.get("id")) setIsLogedin(true);
    }, []);

    if (!isLogedin)
        return (
            <div className={styles.container}>
                <Router>
                    <Navbar1 />
                    <Switch>
                        <Route path="login">
                            <Login is_loaded={is_loaded} />
                        </Route>
                        <Route path="/register">
                            <Register is_loaded={is_loaded} />
                        </Route>

                        <Route path="/">
                            <Login is_loaded={is_loaded} />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    else
        return (
            <div className={styles.container}>
                <Notification visible={false} />
                <Router>
                    <Navbar is_loaded={is_loaded} />
                    <Switch>
                        <Route path="/scoreboard">
                            <Scoreboard />
                        </Route>
                        <Route path="/exercise">
                            <Exercise />
                        </Route>
                        <Route path="/createpost">
                            <Createpost />
                        </Route>
                        <Route path="/goal">
                            <Goal />
                        </Route>
                        <Route path="/user">
                            <User />
                        </Route>
                        <Route path="/post/:postid" component={Post_tag} />
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                    <StickyFooter />
                </Router>
            </div>
        );
};

export default App;
