import React, { useState } from "react";
import { TbPoint } from "react-icons/tb";
import avatar from "../../images/avatar.png";

export default function User(me) {
  const [updateProfile, setUpdateProfile] = useState(false);
  return updateProfile === true ? (
    <div
      onClick={() => {
        setUpdateProfile(false);
      }}
      className="absolute profile"
    >
      <div>
        {" "}
        {me.me.firstName} {me.me.secondName}{" "}
      </div>
    </div>
  ) : (
    <div>
      <div
        className="margin_x-10 content_center img_card"
        onClick={() => {
          setUpdateProfile(true);
        }}
      >
        <img src={avatar} alt="" />
        {me.me.onLine ? (
          <TbPoint size="15px" color="green" />
        ) : (
          <TbPoint size="15px" color="green" />
        )}
      </div>
      <div>
        {" "}
        {me.me.firstName} {me.me.secondName}{" "}
      </div>
    </div>
  );
}
