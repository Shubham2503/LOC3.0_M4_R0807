import React from 'react'
import styles from './index.module.css'






const Login = () => {
    return(
        <div className = {styles.box}>
           
            <form>

                <h3>Log in</h3>
 
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

               

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                
            </form>
      
        </div>
          );
    
}

export default Login;