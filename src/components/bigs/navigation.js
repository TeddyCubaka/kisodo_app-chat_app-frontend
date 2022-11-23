import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import discussionContext from "../../contexts/discussion";
import AllMemberButton from "../basics/allMemberBtn";
import Inbox from "../basics/inbox";
import { socket } from "./home";
import User from "../basics/user";
import { FiLogOut } from "react-icons/fi";

export default function Navigation() {
  const { me, setMe, setUserInbox, setAllMember, setRelations } =
    useContext(discussionContext);
  const [discussion, setDiscussion] = useState([]);
  const [count, setCount] = useState(0);
  const [messagesNumber, setMessagesNumber] = useState(0);

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
      .then(async (res) => {
        await setMe({
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
          if (arr.length === 0)
            arr.push({ userId: localStorage.getItem("userId") });
          arr.push(disc._id);
          array.push(arr);
        });
        setRelations(array);

        let counter = 0;
        res.data.map((contact) => {
          counter = counter + contact.messages.length;
        });
        setMessagesNumber(counter);
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
      <User me={me} messagesNumber={messagesNumber} />
      <div className="nav_list">
        <Inbox />
        <AllMemberButton />
      </div>
      <button
        type="button"
        className="logout_button"
        onClick={() => {
          if (prompt("se deconnecter ?", "oui")) {
            localStorage.setItem("token", "");
            window.location = "/";
          }
        }}
      >
        <FiLogOut size="40px" color="white" />
      </button>
    </div>
  );
}
