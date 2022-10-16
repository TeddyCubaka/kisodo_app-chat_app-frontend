import React, { useState, useContext } from "react";
import discussionContext from "../../contexts/discussion";
import Message from "./message";

export default function DiscutMessages() {
    let { freind, discut } = useContext(discussionContext);
    const [messages, setMessages] = useState([]);
    // useEffect(() => {
    //     axios({
    //         method: "get",
    //         url: "http://localhost:3000/api/discussion",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer " + localStorage.getItem("token"),
    //         },
    //     })
    //         .then((data) => console.log(data))
    //         .catch((err) => console.error(err));
    // }, []);

    return (
        <div className="discut_msg">
            {messages.length > 1 ? (
                messages.map((data, index) => (
                    <Message
                        key={data.id ? data.id : index}
                        bulle={
                            data.sender
                                ? data.sender.userId === freind.userId
                                    ? "message_left"
                                    : "message_right"
                                : ""
                        }
                        position={
                            data.sender
                                ? data.sender.userId === freind.userId
                                    ? "flex_start-r"
                                    : "flex_end-r"
                                : ""
                        }
                        content={data.content}
                        date={data.sendDate}
                    />
                ))
            ) : (
                <div>No message here</div>
            )}
            {discut.content ? (
                <Message
                    key={1}
                    bulle={"message_right"}
                    position={"flex_end-r"}
                    content={discut.content}
                    date={discut.date}
                    state={
                        discut.send === false
                            ? "msg_loader"
                            : discut.send === "failure"
                            ? "failure"
                            : null
                    }
                />
            ) : (
                <div>No message in the array discut</div>
            )}
        </div>
    );
}
