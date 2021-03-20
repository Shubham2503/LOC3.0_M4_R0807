import React from 'react'
import styles from './index.module.css'






const Login = () => {
    return(
        <div className = {styles.box}>
           
           <form method = "POST" action = "/user/login">
                <h3>Log in</h3>
               
                <div className="form-group">
                    <label>Email</label>
                    <input name = "email" type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name ="password" type="password" className="form-control" placeholder="Enter password" />
                </div>
         

               

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                
            </form>
      
        </div>
          );
    
}

export default Login;