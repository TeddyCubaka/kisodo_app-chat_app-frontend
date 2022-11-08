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
  const [file, setFile] = useState({});

  const axiosPost = (isPicture, imgUrl) => {
    const bool = isPicture == false ? false : true;
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
          isPicture: true,
          pictureUrl: imgUrl,
          content: value,
          sender: {
            userId: me.userId,
            fullName: `${me.firstName} ${me.secondName}`,
          },
        },
      },
    })
      .then(() => {
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
  };

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadPicture = async () => {
    if (file.name) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "chat_app_memory");
      await axios
        .post(
          "https://api.cloudinary.com/v1_1/di64z9yxk/image/upload",
          formData
        )
        .then((res) => {
          axiosPost(true, res.data.secure_url);
        })
        .catch((err) => console.log(err));
    }
    axiosPost(false);
  };

  const sendMessage = () => {
    if (file.constructor === Object) {
      console.log("envoie du message : ", value);
      axiosPost(false);
    }
    console.log("envoie de l'image : ", file);
    uploadPicture();
  };

  useEffect(() => {
    if (file.name) {
      const imagesUrls = [];
      imagesUrls.push(URL.createObjectURL(file));
      setUrls(imagesUrls);
    }
  }, [file]);

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
            files
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
                saveFile(e);
              }}
            />
            <AiOutlineCamera size="20px" />
          </div>
        </div>
        {/* <button onClick={sendMessage}>Upload image</button> */}
        <button
          className="send_button small_radius"
          onClick={() => {
            if (actualDiscussion.discussionId && value !== "") {
              setDiscut({});
              sendMessage();
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
