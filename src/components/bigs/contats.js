import React, { useContext } from "react";
import discussionContext from "../../contexts/discussion";
import Contact from "../basics/contact";

export default function Contacts() {
    const { discut, allMember } = useContext(discussionContext);

    return (
        <div className=" radius bloc_with_shaddow">
            <div className="first_block strongest">Recent</div>
            <div className="contacts radius">
                {allMember.length > 0 ? (
                    allMember.map((cont, index) => (
                        <Contact
                            name={
                                cont.membres
                                    ? cont.membres[0].fullName
                                    : `${cont.firstName} ${cont.secondName}`
                            }
                            message={
                                discut.length
                                    ? discut[discut.length - 1]
                                    : false
                            }
                            data={cont}
                            index={index}
                            array={allMember}
                            key={cont._id}
                        />
                    ))
                ) : allMember.length === 0 ? (
                    <div className="img_card">
                        <img
                            className=""
                            src="https://image.shutterstock.com/image-vector/file-delete-260nw-686125981.jpg"
                            alt=""
                        />
                    </div>
                ) : (
                    <div className="loader"></div>
                )}
            </div>
        </div>
    );
}
