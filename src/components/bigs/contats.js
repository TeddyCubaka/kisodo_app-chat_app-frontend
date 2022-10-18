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
                            discussionId={cont.membres ? cont._id : null}
                        />
                    ))
                ) : allMember.length === 0 ? (
                    <div className="block_with_loader">
                        <div className="big_loader"> {allMember[0]} </div>
                    </div>
                ) : (
                    <div className="block_with_loader">
                        <div className="loader"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
