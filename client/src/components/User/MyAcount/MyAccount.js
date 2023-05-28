import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { userAPI } from "../../../Apl";

import "./MyAccount.css";
function MyAccount() {
  const navigate = useNavigate();
  const [UserData, setUserData] = useState({});

  const User = useSelector((state) => state.user.userToken);
  if (!User) {
    navigate("/");
  }
  useEffect(() => {
    Axios.get(`${userAPI}userProfile`, { withCredentials: true })
      .then((response) => {
        setUserData(response.data.user);
        console.log(UserData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    "data:image/png;base64,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"
  );

  const handleImageChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const [isActive, setIsActive] = useState(false);

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("image", file);
    Axios.post(`${userAPI}editProfilePhoto`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.changed) {
          navigate("/myaccount");
        } else {
          navigate("/myaccount");
        }
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
  };

  return (
    <div>
      <div className="profile-card js-profile-card">
        <div className="profile-card__img">
          {UserData && UserData.image ? (
            <img
              className="profileIMage"
              src={`http://localhost:3001/${UserData.image.replace("\\", "/")}`}
              onClick={() => {
                if (isActive) {
                  setIsActive(false);
                } else {
                  setIsActive(true);
                }
              }}
            />
          ) : (
            <img
              className="profileIMage"
              src="https://images.unsplash.com/photo-1608976328267-e673d3ec06ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
              onClick={() => {
                if (isActive) {
                  setIsActive(false);
                } else {
                  setIsActive(true);
                }
              }}
            />
          )}
        </div>
        {isActive && (
          <div
            className="js-profile-card active"
            style={{ marginTop: "-100px" }}
          >
            <form className="profile-card-form">
              <div className="profile-card-form__container">
                <label
                  htmlFor="photo-upload"
                  className="custom-file-upload fas"
                >
                  <div className="img-wrap img-upload">
                    {imagePreviewUrl && <img src={imagePreviewUrl} alt=" " />}
                  </div>
                  <input
                    id="photo-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className="profile-card-form__bottom">
                <button
                  className="profile-card__button button--blue js-message-close"
                  onClick={handleUpdateProfile}
                >
                  Update
                </button>
                <button
                  className="profile-card__button button--gray js-message-close"
                  onClick={() => {
                    setIsActive(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
            <div className="profile-card__overlay js-message-close" />
          </div>
        )}
        <div className="profile-card__cnt js-profile-cnt">
          <div className="profile-card__name">
            {UserData ? UserData.Name : ""}
          </div>
          <div className="profile-card__txt">
            {UserData ? UserData.email : ""}
          </div>
          <div className="profile-card-loc">
            <span className="profile-card-loc__icon">
              <svg className="icon">
                <use xlinkHref="#icon-location" />
              </svg>
            </span>
            <span className="profile-card-loc__txt">
              Joined On :
              {UserData && UserData.createdAt
                ? UserData.createdAt.substring(0, 10)
                : "Active now"}
            </span>
          </div>
          <div className="profile-card-inf">
            <div className="profile-card-inf__item">
              <div className="profile-card-inf__title"></div>
              <div className="profile-card-inf__txt"></div>
            </div>
            <div className="profile-card-inf__item">
              <div className="profile-card-inf__title"></div>
              <div className="profile-card-inf__txt"></div>
            </div>
            <div className="profile-card-inf__item">
              <div className="profile-card-inf__title"></div>
              <div className="profile-card-inf__txt"></div>
            </div>
            <div className="profile-card-inf__item">
              <div className="profile-card-inf__title"></div>
              <div className="profile-card-inf__txt"></div>
            </div>
          </div>
          <div className="profile-card-ctr">
            <button
              className="profile-card__button button--blue js-message-btn"
              onClick={() => {
                setIsActive(true);
              }}
            >
              Edit Profile
            </button>
            <button
              className="profile-card__button button--orange"
              onClick={() => {
                navigate("/");
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
