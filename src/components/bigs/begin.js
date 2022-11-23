import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Begin() {
  const [user, setUser] = useState({ name: "begin" });
  const [bool, setBool] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
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
        if (user._id) setBool(true);
      }}
    >
      <div className="welcome_illustration">Illustration here</div>
      <div className="welcome_action_card">
        <div>
          <h1>Welcome to KisodO App</h1>
          <Link
            to="/signup"
            style={{
              color: "black",
              textDecoration: "none",
              width: "80px",
              height: "30px",
              display: "inline-block",
              borderRadius: "5px",
              margin: "0px 20px",
              backgroundColor: "white",
            }}
          >
            Sign up
          </Link>
          <Link
            to="/login"
            style={{
              color: "black",
              textDecoration: "none",
              width: "80px",
              height: "30px",
              display: "inline-block",
              borderRadius: "5px",
              margin: "0px 20px",
              backgroundColor: "white",
            }}
          >
            Login
          </Link>
        </div>
        {user._id ? (
          <div>
            <strong>Se connecter en tant que : </strong>
            <Link
              to={`/takeconnection/${user.firstName}_${user.mail}`}
              className="user_connected_card"
              style={{ color: "black", textDecoration: "none" }}
            >
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
            </Link>
          </div>
        ) : (
          false
        )}
      </div>
      {bool === true ? <Outlet /> : false}
    </div>
  );
}
