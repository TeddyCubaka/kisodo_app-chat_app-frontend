import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [pwdSize, setPwdSize] = useState(0);
  const [mailSize, setMailSize] = useState(0);
  const [CorrectMail, setCorrectMail] = useState("");
  const [nicePwdSize, setNicePwdSize] = useState("");
  return (
    <div>
      <fieldset>
        <h2>What's up ?</h2>
        {msg == "" ? false : <div color="red"> {msg} </div>}
        <label>
          Enter your mail address {mailSize > 1 ? mailSize : false}{" "}
          {CorrectMail}{" "}
        </label>
        <input
          type="mail"
          name="email"
          placeholder="Enter your email address"
          required
          onChange={(e) => {
            setMailSize(e.target.value.length);
            if (mailSize > 10) setMail(e.target.value);
          }}
        />
        <label>
          Enter your password {pwdSize > 1 ? pwdSize : false} {nicePwdSize}
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
            setPwdSize(mailSize + 1);
          }}
        />
        <input
          type="button"
          name="logIn"
          value="log in"
          onClick={() => {
            mailSize < 10
              ? setCorrectMail("Check your mail")
              : setCorrectMail("");
            pwdSize < 8
              ? setNicePwdSize("Too short passeword change it plz")
              : setNicePwdSize("nice password");
            if (mail == "" || password == "") {
              setMsg("The mail or the password is invalid");
            } else if (mail.endsWith("gmail.com") == false) {
              setMsg("A gmail plz");
            } else {
              setMsg("");
              axios();
            }
          }}
        />
      </fieldset>
      <div>
        <div>
          You don't have an account ? <Link to="/signup">Sign Up ?</Link>{" "}
        </div>
      </div>
    </div>
  );
}
