import React, { useContext, useState } from "react";
import { AiOutlineCamera, AiOutlineSend } from "react-icons/ai";
import discussionContext from "../../contexts/discussion";

export default function TextZone() {
  const { discut, freind } = useContext(discussionContext);
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
            const message = {
              content: value,
              isPicture: false,
              delete: false,
              vue: false,
              sendDate: new Date().toLocaleString(),
            };
            message.sender = freind;
            discut.push(message);
            setValue("");
            console.log(discut);
          }
        }}
      >
        <AiOutlineSend />
      </button>
    </div>
  );
}