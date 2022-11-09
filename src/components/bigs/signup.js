import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = useState({});
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    if (signed === true) {
      axios({
        method: "post",
        url: process.env.REACT_APP_SERVER_LINK_DEV + "/api/user/login",
        data: {
          mail: user.mail,
          password: user.password,
        },
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          window.location = "/home";
        })
        .catch((err) => console.log(err));
    }
  }, [signed]);

  return signed === false ? (
    <div className="mum_card">
      <h1>Did you want to join us ?</h1>
      <fieldset className="fieldset_of_connexion">
        <h4>Sign up</h4>
        <div>
          <label>What is your name ?</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your name"
            required
            onChange={(e) => {
              e.target.className = " bad_size";
              if (e.target.value.length > 2) {
                e.target.className = " right_size";
                setUser({ ...user, firstName: e.target.value });
              } else {
                e.target.className = " bad_size";
              }
            }}
          />
        </div>
        <div>
          {" "}
          <label>What{"'"}s your secondName ?</label>
          <input
            type="text"
            name="secondName"
            placeholder="Enter your send name"
            required
            onChange={(e) => {
              e.target.className = " bad_size";
              if (e.target.value.length > 2) {
                e.target.className = " right_size";
                setUser({ ...user, secondName: e.target.value });
              } else {
                e.target.className = " bad_size";
              }
            }}
          />
        </div>
        <div>
          <label>Enter your mail address</label>
          <input
            type="mail"
            name="email"
            placeholder="Enter your email address"
            required
            onChange={(e) => {
              e.target.className = " bad_size";
              if (
                e.target.value.length > 10 &&
                e.target.value.includes("@gmail.com")
              ) {
                e.target.className = " right_size";
                setUser({ ...user, mail: e.target.value });
              } else {
                e.target.className = " bad_size";
              }
            }}
          />
        </div>
        <div>
          <label>What{"'"}s your password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            onChange={(e) => {
              if (e.target.value.length > 5) {
                e.target.className = " right_size";
                setUser({ ...user, password: e.target.value });
              } else {
                e.target.className = " bad_size";
              }
            }}
          />
        </div>
        <div>
          <input
            type="button"
            name="signUp"
            className="btn_with_shaddow"
            value="Sign up"
            onClick={() => {
              axios({
                method: "post",
                url: process.env.REACT_APP_SERVER_LINK_DEV + "/api/user/signup",
                data: user,
                headers: { "Content-Type": "application/json" },
              })
                .then(() => {
                  setSigned(true);
                })
                .catch((err) => console.log(err));
            }}
          />
        </div>
        <div>
          <div>
            You have an account ? <Link to="/login">Login ?</Link>{" "}
          </div>
        </div>
      </fieldset>
    </div>
  ) : (
    <div className="big_loader"></div>
  );
}
