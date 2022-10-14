import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import discussionContext from "../../contexts/discussion";
import Contact from "../basics/contact";

export default function Contacts() {
    const { discut } = useContext(discussionContext);
    const [contact, setContact] = useState([]);
    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:3000/api/user",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((data) => {
                setContact(data.data);
            })
            .catch((err) => console.log(err));
        // axios({
        //     method: "get",
        //     url: "http://localhost:3000/api/discussion",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: "Bearer " + localStorage.getItem("token"),
        //     },
        // })
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log(err));
    }, []);

    return (
        <div className="contacts radius bloc_with_shaddow">
            <div className="first_block strongest">Recent</div>
            {contact.length > 1 ? (
                contact.map((cont, index) => (
                    <Contact
                        name={`${cont.firstName} ${cont.secondName}`}
                        message={
                            discut.length ? discut[discut.length - 1] : false
                        }
                        data={cont}
                        index={index}
                        array={contact}
                        key={cont._id}
                    />
                ))
            ) : (
                <div>No contact here</div>
            )}
        </div>
    );
}
