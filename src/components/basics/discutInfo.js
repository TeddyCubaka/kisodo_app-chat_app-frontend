import React, { useContext } from "react";
import discussionContext from "../../contexts/discussion";
import avatar from "../../images/avatar.png";

export default function DiscutInfo() {
  const { freind } = useContext(discussionContext);
  return (
    <div className="discut_info">
      <div className="img_card">
        <img src={avatar} alt="" />
      </div>
      <div className="margin_x-10 content_center width-max">
        <div className="strong">
          {" "}
          {freind.fullName ? freind.fullName : "Freind name"}{" "}
        </div>
        <div className="small">Online</div>
        <div className="small"> {freind.biography} </div>
      </div>
    </div>
  );
}
