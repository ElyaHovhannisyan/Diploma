import "./Login.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AuthService from "../../Services/auth.service";

function Login() {
  const navigate = useNavigate();
  const [, setLogin] = useState("");
  const [, setPassword] = useState("");
  const [error, setError] = useState("");
  const schema = yup.object().shape({
    username: yup.string().required("Այս դաշտը պարտադիր է"),
    password: yup.string().required("Այս դաշտը պարտադիր է"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onSubmit = (data) => {
    AuthService.login(data.username, data.password).then(
      (data) => {
        navigate("/user");
      },
      (error) => {
        setError(error.response.data.message);
      }
    );
  };

  return (
    <>
      <div className="header_bottom">
        <NavLink to="/register">
          <button className="register"> Գրանցում </button>
        </NavLink>
      </div>
      <div className="book_img">
        <form className="transparent" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-inner">
            <label className="username">Մուտքանուն</label>
            <input
              {...register("username")}
              id="username"
              onChange={handleLoginChange}
            />
            {errors.username && <p>*{errors.username.message}</p>}
            <label>Գաղտնաբառ</label>
            <input
              {...register("password")}
              type="password"
              autoComplete="new-password"
              onChange={handlePasswordChange}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
            />
            {errors.password && <p>*{errors.password.message}</p>}
            {error && <p>*{error}</p>}
            <input type="submit" value="Մուտք" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
