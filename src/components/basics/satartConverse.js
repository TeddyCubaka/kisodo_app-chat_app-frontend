import React, { useContext, useState } from "react";
import { MdOutlineContactMail } from "react-icons/md";
import { AiOutlineCamera } from "react-icons/ai";
import discussionContext from "../../contexts/discussion";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";

export default function StartConverse() {
  const { actualDiscussion, freind, me } = useContext(discussionContext);
  const [value, setValue] = useState("");
  return (
    <div className="text_zone">
      <div>
        {/* <EmojiPicker
          onEmojiClick={(e) => {
            setValue(value + e.emoji);
          }}
          width={"600px"}
        /> */}
      </div>
      <div className="text_input">
        <textarea
          spellCheck="true"
          placeholder="Start converse with this person"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        ></textarea>
        <div>
          <AiOutlineCamera size="30px" />
        </div>
      </div>
      <button
        onClick={() => {
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
              },
            })
              .then((res) => console.log(res.data))
              .catch((err) => console.log(err));
          } else {
            console.log("nan");
          }
        }}
      >
        <MdOutlineContactMail />
      </button>
    </div>
  );
}

//     if (!actualDiscussion.userId) {
//         axios({
//             method: "post",
//             url: "process.env.REACT_APP_SERVER_LINK_DEV/api/discussion/",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization:
//                     "Bearer " + localStorage.getItem("token"),
//             },
//             data: {
//                 isGroup: false,
//                 membres: [
//                     {
//                         userId: freind.userId,
//                         fullName: freind.fullName,
//                         image: freind.image,
//                         biography: freind.biography,
//                     },
//                     {
//                         userId: me.userId,
//                         fullName:
//                             me.firstName + " " + me.secondName,
//                         image: me.image,
//                         biography: me.biography,
//                     },
//                 ],
//             },
//         })
//             .then((res) => console.log(res))
//             .catch((err) => console.log(err));
//     }
