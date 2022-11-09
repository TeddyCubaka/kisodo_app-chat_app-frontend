import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="mum_card">
      <h2>What&lsquos up ?</h2>
      <fieldset className="fieldset_of_connexion">
        <div className={loader}> {error} </div>
        <label htmlFor="mail">Enter your mail address</label>
        <input
          type="mail"
          name="email"
          id="mail"
          placeholder="Enter your email address"
          required
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
        <label>Enter your password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="button"
          name="logIn"
          value="log in"
          onClick={() => {
            if (mail !== "" || password !== "") {
              setLoader("loader");
              axios({
                method: "post",
                url: process.env.REACT_APP_SERVER_LINK_DEV + "/api/user/login",
                data: {
                  mail: mail,
                  password: password,
                },
                headers: { "Content-Type": "application/json" },
              })
                .then((res) => {
                  console.log(res.data.token);
                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("userId", res.data.userId);
                  window.location = "/home";
                  setLoader("");
                })
                .catch((err) => {
                  console.log(err);
                  setError("verifier your password or your mail. ");
                  setLoader("error");
                });
            }
          }}
        />
      </fieldset>
      <div>
        <div>
          You don&lsquot have an account ? <Link to="/signup">Sign Up ?</Link>{" "}
        </div>
      </div>
    </div>
  );
}
