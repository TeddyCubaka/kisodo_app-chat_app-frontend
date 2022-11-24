import React, { useContext, useEffect } from "react";
import discussionContext from "../../contexts/discussion";
import { GoCommentDiscussion } from "react-icons/go";
import PropTypes from "prop-types";
export default function Inbox({ members }) {
  const { setAllMember, userInbox, allMember, setUserInbox } =
    useContext(discussionContext);

  const transmission = () => {
    let array = userInbox;
    array.map((disc, index) => {
      let arr = disc.membres.map((cont, index) => {
        let a = members.find((user) => {
          return user._id === cont.userId;
        });
        cont.image = a.image;
        if (cont.userId !== localStorage.getItem("userId")) return cont;
        return;
      });
      disc.membres = arr.filter((cont) => {
        if (cont !== undefined) return cont;
      });
    });
    array = array.filter((dis) => {
      if (dis.membres.length !== 0) return dis;
    });
    setAllMember(array);
  };

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
        transmission();
        // setAllMember(userInbox);
      }}
    >
      <GoCommentDiscussion size="25px" color="white" />
    </button>
  );
}

Inbox.propTypes = {
  members: PropTypes.array,
};
