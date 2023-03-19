import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AuthService from "../../Services/auth.service";

function Register() {
  const navigate = useNavigate();
  const [, setUsername] = useState("");
  const [, setEmail] = useState("");
  const [, setPassword] = useState("");
  const [, setRepassword] = useState("");
  const [error, setError] = useState("");
  const schema = yup.object().shape({
    username: yup.string().required("Այս դաշտը պարտադիր է"),
    email: yup
      .string()
      .required("Այս դաշտը պարտադիր է")
      .matches(/@polytechnic.am$/, "Անվավեր էլ․ հասցե"),
    password: yup
      .string()
      .required("Այս դաշտը պարտադիր է")
      .min(8, "Գաղտնաբառը պետք պարունակի ամենաքիչը 8 սիմվոլ")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
        "Պետք է պարունակի մեծատառ, փոքրատառ և սիմվոլ"
      ),
    confirmPassword: yup
      .string()
      .required("Այս դաշտը պարտադիր է")
      .oneOf([yup.ref("password"), null], "Գաղտնաբառը պետք է համընկնի"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    AuthService.register(data.username, data.email, data.password).then(
      (data) => {
        if (data.LecturerId || data.StudentId) navigate("/user");
        else if (data.WorkerId) navigate("/worker");
      },
      (error) => {
        setError(error.response.data.message);
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
        <form className="transparent" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-inner">
            <label className="username">Մուտքանուն</label>
            <input
              {...register("username")}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            {errors.username && <p>*{errors.username.message}</p>}
            <label className="email">Էլեկտրոնային հասցե</label>
            <input
              {...register("email")}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="*@polytechnic.am"
            />
            {errors.email && <p>*{errors.email.message}</p>}
            <label>Գաղտնաբառ</label>
            <input
              {...register("password")}
              type="password"
              autoComplete="new-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
            <label>Գաղտնաբառի կրկնություն</label>
            <input
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword")}
              onChange={(e) => {
                setRepassword(e.target.value);
              }}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
            />
            {errors.confirmPassword && <p>*{errors.confirmPassword.message}</p>}
            {error && <p>*{error}</p>}
            <input type="submit" value="Գրանցում" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
