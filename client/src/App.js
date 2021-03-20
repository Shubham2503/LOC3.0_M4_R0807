import React, {useState} from 'react'
import styles from './App.module.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from './pages/Home'
import Scoreboard from './pages/Scoreboard'
import Exercise from './pages/Exercise'
import Createpost from './pages/Createpost'
import Login from './pages/Login'
import Post_tag from './pages/Post_tag'
import Navbar from './components/Navbar'

const App = () => {

    const [isLogedin, setIsLogedin] = useState(false)
    if(!isLogedin)
        return (
            <Login />
        )

    return (

        <div className={styles.container}>
            <Router>
                <Navbar />
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
                    <Route path="/post/:postid" component={Post_tag}/>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
