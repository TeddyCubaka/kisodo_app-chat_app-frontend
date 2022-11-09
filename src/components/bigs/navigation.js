import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import discussionContext from "../../contexts/discussion";
import AllMemberButton from "../basics/allMemberBtn";
import Inbox from "../basics/inbox";
import { socket } from "./home";
import User from "../basics/user";

export default function Navigation() {
  const { me, setMe, setUserInbox, setAllMember, setRelations, setDiscut } =
    useContext(discussionContext);
  const [discussion, setDiscussion] = useState({});
  const [count, setCount] = useState(0);
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
        console.log(res.data);
        setMe({
          firstName: res.data.firstName,
          secondName: res.data.secondName,
          joinDate: res.data.joinDate,
          userId: res.data._id,
          biography: res.data.biography,
          image: res.data.image,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios({
      method: "get",
      url:
        process.env.REACT_APP_SERVER_LINK_DEV +
        "/api/discussion/inbox/" +
        localStorage.getItem("userId"),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setUserInbox(res.data);
        setAllMember(res.data);
        setDiscussion(res.data);
        setCount(count + 1);
        const array = [];
        res.data.map((disc) => {
          const arr = disc.membres.filter(
            (user) => user.userId !== localStorage.getItem("userId")
          );
          arr.push(disc._id);
          array.push(arr);
        });
        setRelations(array);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (count === 1) {
      socket.emit("send rooms", discussion);
    }
  }, [discussion]);

  return (
    <div className="navbarre radius margin">
      <User me={me} />
      <div className="nav_list">
        <Inbox />
        <AllMemberButton />
      </div>
    </div>
  );
}
