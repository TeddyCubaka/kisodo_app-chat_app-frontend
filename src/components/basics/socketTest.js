import React, { useState, useEffect, useContext } from "react";
import discussionContext from "../../contexts/discussion";
import { socket } from "../bigs/home";

export default function SocketTest() {
  const [arr, setArr] = useState([]);
  const [msg, setMsg] = useState("");
  const { me } = useContext(discussionContext);

  useEffect(() => {
    socket.on("discussion", (message) => {
      // setArr(message);
      console.log(message);
    });
  }, []);

  return (
    <div>
      {/* <div className="flex_start-r">
                {arr.length > 0 ? (
                    arr.map((txt, index) => (
                        <span key={index}> {txt.message || txt.usersId} </span>
                    ))
                ) : (
                    <span>Empty</span>
                )}
            </div> */}
      <input
        type="text"
        onChange={(e) => {
          setMsg(e.target.value);
        }}
      />
      <button
        onClick={() => {
          socket.emit("message", {
            message: me,
          });
        }}
      >
        Send ping
      </button>
    </div>
  );
}
