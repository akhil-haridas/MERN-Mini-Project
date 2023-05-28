import React,{useState,useEffect} from 'react'
import {  useNavigate } from "react-router-dom";        
import { AdminAPI } from '../../../Apl';
import Axios from 'axios'
import { useDispatch} from "react-redux"
import { AdminActions } from '../../../store/AdminAthu';
import './AdminLogin.css'

const Adminlogin = () => {
   const navigate= useNavigate()
   const dispatch= useDispatch()
    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);
  const [Errmessage, setErrmessage] = useState('')
  

const emailChangeHandler = (event) => {
  setEnteredEmail(event.target.value);
  setEmailIsValid(
    validateEmail(event.target.value) || event.target.value.trim() === ""
  );
  setFormIsValid(
    validateEmail(event.target.value) && enteredPassword.trim() !== ""
  );
};

const passwordChangeHandler = (event) => {
  setEnteredPassword(event.target.value);
  setPasswordIsValid(event.target.value.trim() !== "");
  setFormIsValid(
    validateEmail(enteredEmail) && event.target.value.trim() !== ""
  );
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};


    const submitHandler = (event) => {
        event.preventDefault();
         Axios.post(`${AdminAPI}login`, { enteredEmail ,enteredPassword},{withCredentials:true}).then((response) => {
            const result = response.data.userSignUpp   
            if (result.Status) {
                dispatch(AdminActions.AddAdmin({token:result.token}))
                navigate('/admin')
            } else {
                setErrmessage(result.message)
            }
        })
       
     };


  return (
    <div>
      <div className="ocean">
        <div className="wave" />
        <div className="wave" />
      </div>

      <section style={{marginTop:'60px',display:'flex',justifyContent:'center'}}>
        <div className={"container4"} id="container">
          <div className="form-container sign-in-container">
            <form onSubmit={submitHandler}>
              {Errmessage && <div style={{ color: "red" }}>{Errmessage}</div>}
              <label>
                <input
                  type="email"
                  placeholder="Email"
                  value={enteredEmail}
                  required
                  onChange={emailChangeHandler}
                />
                {!emailIsValid && (
                  <p style={{ color: "red" }}>
                    Please enter a valid email address.
                  </p>
                )}
              </label>
              <label>
                <input
                  type="password"
                  placeholder="Password"
                  value={enteredPassword}
                  required
                  onChange={passwordChangeHandler}
                />
                {!passwordIsValid && (
                  <p style={{ color: "red" }}>Please enter a password.</p>
                )}
              </label>
              <button
                type="submit"
                style={{ marginTop: "10px" ,borderRadius:'26px' }}
                disabled={!formIsValid}
              >
                Sign In
              </button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                <h1 style={{color:'#fff',fontSize:'29px'}}>Welcome. . . A D M I N</h1>
                <p>Sign in with your E-Mail Address. . . </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Adminlogin
