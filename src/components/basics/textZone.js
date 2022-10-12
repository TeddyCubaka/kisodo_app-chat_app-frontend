import React, { useContext, useState } from "react";
import { AiOutlineCamera, AiOutlineSend } from "react-icons/ai";
import discussionContext from "../../contexts/discussion";
import axios from "axios";

export default function TextZone() {
  const { discut, me } = useContext(discussionContext);
  const [value, setValue] = useState("");

  return (
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
          <AiOutlineCamera size="30px" />
        </div>
      </div>
      <button
        onClick={() => {
          if (value !== "") {
            JSON.stringify(me);
            const message = {};
            discut.push(message);
            const mess = JSON.stringify(message);
            console.log(mess);
            axios({
              method: "post",
              url: "http://localhost:3000/api/message",
              data: {
                "content": value,
                "isPicture": false,
                "delete": false,
                "vue": false,
                "sendDate": "",
                "sender": me,
              },
            })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }
          setValue("");
        }}
      >
        <AiOutlineSend />
      </button>
    </div>
  );
}
