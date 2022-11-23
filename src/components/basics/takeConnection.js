import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { BiShow, BiHide } from "react-icons/bi";
import axios from "axios";

export default function TakeConnection() {
  const [pwd, setPwd] = useState("");
  const [type, setType] = useState("password");

  let user = useParams();

  const login = () => {
    axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_LINK_DEV + "/api/user/login",
      data: {
        mail: user.name.split("_")[1],
        password: pwd,
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        window.location = "/home";
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="absolute">
      <button className="close">
        <Link to="/">
          <GrClose size="25px" />{" "}
        </Link>
      </button>
      <div className="first_form">
        <label>
          Welcome{" "}
          <strong>{user.name[0].toUpperCase() + user.name.slice(1)}</strong> ,
          just put your password{" "}
        </label>
        <div className="width-270 outlet_from_begin">
          <input
            type={type.length > 0 ? type : "password"}
            placeholder="put your password"
            className="small_radius"
            autoFocus
            value={pwd.length > 0 ? pwd : ""}
            onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
          <button
            type="button"
            onClick={() => {
              type === "text" ? setType("password") : setType("text");
            }}
          >
            {type === "text" ? <BiHide size="20px" /> : <BiShow size="20px" />}
          </button>
        </div>
        <input
          type="button"
          value="Submit"
          className={`${
            pwd.length > 5 ? "btn_with_shaddow" : "btn_with_shaddow_not_actif"
          } small_radius`}
          onClick={() => {
            pwd.length > 5 ? login() : console.log("remplissez d'abord");
          }}
        />
      </div>
    </div>
  );
}
