import React, { useState, useEffect } from 'react';
import { useNavigate ,useLocation} from "react-router-dom";       
import Axios from 'axios'
import { userAPI } from '../../../Apl';
import { useDispatch} from "react-redux"
import { UserActions } from '../../../store/UserAthu';

const Login = (props) => {
 const dispatch= useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
const [formIsValid, setFormIsValid] = useState(false);
const [emailIsValid, setEmailIsValid] = useState(true);
const [passwordIsValid, setPasswordIsValid] = useState(true);
const [errmessage, setErrmessage] = useState("");
  const [enteredname, setEnteredname] = useState("");
  

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

  const nameChangeHandler = (event) => {
    setEnteredname(event.target.value);
  };

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};


  const submitHandler = (event) => {
    event.preventDefault();

      if (formIsValid) {
        // submit the form
            Axios.post(`${userAPI}login`, { enteredEmail ,enteredPassword},{withCredentials:true}).then((response) => {
        const result = response.data.userSignUpp          
        if (result.Status) {
          dispatch(UserActions.userAddDetails({name:result.name, token:result.token}))
            navigate('/')
        } else {
          setErrmessage(result.message)
         
        }
    })
      }
  }
  
      const submitHandlerSignup = (event) => {
        event.preventDefault();
        Axios.post(`${userAPI}register`, {
          enteredEmail,
          enteredPassword,
          enteredname,
        }).then((response) => {
          const result = response.data.userSignUpp;
          if (result.Status) {
            navigate("/login");
          } else {
            setErrmessage(result.message);
          }
        });
      };

    useEffect(() => {
      setIsRightPanelActive(location.pathname === "/signup");
      
    }, [location]);
  
    const handleSignUpClick = () => {
      navigate('/signup')
    
    };

    const handleSignInClick = () => {
      navigate('/login')
      setIsRightPanelActive(false)
   
    };
  return (
    <div>
      <div className="ocean">
        <div className="wave" />
        <div className="wave" />
      </div>

      <section>
        <div
          className={
            isRightPanelActive ? "container right-panel-active" : "container"
          }
          id="container"
        >
          <div className="form-container sign-up-container">
            <form onSubmit={submitHandlerSignup}>
              <h1 style={{ marginTop: "-22px" }}>Sign Up</h1>
              {errmessage && <div style={{ color: "red" }}>{errmessage}</div>}
              <span style={{ marginTop: "20px" }}>
                Use your Email for registration
              </span>
              <label>
                <input
                  type="text"
                  placeholder="Name"
                  value={enteredname}
                  required
                  onChange={nameChangeHandler}
                />
              </label>
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
              <button type="submit" style={{ marginTop: 10 }} disabled={!formIsValid}>
                Sign Up
              </button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form onSubmit={submitHandler}>
              <h1 style={{ marginTop: "-22px" }}>Sign in</h1>
              {errmessage && <div style={{ color: "red" }}>{errmessage}</div>}
              <span style={{ marginTop: "20px" }}>
                Sign in using E-Mail Address
              </span>
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
                style={{ marginTop: "10px" }}
                disabled={!formIsValid}
              >
                Sign In
              </button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Log in</h1>
                <p>Sign in here if you already have an account </p>
                <button
                  className="ghost mt-5"
                  id="signIn"
                  style={{ marginTop: "10px" }}
                  onClick={handleSignInClick}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Create, Account!</h1>
                <p>Sign up if you still don't have an account ... </p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
