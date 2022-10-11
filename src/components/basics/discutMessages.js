import React, { useEffect, useState } from "react";
// import discussionContext from "../../contexts/discussion";
import Message from "./message";

export default function DiscutMessages() {
  // const { discut } = useContext(discussionContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/message")
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          data.message.reverse();
          setMessages(data.message);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="discut_msg">
      {/* <Message
        bulle={"message_right"}
        position={"flex_end-r"}
        content={"Hello"}
        date={"10-10-2022 10:10"}
      />
      <Message
        bulle={"message_left"}
        position={"flex_start-r"}
        content={"Hello Babe"}
        date={"10-10-2022 10:10"}
      /> */}
      {messages.length > 1 ? (
        messages.map((data, index) => (
          <>
          <Message
            key={data.id}
            bulle={"message_left"}
            position={"flex_start-r"}
            content={data.content}
            date={data.sendDate}
          />
          <Message
            key={data.id}
            bulle={"message_right"}
            position={"flex_end-r"}
            content={data.content}
            date={data.sendDate}
          />
          </>
        ))
      ) : (
        <div>No message here</div>
      )}
    </div>
  );
}
