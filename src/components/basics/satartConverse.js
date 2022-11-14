import React, { useContext, useEffect, useState } from "react";
import { MdOutlineContactMail } from "react-icons/md";
import { AiOutlineCamera } from "react-icons/ai";
import discussionContext from "../../contexts/discussion";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";

export default function StartConverse() {
  const { actualDiscussion, freind, me } = useContext(discussionContext);
  const [value, setValue] = useState("");
  const [urls, setUrls] = useState([]);
  const [file, setFile] = useState({});
  const [load, setLoad] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (file.name) {
      const imagesUrls = [];
      imagesUrls.push(URL.createObjectURL(file));
      setUrls(imagesUrls);
    }
  }, [file]);

  const axiosPost = () => {
    if (prompt("sure ?", "oui")) {
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
          message: [
            {
              isPicture: bool,
              pictureUrl: imgUrl,
              content: value,
              sender: {
                userId: me.userId,
                fullName: `${me.firstName} ${me.secondName}`,
              },
            },
          ],
        },
      })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    } else {
      console.log("nan");
    }
  };

  const sendMessage = () => {};

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
              }}
            />
            <AiOutlineCamera size="20px" />
          </div>
        </div>
        <button
          className="send_button small_radius"
          onClick={() => {
            sendMessage();
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
