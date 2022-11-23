import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { BiShow, BiHide } from "react-icons/bi";

export default function Begin() {
  const [user, setUser] = useState({ name: "begin" });
  const [pwd, setPwd] = useState("");
  const [type, setType] = useState("password");
  const [bool, setBool] = useState(false);

  const login = () => {
    axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_LINK_DEV + "/api/user/login",
      data: {
        mail: user.mail,
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

  useEffect(() => {
    axios({
      method: "get",
      url:
        process.env.REACT_APP_SERVER_LINK_DEV +
        "/api/user/" +
        localStorage.getItem("userId"),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.data == null) return;
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [localStorage.getItem("token")]);

  return (
    <div
      className="welcome_card"
      onClick={() => {
        setBool(true);
      }}
    >
      <div className="welcome_illustration">Illustration here</div>
      <div className="welcome_action_card">
        <div>
          <h1>Welcome to KisodO App</h1>
          <button>
            <Link to="/signup">Sign up</Link>
          </button>
          <button>
            <Link to="/login">Login</Link>
          </button>
        </div>
        {user._id ? (
          <div>
            <strong>Se connecter en tant que : </strong>
            <div className="user_connected_card">
              <p className="margin_x-10 content_center img_card">
                {" "}
                <img src={user.image} alt="" />{" "}
              </p>
              <div>
                <strong>
                  {" "}
                  {user.firstName} {user.secondName}{" "}
                </strong>
                <div> {user.biography} </div>
              </div>
            </div>
          </div>
        ) : (
          false
        )}
      </div>
      {bool === true ? (
        <div className="absolute">
          <button
            className="close"
            onClick={() => {
              if (bool === true) setBool(false);
              window.location.reload();
            }}
          >
            {" "}
            <GrClose size="25px" />{" "}
          </button>
          <div className="first_form">
            <label>
              Welcome{" "}
              <strong>
                {user.firstName[0].toUpperCase() + user.firstName.slice(1)}
              </strong>{" "}
              , just put your password{" "}
            </label>
            <div className="outlet_from_begin">
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
                {type === "text" ? (
                  <BiHide size="20px" />
                ) : (
                  <BiShow size="20px" />
                )}
              </button>
            </div>
            <input
              type="button"
              value="Submit"
              className={`${
                pwd.length > 5
                  ? "btn_with_shaddow"
                  : "btn_with_shaddow_not_actif"
              } small_radius`}
              onClick={() => {
                pwd.length > 5 ? login() : console.log("remplissez d'abord");
              }}
            />
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
}
