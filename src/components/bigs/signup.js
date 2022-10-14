import axios from "axios";
import React, { useState } from "react";
import { json } from "react-router-dom";

export default function Signup() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [pwdSize, setPwdSize] = useState(0);
    const [mailSize, setMailSize] = useState(0);
    const [CorrectMail, setCorrectMail] = useState("");
    const [nicePwdSize, setNicePwdSize] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    return (
        <div className="mum_card">
            <h2>Did you want to join us ?</h2>
            <fieldset className="fieldset_of_connexion">
                {msg == "" ? (
                    false
                ) : (
                    <div style={{ color: "red" }}> {msg} </div>
                )}
                <label>What is your name ?</label>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your name"
                    required
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                />
                <label>What's your secondName ?</label>
                <input
                    type="text"
                    name="secondName"
                    placeholder="Enter your send name"
                    required
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                />
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
                    What's your password {pwdSize > 1 ? pwdSize : false}{" "}
                    {nicePwdSize}
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (nicePwdSize > 8) setPwdSize(mailSize + 1);
                    }}
                />
                <input
                    type="button"
                    name="signUp"
                    value="Sign up"
                    onClick={() => {
                        mailSize < 10
                            ? setCorrectMail("Check your mail")
                            : setCorrectMail("");
                        pwdSize < 8
                            ? setNicePwdSize(
                                  "Too short passeword change it plz",
                              )
                            : setNicePwdSize("nice password");
                        if (mail == "" || password == "") {
                            setMsg("The mail or the password is invalid");
                        } else if (mail.endsWith("gmail.com") == false) {
                            setMsg("A gmail plz");
                        } else {
                            setMsg("");
                            const myData = {
                                firstName: firstName,
                                secondName: lastName,
                                mail: mail,
                                password: password,
                            };

                            axios({
                                method: "post",
                                url: "http://localhost:3000/api/user/signup",
                                data: myData,
                                headers: { "Content-Type": "application/json" },
                            })
                                .then((res) => console.log(res))
                                .catch((err) =>
                                    console.log(err, "jafuefoefuoeogfef"),
                                );
                        }
                    }}
                />
            </fieldset>
        </div>
    );
}
