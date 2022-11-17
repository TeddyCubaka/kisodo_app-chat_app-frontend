import React, { useContext, useEffect, useState } from "react";
import avatar from "../../images/avatar.png";
import { TbPoint } from "react-icons/tb";
import { MdEdit } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import discussionContext from "../../contexts/discussion";

export default function User(me) {
  const { allMember } = useContext(discussionContext);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [newAvatar, setAvatar] = useState("");
  const [names, setNames] = useState({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (allMember.length === 0) return;
    let counter = 0;
    allMember.map((contact) => {
      if (!contact.messages) return;
      counter = counter + contact.messages.length;
    });
    setCount(counter);
  }, [allMember]);

  useEffect(() => {
    setNames(me.me);
    setAvatar(me.me.image ? me.me.image : avatar);
  }, [me]);
  const ModifyProfile = () => {
    const [state, setState] = useState(false);
    const [newMe, setNewMe] = useState({});
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
          Nombre des contacts : <strong> {allMember.length} </strong>{" "}
        </div>
        <div>
          Nombre des messages : <strong> {count} </strong>{" "}
        </div>
      </div>
    ) : (
      <form className="form_profile margin_x-20">
        <button
          onClick={() => {
            setState(false);
          }}
        >
          {" "}
          <IoMdArrowRoundBack size="20px" />{" "}
        </button>
        <label>Nom</label>
        <input
          type="text"
          placeholder={names.firstName}
          onChange={(e) => {
            setNewMe({ ...newMe, firstName: e.target.value });
          }}
        />
        <label>Post-nom</label>
        <input
          type="text"
          placeholder={names.secondName}
          onChange={(e) => {
            setNewMe({ ...newMe, secondName: e.target.value });
          }}
        />
        <label>Bio</label>
        <input
          type="text"
          placeholder={names.biography}
          onChange={(e) => {
            setNewMe({ ...newMe, biography: e.target.value });
          }}
        />
        <button
          type="button"
          onClick={() => {
            axios({
              method: "post",
              url:
                process.env.REACT_APP_SERVER_LINK_DEV +
                "/api/user/" +
                names.userId,
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              data: newMe,
            })
              .then((res) => {
                console.log(res.data);
                if (newMe.firstName)
                  setNames({ ...names, firstName: newMe.firstName });
                if (newMe.secondName)
                  setNames({ ...names, secondName: newMe.secondName });
                if (newMe.biography)
                  setNames({ ...names, biography: newMe.biography });
                setState(false);
              })
              .catch((err) => console.log(err));
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
          className="close_button"
          onClick={() => {
            setUpdateProfile(false);
          }}
        >
          <GrClose size="25px" />
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
                      const formData = new FormData();
                      formData.append("file", e.target.files[0]);
                      formData.append("upload_preset", "chat_app_memory");
                      axios
                        .post(
                          "https://api.cloudinary.com/v1_1/di64z9yxk/image/upload",
                          formData
                        )
                        .then((res) => {
                          axios({
                            method: "post",
                            url:
                              process.env.REACT_APP_SERVER_LINK_DEV +
                              "/api/user/" +
                              names.userId,
                            headers: {
                              "Content-Type": "application/json",
                              Authorization:
                                "Bearer " + localStorage.getItem("token"),
                            },
                            data: { image: res.data.secure_url },
                          })
                            .then((res) => console.log(res.data))
                            .catch((err) => console.log(err));
                        })
                        .catch((err) => console.log(err));
                    } else {
                      alert("nope");
                    }
                  }}
                />
                <MdEdit size="30px" color="#0142c4" />
              </div>
              <div className="strongest">
                {names.firstName} {names.secondName}{" "}
              </div>
              <div className="small text_center"> {names.biography} </div>
            </div>
          </div>
          <ModifyProfile />
        </div>
      </div>
    </div>
  ) : (
    <div className="user_card">
      <div
        className="margin_x-10 content_center img_card"
        onClick={() => {
          setUpdateProfile(true);
        }}
      >
        <img src={newAvatar} alt="" />
      </div>
      <div className="small">
        {" "}
        {names.firstName} {names.secondName}{" "}
      </div>
    </div>
  );
}
