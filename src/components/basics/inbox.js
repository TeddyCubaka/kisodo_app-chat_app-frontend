import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import discussionContext from "../../contexts/discussion";

export default function Inbox() {
    const { setAllMember, userInbox } = useContext(discussionContext);
    const [members, setMembers] = useState([]);
    return (
        <button
            className="nav_btn"
            onClick={() => {
                setAllMember(userInbox);
            }}
        >
            <h3>Inbox</h3>
        </button>
    );
}
