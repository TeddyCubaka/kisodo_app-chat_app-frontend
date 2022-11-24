import React, { useContext, useEffect, useState } from "react";
import { MdOutlineContactMail } from "react-icons/md";
import { AiOutlineCamera } from "react-icons/ai";
import discussionContext from "../../contexts/discussion";
import axios from "axios";
import { socket } from "../bigs/home";
import EmojiPicker from "emoji-picker-react";

export default function StartConverse() {
  const { freind, me } = useContext(discussionContext);
  const [value, setValue] = useState("");
  const [urls, setUrls] = useState([]);
  const [file, setFile] = useState({});
  const [load, setLoad] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const axiosPost = async () => {
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
        })
        .catch((err) => console.log(err));
    }
    axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_LINK_DEV + "/api/discussion/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        isGroup: false,
        membres: [
          {
            userId: freind.userId,
            fullName: freind.fullName,
            image: freind.image,
            biography: freind.biography,
          },
          {
            userId: me.userId,
            fullName: me.firstName + " " + me.secondName,
            image: me.image,
            biography: me.biography,
          },
        ],
      },
    })
      .then((res) => {
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
            discussionId: res.data.discussionId,
            message: {
              isPicture: bool,
              content: value,
              image: img,
              sender: {
                userId: me.userId,
                fullName: `${me.firstName} ${me.secondName}`,
              },
            },
          },
        })
          .then((res) => {
            setLoad("");
            socket.emit("send", {
              discussionId: res.data.discussionId,
              message: {
                isPicture: bool,
                pictureUrl: img,
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
            setLoad("failure");
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
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
            placeholder="Start converse with this person"
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
                saveFile(e);
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
            if (value.length || file.name) {
              setLoad("sending...");
              axiosPost();
            }
          }}
        >
          {load !== "" ? (
            load
          ) : (
            <MdOutlineContactMail size="15px" color="#F5F5F5" />
          )}
        </button>
      </div>
    </div>
  );
}

{
  /* <div>
        <EmojiPicker
          onEmojiClick={(e) => {
            setValue(value + e.emoji);
          }}
          width={"600px"}
        />
      </div> */
}
