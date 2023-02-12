import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AuthService from "../../Services/auth.service";

const required = (value) => {
  if (!value) {
    return <div className="invalidR">This field is required!</div>;
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return <div className="invalidR">This is not a valid email.</div>;
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalidR">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 8 || value.length > 40) {
    return (
      <div className="invalidR">
        The password must be between 8 and 40 characters.
      </div>
    );
  }
};

function Sign_up(props) {
  const form = useRef();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username + email + password);
    setMessage("");
    setSuccessful(false);
    navigate("/login");

    AuthService.register(username, email, password).then(
      (data) => {
        setMessage(data.message);
        setSuccessful(true);
        navigate("/login");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <>
      <div className="header_bottom">
        <NavLink
          to="/login"
          className="login"
          style={{
            textDecoration: "none",
          }}
        >
          Մուտք
        </NavLink>
      </div>
      <div className="book_img">
        <form className="transparent" onSubmit={handleRegister}>
          {/* {!successful && ( */}
          <div className="form-inner">
            <label className="username">Մուտքանուն</label>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              validations={[required, vusername]}
            />
            <label className="email">Էլեկտրոնային հասցե</label>
            <input
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              validations={[required, validEmail]}
            />
            <label>Գաղտնաբառ</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="new-password"
              validations={[required, vpassword]}
            />
            <label>Գաղտնաբառի կրկնություն</label>
            <input
              type="password"
              onChange={(e) => {
                setRepassword(e.target.value);
              }}
              autoComplete="new-password"
            />
            <input type="submit" value="Գրանցում" />
          </div>
          {/* )} */}
          {/* {message && (
            <div className="transparent">
              <div className={successful ? "success" : "danger"} role="alert">
                {message}
              </div>
            </div>
          )} */}
        </form>
      </div>
    </>
  );
}

export default Sign_up;
