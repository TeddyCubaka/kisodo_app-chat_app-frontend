import React, { useContext, useState } from "react";
import { AiOutlineCamera, AiOutlineSend } from "react-icons/ai";
import discussionContext from "../../contexts/discussion";
import axios from "axios";

export default function TextZone() {
    const { discut, me, setDiscut } = useContext(discussionContext);
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
                        const message = [
                            {
                                content: value,
                                date: new Date().toLocaleDateString(),
                            },
                        ];
                        setDiscut(message);
                    }

                    setValue("");
                }}
            >
                <AiOutlineSend />
            </button>
        </div>
    );
}

// if (!actualDiscussion._id) {
//     axios({
//         method: "post",
//         url: "http://localhost:3000/api/discussion/",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization:
//                 "Bearer " + localStorage.getItem("token"),
//         },
//         data: {
//             isGroup: false,
//             membres: [
//                 {
//                     userId: freind.userId,
//                     fullName: freind.fullName,
//                     image: freind.image,
//                     biography: freind.biography,
//                 },
//                 {
//                     userId: me.userId,
//                     fullName:
//                         me.firstName + " " + me.secondName,
//                     image: me.image,
//                     biography: me.biography,
//                 },
//             ],
//         },
//     })
//         .then((res) => console.log(res))
//         .catch((err) => console.log(err));
// }
//     axios({
//         method: "post",
//         url: "http://localhost:3000/api/discussion/add_message",
//         data: {
//             discussionId: actualDiscussion.discussionId,
//             message: {
//                 content: value,
//                 sender: me,
//             },
//         },
//     })
//         .then((res) => console.log(res))
//         .catch((err) => console.log(err));
