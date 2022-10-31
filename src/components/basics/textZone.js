import axios from "axios";
import React, { useContext, useState } from "react";
import { AiOutlineCamera, AiOutlineSend } from "react-icons/ai";
import discussionContext from "../../contexts/discussion";
import { socket } from "../bigs/home";

export default function TextZone() {
  const { me, setDiscut, actualDiscussion } = useContext(discussionContext);
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
          if (actualDiscussion.discussionId && value !== "") {
            setDiscut({
              content: value,
              date: new Date().toLocaleDateString(),
              send: true,
            });
            socket.emit("send", {
              discussionId: actualDiscussion.discussionId,
              message: {
                content: value,
                sender: {
                  userId: me.userId,
                  fullName: `${me.firstName} ${me.secondName}`,
                },
              },
            });

            // axios({
            //   method: "post",
            //   url:
            //     process.env.REACT_APP_SERVER_LINK_DEV +
            //     "/api/discussion/add_message",
            //   headers: {
            //     "Content-Type": "application/json",
            //     Authorization: "Bearer " + localStorage.getItem("token"),
            //   },
            //   data: {
            //     discussionId: actualDiscussion.discussionId,
            //     message: {
            //       content: value,
            //       sender: {
            //         userId: me.userId,
            //         fullName: `${me.firstName} ${me.secondName}`,
            //       },
            //     },
            //   },
            // })
            //   .then((res) => {
            //     setDiscut({
            //       content: value,
            //       date: new Date().toLocaleDateString(),
            //       send: true,
            //     });
            //     setTimeout(() => {
            //       setDiscut({});
            //     }, 500);

            //   })
            //   .catch((err) => {
            //     setDiscut({
            //       content: value,
            //       date: new Date().toLocaleDateString(),
            //       send: "failure",
            //     });
            //     console.log(err);
            //   });
          }
          if (value !== "") {
          }

          setValue("");
        }}
      >
        <AiOutlineSend />
      </button>
    </div>
  );
}

// axios({
//   method: "post",
//   url:
//     process.env.REACT_APP_SERVER_LINK_DEV +
//     "/api/user/inbox/" +
//     localStorage.getItem("userId"),
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + localStorage.getItem("token"),
//   },
//   data: {
//     data: {
//       discussion_id: discussionId,
//       users: [
//         {
//           userId: data.membres[0]._id,
//           fullName: name,
//           image: null,
//           isOnline: false,
//           biography: null,
//         },
//         {
//           userId: me.userId,
//           fullName: me.firstName + me.secondName,
//           image: null,
//           isOnline: false,
//           biography: null,
//         },
//       ],
//     },
//   },
// })
//   .then((res) => console.log(res.data))
//   .catch((err) => console.log(err));
