import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState("");
  const [error, setError] = useState("");
  const [type, setType] = useState("password");

  return (
    <div className="mum_card">
      <h1>What{"'"}s up ?</h1>
      <fieldset className="fieldset_of_connexion">
        <h4>Login</h4>
        <div className={loader}> {error} </div>
        <div>
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
        </div>
        <div>
          <label>Enter your password</label>
          <div className="small_radius">
            <input
              type={type.length > 0 ? type : "password"}
              placeholder="put your password"
              className="small_radius"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={() => {
                type === "text" ? setType("password") : setType("text");
              }}
            >
              {type === "text" ? (
                <BiHide size="20px" />
              ) : (
                <BiShow size="20px" />
              )}
            </button>
          </div>
        </div>
        <div>
          <input
            type="button"
            name="logIn"
            className="btn_with_shaddow"
            value="log in"
            onClick={() => {
              if (mail !== "" || password !== "") {
                setLoader("loader");
                axios({
                  method: "post",
                  url:
                    process.env.REACT_APP_SERVER_LINK_DEV + "/api/user/login",
                  data: {
                    mail: mail,
                    password: password,
                  },
                  headers: { "Content-Type": "application/json" },
                })
                  .then((res) => {
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
        </div>
        <div>
          <div>
            You don{"'"}t have an account ? <Link to="/signup">Sign Up ?</Link>{" "}
          </div>
        </div>
      </fieldset>
    </div>
  );
}
