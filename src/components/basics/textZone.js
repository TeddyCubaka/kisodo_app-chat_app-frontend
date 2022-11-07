import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCamera, AiOutlineSend } from "react-icons/ai";
import discussionContext from "../../contexts/discussion";
import { socket } from "../bigs/home";

export default function TextZone() {
  const { me, setDiscut, actualDiscussion } = useContext(discussionContext);
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const imagesUrls = [];
    images.map((img) => imagesUrls.push(URL.createObjectURL(img)));
    setUrls(imagesUrls);
    setImages([]);
  }, [images]);

  return (
    <div className="send-zone">
      <div className="image-card">
        {urls.length < 1 ? (
          ""
        ) : (
          <div className="displayer_image">
            <button
              onClick={() => {
                setUrls([]);
              }}
            >
              X
            </button>
            <div className="images">
              {urls.map((url) => (
                <div className="image_message" key={url}>
                  <img src={url} alt="" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="text_zone small_radius">
        <div className="text_input small_radius">
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
              className="input_file"
              onChange={(e) => {
                setImages([...e.target.files]);
              }}
            />
            <AiOutlineCamera size="20px" />
          </div>
        </div>
        <button
          className="send_button small_radius"
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
          <AiOutlineSend size="15px" color="#F5F5F5" />
        </button>
      </div>
    </div>
  );
}
