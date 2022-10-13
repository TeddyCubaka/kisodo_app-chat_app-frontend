import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  return (
    <div>
      <fieldset>
        <h2>What's up ?</h2>
        {msg == "" ? false : <div color="red"> {msg} </div>}
        <label>Enter your mail address</label>
        <input
          type="mail"
          name="email"
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
            if (mail == "" || password == "") {
              setMsg("Please enter your email address and password");
            } else if (mail.endsWith("gmail.com") == false) {
              setMsg("A gmail plz");
            } else {
              console.log(mail, password);
            }
          }}
        />
      </fieldset>
      <div>
        <div>
          You don't have an account ? <Link to="login">Sign Up ?</Link>{" "}
        </div>
      </div>
    </div>
  );
}
