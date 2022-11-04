import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCamera, AiOutlineSend } from "react-icons/ai";
import discussionContext from "../../contexts/discussion";
import { socket } from "../bigs/home";
import DisplayerImage from "./displayerImage";

export default function TextZone() {
  const { me, setDiscut, actualDiscussion } = useContext(discussionContext);
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [state, setState] = useState([]);
  useEffect(() => {
    if (images.length < 1) return;
    const imagesUrls = [];
    images.map((img) => imagesUrls.push(URL.createObjectURL(img)));
    setUrls(imagesUrls);
  }, [images]);

  return (
    <div className="send-zone">
      <DisplayerImage urls={urls.length < 1 ? [] : urls} state={state} />
      <div className="text_zone">
        <div className="text_input">
          <textarea
            spellCheck="true"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
          ></textarea>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImages([...e.target.files]);
                setState("displayer_image");
              }}
            />
            <AiOutlineCamera size="30px" />
          </div>
        </div>
        <button
          onClick={() => {
            if (actualDiscussion.discussionId && value !== "") {
              setDiscut({});
              axios({
                method: "post",
                url:
                  process.env.REACT_APP_SERVER_LINK_DEV +
                  "/api/discussion/add_message",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
                data: {
                  discussionId: actualDiscussion.discussionId,
                  message: {
                    content: value,
                    sender: {
                      userId: me.userId,
                      fullName: `${me.firstName} ${me.secondName}`,
                    },
                  },
                },
              })
                .then((res) => {
                  socket.emit("send", {
                    discussionId: actualDiscussion.discussionId,
                    message: {
                      content: value,
                      sendDate: new Date().toLocaleDateString(),
                      sender: {
                        userId: me.userId,
                        fullName: `${me.firstName} ${me.secondName}`,
                      },
                    },
                  });
                })
                .catch((err) => {
                  setDiscut({
                    content: value,
                    date: new Date().toLocaleDateString(),
                    send: "failure",
                  });
                  console.log(err);
                });
            }
            if (value !== "") {
              setValue("");
            }
          }}
        >
          <AiOutlineSend />
        </button>
      </div>
    </div>
  );
}
