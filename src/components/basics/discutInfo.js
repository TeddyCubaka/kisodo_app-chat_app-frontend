import React, { useContext } from "react";
import discussionContext from "../../contexts/discussion";
import avatar from "../../images/avatar.png";
import { IoArrowBack } from "react-icons/io5";

export default function DiscutInfo() {
  const { freind, setPosition } = useContext(discussionContext);

  return (
    <div className="discut_info">
      <div
        onClick={() => {
          setPosition(-10);
        }}
        className="retour"
      >
        <IoArrowBack size="20px" />
      </div>
      <div className="img_card">
        <img src={freind.image ? freind.image : avatar} alt="" />
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
