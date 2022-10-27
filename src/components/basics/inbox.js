import axios from "axios";
import React, { useContext, useEffect } from "react";
import discussionContext from "../../contexts/discussion";

export default function Inbox() {
  const { setAllMember, userInbox } = useContext(discussionContext);
  return (
    <button
      className="nav_btn"
      onClick={() => {
        setAllMember(userInbox);
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
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }}
    >
      <h3>Inbox</h3>
    </button>
  );
}
