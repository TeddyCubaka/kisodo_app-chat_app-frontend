import React, { useContext, useEffect } from "react";
import discussionContext from "../../contexts/discussion";
import { GoCommentDiscussion } from "react-icons/go";

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
      <GoCommentDiscussion size="25px" color="white" />
    </button>
  );
}
