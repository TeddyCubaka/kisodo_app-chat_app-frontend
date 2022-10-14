import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import discussionContext from "../../contexts/discussion";

export default function Login() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState("");
    const { setMeId } = useContext(discussionContext);
    return (
        <div className="mum_card">
            <h2>What's up ?</h2>
            <fieldset className="fieldset_of_connexion">
                <div className={loader}></div>
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
                        if (mail !== "" || password !== "") {
                            setLoader("loader");
                            const myData = {
                                mail: mail,
                                password: password,
                            };
                            axios({
                                method: "post",
                                url: "http://localhost:3000/api/user/login",
                                data: myData,
                                headers: { "Content-Type": "application/json" },
                            })
                                .then((res) => {
                                    console.log(res.data.token);
                                    localStorage.setItem(
                                        "token",
                                        res.data.token,
                                    );
                                    localStorage.setItem(
                                        "userId",
                                        res.data.userId,
                                    );
                                    setMeId({
                                        userId: res.data.userId,
                                    });
                                    window.location = "/home";
                                    setLoader("");
                                })
                                .catch((err) =>
                                    console.log(err, "jafuefoefuoeogfef"),
                                );
                        }
                    }}
                />
            </fieldset>
            <div>
                <div>
                    You don't have an account ?{" "}
                    <Link to="/signup">Sign Up ?</Link>{" "}
                </div>
            </div>
        </div>
    );
}
