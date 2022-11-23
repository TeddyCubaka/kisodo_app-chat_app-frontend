import React, { useContext, useEffect, useState } from "react";
import discussionContext from "../../contexts/discussion";
import PropTypes from "prop-types";
import { socket } from "../bigs/home";
import avatar from "../../images/avatar.png";

export default function Contact({ name, message, image, data, discussionId }) {
  const {
    setFreind,
    setActualDiscussion,
    setLoading,
    setMessages,
    relations,
    setPosition,
    me,
  } = useContext(discussionContext);
  const [last, setLast] = useState("");
  useEffect(() => {
    socket.on("new message", (msg) => {
      if (msg.discussionId === data._id) setLast(msg.message.content);
    });
  }, []);

  return (
    <div
      className="contact_card"
      onClick={() => {
        if (!data.membres) {
          setFreind({
            userId: data._id,
            fullName: name,
            image: image,
            biography: data.biography,
            discussionId: discussionId,
          });
          setMessages([]);
          setLoading("loader");
          setActualDiscussion({});
          relations.map((user) =>
            user[0].userId === data._id
              ? setActualDiscussion({
                  discussionId: user[1],
                })
              : false
          );
        } else {
          setMessages([]);
          setLoading("big_loader");
          setActualDiscussion({
            userId: data.membres[0]._id,
            fullName: name,
            image: image,
            biography: data.biography,
            discussionId: data._id,
          });
          setFreind({
            userId: data.membres[0]._id,
            fullName: name,
            image: image,
            biography: data.biography,
            discussionId: data._id,
          });
          socket.emit("join room", data._id);
        }
        setPosition(0);
      }}
    >
      <div className="margin_x-10 content_center img_card">
        {image ? <img src={image} alt="" /> : <img src={avatar} alt="" />}
      </div>
      <div className="contact_info">
        <div className="strong"> {name} </div>
        {message ? (
          <div className="small">{message}</div>
        ) : (
          <div className="small"> {last} </div>
        )}
      </div>
    </div>
  );
}

Contact.propTypes = {
  name: PropTypes.string,
  message: PropTypes.bool,
  image: PropTypes.string,
  data: PropTypes.object,
  discussionId: PropTypes.string,
};
