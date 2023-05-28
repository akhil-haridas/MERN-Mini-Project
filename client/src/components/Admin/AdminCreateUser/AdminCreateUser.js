import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { AdminAPI } from "../../../Apl";
import classes from "./AdminCreateUser.css";

function Createuser() {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [enteredname, setEnteredname] = useState("");
  const [nameIsValid, setnameIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [Errmessage, setErrmessage] = useState("");

  useEffect(() => {
    setEmailIsValid(enteredEmail.includes("@"));
  }, [enteredEmail]);
  useEffect(() => {
    setPasswordIsValid(enteredPassword.trim().length > 5);
  }, [enteredPassword]);
  useEffect(() => {
    setnameIsValid(enteredname.trim().length > 0);
  }, [enteredname]);
  useEffect(() => {
    setFormIsValid(emailIsValid && passwordIsValid && nameIsValid);
  }, [emailIsValid, passwordIsValid, nameIsValid]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const nameChangeHandler = (event) => {
    setEnteredname(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    Axios.post(`${AdminAPI}createUser`, {
      enteredEmail,
      enteredPassword,
      enteredname,
    }).then((response) => {
      const result = response.data.userSignUpp;
      if (result.Status) {
        navigate("/admin");
      } else {
        setErrmessage(result.message);
      }
    });
  };

  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8Zk+kuzHEAjugAi+gny25h1o/c7PuhyfMAjegWj+86yIvP5fkAiudEoew9n+unz/X2+/7r9f3n8vzU6PrB3viFvvFus+9/u/Hh7/yPw/JfrO6lzvW21/at0/YsmeoAhObT89++7M8NyWWl5rumyfpNz41u2Zji9+pQp+13t/AZleliru7G4PjB5ellzqytzUUVAAAF6ElEQVR4nO2ca3+aMBSHpcHVdKUIircqtLVbZ2237//tBl6oclFOcmKkv//zam9c83DCSXKS0OkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoDIZR3O/15v3FcGC7LeyEi4kvM0RG9o9kHE9tt4qN21mSqjkFhHCTyafttjEQzBOvZJdbSjm5td1CPcKJqNXbSbqPQ9utVCeYuWf8NnirtjrG5+KX4z6GthurwOBBNvTL+qqc224vmT7BL0OuAttNpjF2aYJpGJ17240mEPhN38BDvL7tdjcmXKsIpglnZrvlDRko6W0UR7bb3ohQWTDNN21QDNYahq3oqA9q72CuuLAtcI53PcE0o175VDwmj4Ml1lc99IfEmUwVYmzb4hQrfcH0VYxsa9QTM4Qww7ZHLYFultkhJrZN9kzjySpJEn81ijfruxGToSOvokgVztbevr4kpOfHnUA/j+4QH7bt0g45LlbPpMOSZrZ41oPYL1cHWbE9YgQrppxZj7RauBkoLv8oiJ5Fwal5v5TEnmBwCT+ruUapBEPHXjedXEbQcR4sCd6zjernEJYWUYlSa7NtQ+oAI+2UT5UWDyKJwk4YJbT+LezU+VVCKFa7H69IinamNSpvofDzn9PSsH+iIcZQKDOJw5xIqsMJG4YKgseRoERRWkimt/QNpeKoRoiitHAkJabGUJTfpeZRvPxCPyKvmUoRzGgcRXnh0vAiIQ+FlYLNFeVFzy/c+/ShvqKLbmnYUeVnGF4q2QTvHtmvLoIZDaOYnRFbj+cXSDhDlTV9bQQzCIOGEF4yMyw5VwjgqQhm0LbgDJ+bGikJnptyUdfRnrkzRROl1cT55St1I1V4hhb9IyXBJpNmcjXEzJminoF3cA95O1wI/jmAUs2ioaDKjj/7ul+pcFjsop9faXBYOBJML9u5zIeKP1TGwUIE75++utbtUyEG9Ch6rMPGQm9FvxWU7oGhW+xmCsVXzlGDI4Kuc2TouNpRZCxu9LRX9GkEnYJhKVnQBw22g2EKm/IVESwZ6kfR5XoV5/T1YEUEy4b6UeTaliIfwCtFcPuISoYlRWoUZcwieE8OYeHR7mcLZcNSR6XWmdcshuTSaKHokD+hCsNiFIfUU+8sQSR30uOX8Gu+V2VYjKJP/Fscb+KQOtofn2M66OOVhoUoUjclOdIpeTAU74eCB8+n2vA4itRXguNY2Jg8Gh70nKMsVWN4FEXylhZDrqEf1pb5tP94zVVneBDFT3Le1j/HoHTKcDcnLowztYZ5FEP64xTal08GSsWL7BB6MCvkqHpDx51ldYmFygxfe/uUPt5nSMdPSjfyThg6QiS+o/SntMcL+ptRyylDdbS3T6NrN9Q+2Xf1hq5uMr36XqpddaPOhU9gyFD3xoLSaFGNIUPdsiLXvQLnanupwqytDkOG2tM2+sy7DkPjoXbZdH7lhvoXh/gaszF8fnnmNXzUNuR7EVPDl5vlcnnzwmgoGC7Tsp12dqevy5uM5euUr2MwbLORCzW1jfm7FUwV//L1Un1B1fPOZe7+dXeG3X93TP/nUVFIGa7bknc/c8OfXIbaM5otTLnGhCHTzgVTEA0YMm1ccL2JBgzZ7kTxpFN+Q8a73iz3etkN89sNHHD0U3ZD1vPfIUMQuQ093k+DMFzkYjaU3Hf1I5WDbQYNBcOioqioG0VWQ9Yss0e3o3IaGhHsdKbEa3XmDF1j19non5czYugavBocNf7GozlDmZi9QzNT/kwEj6GQxu92hzOpttbgMBTe6CJfkVisKj4HbNxQCNfvX+wqYhC9J/sPOjfl6cDwifTLzUejnY/+pe8hBtOoP+8159fv3PD3L8LvUvrxsBXfpv2RG/6w3RRDwLD9wLD9wLD9wLD9wLD9wLD9wLD9wLD9wLD9wLD9wLD9wLD9wLD9wLD9wLD9fH/Dt9zwzXZTDPGa30Z4td0UU+SGthtijOdl1k+7y2fbDTHHn7fusvv2x3YzzPLN9QAAAAAAAAAAAAAA+L78B+oHanja2ZXXAAAAAElFTkSuQmCC"
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

  return (
    <div className="createUser">
      <div className="js-profile-card active" style={{ marginTop: "-40px" }}>
        <form className="profile-card-form" onSubmit={submitHandler}>
          <div className="profile-card-form__container">
            <label htmlFor="photo-upload" className="custom-file-upload fas">
              <div className="img-wrap img-upload">
                {imagePreviewUrl && <img src={imagePreviewUrl} alt=" " />}
              </div>
              <input
                id="photo-upload"
                type="file"
                onChange={handleImageChange}
              />
            </label>
            {Errmessage.length > 0 && (
              <a style={{ color: "red" }}>{Errmessage}</a>
            )}
          </div>
          <label htmlFor="">User name</label>
          <input
            className="createINPUT"
            type="text"
            value={enteredname}
            onChange={nameChangeHandler}
          />
          <br />
          <label htmlFor="">Email</label>
          <input
            className="createINPUT"
            type="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
          />
          <br />
          <label htmlFor="">Password</label>
          <input
            className="createINPUT"
            type="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
          <br />
          <div className="profile-card-form__bottom">
            <button
              className="profile-card__button button--blue js-message-close"
              style={{ width: "70px" }}
              type="submit"
              disabled={!formIsValid}
            >
              Create
            </button>
            <button
              style={{ width: "70px" }}
              className="profile-card__button button--gray js-message-close"
              onClick={() => {
                navigate("/admin");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="profile-card__overlay js-message-close" />
      </div>
    </div>
  );
}

export default Createuser;
