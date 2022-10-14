import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import discussionContext from "../../contexts/discussion";

export default function Navigation() {
    const { me, setMe } = useContext(discussionContext);
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
            .then((res) => setMe(res.data))
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
            <div>
                {" "}
                {me.inBox ? (
                    me.inBox.map((disc) => <div> {disc.name} </div>)
                ) : (
                    <div>No discussion</div>
                )}{" "}
            </div>
        </div>
    );
}
