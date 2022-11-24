import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineCamera, AiOutlineSend } from "react-icons/ai";
import discussionContext from "../../contexts/discussion";
import { socket } from "../bigs/home";

export default function TextZone() {
  const { me, setDiscut, actualDiscussion } = useContext(discussionContext);
  const [value, setValue] = useState("");
  const [urls, setUrls] = useState([]);
  const [file, setFile] = useState({});
  const [load, setLoad] = useState("");
  const input = useRef();

  function updateTextareaHeight() {
    // input.style.height = "auto";
    // input.style.height = input.scrollHeight + "px";
    // console.log(input);
  }

  const sendMessage = async () => {
    let bool = false;
    let img = {};
    if (file.name) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "kisodo_app");
      await axios
        .post(
          "https://api.cloudinary.com/v1_1/di64z9yxk/image/upload",
          formData
        )
        .then((res) => {
          setFile({});
          setUrls([]);
          bool = true;
          img = {
            width: res.data.width,
            height: res.data.height,
            url: res.data.secure_url,
            originalFilename: res.data.original_filename,
            format: res.data.format,
            createDate: res.data.created_at,
          };
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    axios({
      method: "post",
      url:
        process.env.REACT_APP_SERVER_LINK_DEV + "/api/discussion/add_message",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        discussionId: actualDiscussion.discussionId,
        message: {
          isPicture: bool,
          image: img,
          content: value,
          sender: {
            userId: me.userId,
            fullName: `${me.firstName} ${me.secondName}`,
          },
        },
      },
    })
      .then(() => {
        setLoad("");
        socket.emit("send", {
          discussionId: actualDiscussion.discussionId,
          message: {
            isPicture: bool,
            image: img,
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
          isPicture: bool,
          image: { url: urls },
          content: value,
          date: new Date().toLocaleDateString(),
          send: "failure",
        });
        console.log(err);
      });
  };

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
            rows="1"
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setLoad("sending");
                if (actualDiscussion.discussionId && value !== "") {
                  setDiscut({});
                  sendMessage();
                }
                if (urls.length > 0) sendMessage();
                if (value !== "") {
                  setValue("");
                }
              }
            }}
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
                setFile(e.target.files[0]);
                const imagesUrls = [];
                imagesUrls.push(URL.createObjectURL(e.target.files[0]));
                setUrls(imagesUrls);
              }}
            />
            <AiOutlineCamera size="20px" />
          </div>
        </div>
        <button
          className="send_button small_radius"
          onClick={() => {
            setLoad("sending");
            if (actualDiscussion.discussionId && value !== "") {
              setDiscut({});
              sendMessage();
            }
            if (urls.length > 0) sendMessage();
            if (value !== "") {
              setValue("");
            }
          }}
        >
          {load !== "" ? load : <AiOutlineSend size="15px" color="#F5F5F5" />}
        </button>
      </div>
    </div>
  );
}
