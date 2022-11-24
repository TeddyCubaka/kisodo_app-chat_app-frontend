import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import discussionContext from "../../contexts/discussion";
import { CgCommunity } from "react-icons/cg";

export default function AllMemberButton({ members }) {
  const { setAllMember, allMember } = useContext(discussionContext);

  return (
    <button
      className={`nav_btn ${
        allMember.length
          ? allMember[0].membres
            ? " "
            : "current_nav_btn"
          : " "
      }`}
      onClick={() => {
        setAllMember(members);
      }}
    >
      <CgCommunity size="25px" color="white" />
    </button>
  );
}

AllMemberButton.propTypes = {
  members: PropTypes.array,
};
