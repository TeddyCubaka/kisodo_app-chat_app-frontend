import React, { useContext, useEffect } from "react";
import discussionContext from "../../contexts/discussion";
import Contact from "../basics/contact";

export default function Contacts() {
  const { discut, allMember, me, userInbox, relations } =
    useContext(discussionContext);

  useEffect(() => {
    if (allMember.length === 0) return;
    if (userInbox.length === 0) return;
    allMember.map((disc, index) => {
      return (disc.lastMessage = userInbox[index].messages.at(-1).content);
    });
  }, [allMember]);

  return (
    <div className=" radius bloc_with_shaddow">
      <div className="first_block strongest">Recent</div>
      <div className="contacts radius">
        {allMember.length > 0 ? (
          allMember.map((cont, index) => (
            <Contact
              name={
                cont.membres
                  ? cont.membres[0].userId === me.userId
                    ? cont.membres[1].fullName
                    : cont.membres[0].fullName
                  : `${cont.firstName} ${cont.secondName}`
              }
              message={userInbox[index].messages.at(-1).content}
              data={cont}
              index={index}
              array={allMember}
              image={
                cont.image
                  ? cont.image
                  : relations[index][0].image
                  ? relations[index][0].image
                  : ""
              }
              key={cont._id ? cont._id : cont.userId}
              discussionId={cont.membres ? cont._id : null}
            />
          ))
        ) : allMember.length === 0 ? (
          <div className="block_with_loader">
            <div className=""> Empty </div>
          </div>
        ) : (
          <div className="block_with_loader">
            <div className="big_loader"></div>
          </div>
        )}
      </div>
    </div>
  );
}
