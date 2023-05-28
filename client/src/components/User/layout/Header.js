import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { UserActions } from "../../../store/UserAthu";
import { userAPI } from "../../../Apl";
import "./Header.css";
import  Axios  from "axios";
function Header() {
  const dispatch = useDispatch();
  const [UserData, setUserData] = useState({});
  const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);

  const navigate = useNavigate();
  const User = useSelector((state) => state.user.userToken);
  const UserLogout = () => {
    removeCookie("jwt");
    dispatch(UserActions.userLogout());
    navigate("/");
  };

     useEffect(() => {
       Axios.get(`${userAPI}userProfile`, { withCredentials: true })
         .then((response) => {
           setUserData(response.data.user);
         })
         .catch((error) => {
           console.log(error);
         });
     }, []);
  
  return (
    <header>
      <div
        className="container2"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {User ? (
          <a className="logo2">
            Welcome&ensp;,{" "}
            <span style={{ fontSize: "40px" }}>&ensp;{UserData.Name}!</span>
          </a>
        ) : (
          <a
            onClick={() => {
              navigate("/");
            }}
            className="logo2"
          >
            Welcome&ensp;.&ensp;.&ensp;.
          </a>
        )}
        <div className="lrbuttons2">
          {User ? (
            <a onClick={UserLogout} className="login_btn2 active2">
              Logout
            </a>
          ) : (
            <a
              onClick={() => {
                navigate("/login");
              }}
              className="login_btn2"
            >
              Login
            </a>
          )}
          {User ? (
            <a
              onClick={() => {
                navigate("/myAccount");
              }}
              className="register_btn2"
            >
              My Account
            </a>
          ) : (
            <a
              onClick={() => {
                navigate("/signup");
              }}
              className="register_btn2"
            >
              Signup
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
