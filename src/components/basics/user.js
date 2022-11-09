import React, { useState } from "react";
import { TbPoint } from "react-icons/tb";
import avatar from "../../images/avatar.png";
import { MdEdit } from "react-icons/md";

export default function User(me) {
  const [updateProfile, setUpdateProfile] = useState(false);
  const [newAvatar, setAvatar] = useState(me.me.image ? me.me.image : avatar);

  const ModifyProfile = () => {
    const [state, setState] = useState(false);
    return state === false ? (
      <div className="profile_static margin_x-10">
        <div className="strongest">
          Modifié le profile{" "}
          <button
            onClick={() => {
              setState(true);
            }}
          >
            <MdEdit />
          </button>
        </div>
        <div>
          Nombre des contacts : <strong>30</strong>{" "}
        </div>
        <div>
          Nombre des messages : <strong>6576</strong>{" "}
        </div>
      </div>
    ) : (
      <form className="form_profile margin_x-20">
        <label>Nom</label>
        <input type="text" value={me.me.firstName} />
        <label>Post-nom</label>
        <input type="text" value={me.me.secondName} />
        <label>Bio</label>
        <input type="text" value={me.me.biography} />
        <button
          onClick={() => {
            setState(false);
          }}
        >
          valider
        </button>
      </form>
    );
  };
  return updateProfile === true ? (
    <div>
      <div className="profile">
        <button
          onClick={() => {
            setUpdateProfile(false);
          }}
        >
          X
        </button>
        <div
          className="profile_form"
          onClick={() => {
            setUpdateProfile(true);
          }}
        >
          <div>
            <div className="margin_y-20_10 content_center big_img_card">
              <img src={newAvatar} alt="" />
              <div className="edit_photo">
                <input
                  type="file"
                  accept="image/*"
                  className="input_file"
                  onChange={(e) => {
                    if (prompt("changer la photo de profile ?", "oui")) {
                      setAvatar(URL.createObjectURL(e.target.files[0]));
                    } else {
                      alert("nope");
                    }
                  }}
                />
                <MdEdit size="30px" color="white" />
              </div>
              <div className="strongest">
                {me.me.firstName} {me.me.secondName}{" "}
              </div>
            </div>
            <div> {me.me.bio} </div>
          </div>
          <ModifyProfile />
        </div>
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
        <img src={newAvatar} alt="" />
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
