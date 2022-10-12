import React, { useEffect, useState, useContext } from "react";
import discussionContext from "../../contexts/discussion";
import Message from "./message";

export default function DiscutMessages() {
  let { freind } = useContext(discussionContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/message")
      .then((res) => {
        res.json().then((data) => {
          data.message.reverse();
          setMessages(data.message);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="discut_msg">
      {messages.length > 1 ? (
        messages.map((data) => (
          <Message
            key={data.id}
            bulle={data.sender.userId === freind.userId ? "message_left" : "message_right"}
            position={ data.sender.userId === freind.userId ? "flex_start-r" : "flex_end-r"}
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
