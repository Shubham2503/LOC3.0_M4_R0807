import React, {useState} from 'react'
import styles from './App.module.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from './pages/Home'
import Scoreboard from './pages/Scoreboard'
import Exercise from './pages/Exercise'
import Createpost from './pages/Createpost'
import Login from './pages/Login'
import Register from './pages/Register'
import Post_tag from './pages/Post_tag'
import Navbar from './components/Navbar'
import Navbar1 from './components/Navbar1'

const App = () => {

    const [isLogedin, setIsLogedin] = useState(true)
    
    if(!isLogedin)
        return (
            <div className={styles.container}>
            <Router>
                <Navbar1 />
                <Switch>
                    <Route path="login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </div>
        )
        
        else
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
