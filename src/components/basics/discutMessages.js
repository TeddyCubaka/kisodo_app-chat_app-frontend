import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import discussionContext from "../../contexts/discussion";
import Message from "./message";

export default function DiscutMessages() {
  let { freind, setActualDiscussion } = useContext(discussionContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/discussion/63468f649e2ec6ed2dbf3975")
      .then((res) =>
        res.json().then((data) => {
          data.messages.reverse();
          setMessages(data.messages);
          setActualDiscussion({
            name : data.name,
            discussionId : data._id,
            membres : data.membres,
          })
        })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="discut_msg">
      {messages.length > 0 ? (
        messages.map((data) => (
          <Message
            key={data.id}
            bulle={
              data.sender.userId === freind.userId
                ? "message_left"
                : "message_right"
            }
            position={
              data.sender.userId === freind.userId
                ? "flex_start-r"
                : "flex_end-r"
            }
            content={data.content}
            date={data.sendDate}
          />
        ))
      ) : (
        <div>No message here</div>
      )}
    </div>
  );
}
