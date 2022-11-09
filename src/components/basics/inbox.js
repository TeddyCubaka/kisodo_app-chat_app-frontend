import React, { useContext, useEffect } from "react";
import discussionContext from "../../contexts/discussion";

export default function Inbox() {
  const { setAllMember, userInbox, allMember } = useContext(discussionContext);
  return (
    <button
      className={`nav_btn ${
        allMember.length
          ? allMember[0].membres
            ? "current_nav_btn"
            : " "
          : " "
      }`}
      onClick={() => {
        setAllMember(userInbox);
      }}
    >
      <h3>Inbox</h3>
    </button>
  );
}
