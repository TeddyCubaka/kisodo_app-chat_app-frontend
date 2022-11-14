import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

export default function Message({
  position,
  content,
  date,
  bulle,
  state,
  hasPicture,
  data,
}) {
  const [see, setSee] = useState(false);
  const details = useRef();

  return (
    <div className={`message ${position}`}>
      <div
        className={`${bulle} msg_bulle`}
        onClick={() => {
          return see === false ? setSee(true) : setSee(false);
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
            {" "}
            {details.current && details.current.open === false
              ? "info"
              : ""}{" "}
          </summary>
          <ul>
            <li>Delete this message</li>
            <li>More info</li>
            <li>
              <a
                href="http://res.cloudinary.com/di64z9yxk/image/upload/v1668182521/chat_app_memory/duunxuwxcx0h5dpxmuts.png"
                download
              >
                une image de cloudinary
              </a>
            </li>
            {hasPicture ? (
              <li>
                <a href={hasPicture} download={`${data._id}`}>
                  download
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
};
