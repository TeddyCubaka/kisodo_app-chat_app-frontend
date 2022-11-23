import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import discussionContext from "../../contexts/discussion";
import { CgCommunity } from "react-icons/cg";

export default function AllMemberButton() {
  const { setAllMember, allMember } = useContext(discussionContext);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: process.env.REACT_APP_SERVER_LINK_DEV + "/api/user",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((data) => {
        setMembers(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <button
      className={`nav_btn ${
        allMember.length
          ? allMember[0].membres
            ? " "
            : "current_nav_btn"
          : " "
      }`}
      onClick={() => {
        setAllMember(members);
      }}
    >
      <CgCommunity size="25px" color="white" />
    </button>
  );
}
