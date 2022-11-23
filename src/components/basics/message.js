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
  const [deleted, setDeleted] = useState("");
  const [sendDate, setSendDate] = useState("");

  useEffect(() => {
    let now = new Date().getDate();
    if (now.toString() == date.split("/")[0]) {
      setSendDate("today");
    } else {
      setSendDate(date);
    }
  }, [date]);

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
        discussionId: discussionId,
        messageId: data._id,
        delete: true,
      },
    })
      .then((res) => {
        console.log(res);
        setDeleted("Message deleted");
      })
      .catch((err) => {
        setDeleted("Message was not deleted");
        console.log(err);
      });
  };

  useEffect(() => {
    if (hasPicture) {
      let a = hasPicture.split("upload/");
      setLink(a[0] + "upload/fl_attachment/" + a[1]);
    }
  }, [hasPicture]);

  return (
    <div
      className={`message ${position}`}
      onClick={() => {
        if (details.current.open === true) {
          details.current.open = false;
        } else {
          details.current.open = true;
        }
      }}
    >
      <div className={`${bulle} msg_bulle`}>
        {hasPicture ? (
          <div className="message_picture">
            {" "}
            <img src={deleted === "" ? hasPicture : ""} alt="" />{" "}
          </div>
        ) : null}

        {content === "" ? null : (
          <div className="content">{deleted === "" ? content : deleted}</div>
        )}

        <span className={`${state} smaller`}>
          {" "}
          {state == "msg_sended" ? "ok" : false}{" "}
          {state == "failure" ? "échec d&lsquoenvoie" : false}{" "}
        </span>
        <div className="smaller"> {sendDate} </div>

        <details ref={details}>
          <summary>
            <span className="medium" style={{ color: "white" }}>
              Info
            </span>
          </summary>
          <ul>
            <li
              onClick={() => {
                deleteMessage();
                details.current.open = false;
              }}
            >
              {" "}
              <MdDelete size="30px" color="white" />{" "}
            </li>
            <li>
              {" "}
              <MdReadMore size="30px" color="white" />{" "}
            </li>
            {hasPicture ? (
              <li>
                <a href={link} download={`kisodo_app_${data._id}`}>
                  <MdSaveAlt size="30px" color="white" />
                </a>
              </li>
            ) : (
              false
            )}
          </ul>
        </details>
      </div>
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
