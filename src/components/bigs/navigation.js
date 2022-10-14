import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import discussionContext from "../../contexts/discussion";
import AllMemberButton from "../basics/allMemberBtn";
import Inbox from "../basics/inbox";

export default function Navigation() {
    const { me, setMe, setUserInbox, setAllMember } =
        useContext(discussionContext);
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
                setUserInbox(res.data.inbox);
                setMe({
                    firstName: res.data.firstName,
                    secondName: res.data.secondName,
                    joinDate: res.data.joinDate,
                    userId: res.data._id,
                    biography: res.data.biography,
                });
                setAllMember(res.data.inbox);
            })
            .catch((err) => console.log(err));
        axios({
            method: "get",
            url: "http://localhost:3000/api/discussion/",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => setUserInbox(res.data))
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
                <Inbox />
                <AllMemberButton />
            </div>
        </div>
    );
}
