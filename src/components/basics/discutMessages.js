import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import discussionContext from "../../contexts/discussion";
import Message from "./message";

export default function DiscutMessages() {
    let {
        freind,
        discut,
        actualDiscussion,
        setLoading,
        loading,
        messages,
        setMessages,
    } = useContext(discussionContext);
    const [text, setText] = useState(" ");
    useEffect(() => {
        if (actualDiscussion.discussionId) {
            axios({
                method: "get",
                url:
                    "http://localhost:3000/api/discussion/" +
                    actualDiscussion.discussionId,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
                .then((res) => {
                    setMessages(res.data.messages);
                    setLoading("null");
                    if (res.data.messages.length === 0) setText("Empty");
                })
                .catch((err) => {
                    console.log(err);
                    setLoading("failure");
                });
        }
    }, [actualDiscussion]);

    return (
        <div className="discut_msg">
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
                            : "msg_sended"
                    }
                />
            ) : (
                <div className=""></div>
            )}
            {messages.length > 0 ? (
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
            ) : messages.length === 0 ? (
                <div className="weit_msg">
                    <div className={loading}>
                        {" "}
                        {loading === "null" ? text : false}{" "}
                    </div>
                </div>
            ) : (
                <div className="weit_msg">
                    <div>Empty</div>
                </div>
            )}
        </div>
    );
}
