import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { MdDelete, MdReadMore, MdSaveAlt } from "react-icons/md";
import axios from "axios";

export default function Message({
  position,
  content,
  date,
  bulle,
  state,
  hasPicture,
  data,
  discussionId,
}) {
  const details = useRef();
  const [link, setLink] = useState("");

  const deleteMessage = () => {
    axios({
      method: "post",
      url:
        process.env.REACT_APP_SERVER_LINK_DEV +
        "/api/discussion/delete_message/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        // discussionId: discussionId,
        messageId: data._id,
        delete: true,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (hasPicture) {
      let a = hasPicture.split("upload/");
      setLink(a[0] + "upload/fl_attachment/" + a[1]);
    }
  }, [hasPicture]);

  return (
    <div className={`message ${position}`}>
      <div
        className={`${bulle} msg_bulle`}
        onClick={() => {
          console.log(data._id);
        }}
      >
        {hasPicture ? (
          <div className="message_picture">
            {" "}
            <img src={hasPicture} alt="" />{" "}
          </div>
        ) : null}
        {content === "" ? null : <div className="content">{content}</div>}
        <span className={`${state} smaller`}>
          {" "}
          {state == "msg_sended" ? "ok" : false}{" "}
          {state == "failure" ? "échec d&lsquoenvoie" : false}{" "}
        </span>
        <details ref={details}>
          <summary>
            <span className="medium">Info</span>
          </summary>
          <ul>
            <li
              onClick={() => {
                deleteMessage();
              }}
            >
              {" "}
              <MdDelete size="30px" color="black" />{" "}
            </li>
            <li>
              {" "}
              <MdReadMore size="30px" color="black" />{" "}
            </li>
            {hasPicture ? (
              <li>
                <a href={link} download={`kisodo_app_${data._id}`}>
                  <MdSaveAlt size="30px" color="black" />
                </a>
              </li>
            ) : (
              false
            )}
          </ul>
        </details>
      </div>
      <div className="smaller"> {date} </div>
    </div>
  );
}

Message.propTypes = {
  name: PropTypes.string,
  position: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  bulle: PropTypes.string,
  state: PropTypes.string,
  data: PropTypes.object,
  hasPicture: PropTypes.string,
  discussionId: PropTypes.string,
};
