import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import discussionContext from "../../contexts/discussion";
import AllMemberButton from "../basics/allMemberBtn";
import Inbox from "../basics/inbox";

export default function Navigation() {
    const { me, setMe, setUserInbox } = useContext(discussionContext);
    const [userId] = useState(localStorage.getItem("userId"));
    useEffect(() => {
        axios({
            method: "get",
            url:
                "http://localhost:3000/api/user/" +
                localStorage.getItem("userId"),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                setMe(res.data);
                setUserInbox(res.data.inbox);
            })
            .catch((err) => console.log(err));
    }, [userId, setMe]);
    return (
        <div className="navbarre radius margin">
            <div className="margin_x-10 content_center img_card">
                <img
                    src="https://cdn1.iconfinder.com/data/icons/circle-flats/170/contacts-512.png"
                    alt=""
                />
            </div>
            <div>
                {" "}
                {me.firstName} {me.secondName}{" "}
            </div>
            <div className="nav_list">
                <AllMemberButton />
                <Inbox />
            </div>
        </div>
    );
}
