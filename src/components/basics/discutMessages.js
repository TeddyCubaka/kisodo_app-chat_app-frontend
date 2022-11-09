import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import discussionContext from "../../contexts/discussion";
import Message from "./message";
import { socket } from "../bigs/home";

export default function DiscutMessages() {
  let {
    me,
    discut,
    actualDiscussion,
    setLoading,
    loading,
    messages,
    setMessages,
  } = useContext(discussionContext);
  const [text, setText] = useState(" ");
  const [last, setLast] = useState({});
  useEffect(() => {
    if (actualDiscussion.discussionId) {
      axios({
        method: "get",
        url:
          process.env.REACT_APP_SERVER_LINK_DEV +
          "/api/discussion/" +
          actualDiscussion.discussionId,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => {
          res.data.messages.reverse();
          setMessages(res.data.messages);
          setLoading("null");
          if (res.data.messages.length === 0) setText("Empty");
        })
        .catch((err) => {
          console.log(err);
          setLoading("failure");
        });
    }
  }, [actualDiscussion]);
  useEffect(() => {
    socket.on("new message", (converse) => {
      setLast(converse);
    });
  }, [last]);
  useEffect(() => {
    let arr = new Array();
    if (messages.length > 0) {
      arr = messages.filter((mess, index) => {
        return mess.content !== last.content && index < 20;
      });
      arr.unshift(last.message);
    }
    if (last.discussionId === actualDiscussion.discussionId) setMessages(arr);
  }, [last]);

  return (
    <div className="discut_msg">
      {discut.content ? (
        <Message
          key={1}
          bulle={"message_right"}
          position={"flex_end-r"}
          content={discut.content}
          date={discut.date}
          state={
            discut.send === false
              ? "msg_loader"
              : discut.send === "failure"
              ? "failure"
              : "msg_sended"
          }
        />
      ) : (
        false
      )}
      {messages.length > 1 ? (
        messages.map((data, index) => (
          <Message
            key={data._id ? data._id : index}
            bulle={
              data.sender
                ? data.sender.userId === me.userId
                  ? "message_right"
                  : "message_left"
                : ""
            }
            position={
              data.sender
                ? data.sender.userId === me.userId
                  ? "flex_end-r"
                  : "flex_start-r"
                : ""
            }
            content={data.content}
            date={data.sendDate}
            hasPicture={data.pictureUrl ? data.pictureUrl : null}
          />
        ))
      ) : messages.length === 0 ? (
        <div className="weit_msg">
          {actualDiscussion.discussionId ? (
            <div className={loading}> {text} </div>
          ) : (
            "Start converse"
          )}
        </div>
      ) : (
        <div className="weit_msg">
          <div>{text}</div>
        </div>
      )}
    </div>
  );
}
