import React, { useContext } from "react";
import discussionContext from "../../contexts/discussion";
import DiscutInfo from "../basics/discutInfo";
import DiscutMessages from "../basics/discutMessages";
import StartConverse from "../basics/satartConverse";
import TextZone from "../basics/textZone";

export default function Discussion() {
  const { actualDiscussion, allMember, freind, me, position } =
    useContext(discussionContext);
  return (
    <div
      className="discussion radius margin bloc_with_shaddow"
      style={{ display: position }}
    >
      {freind.userId ? (
        <>
          <DiscutInfo />
          <DiscutMessages member={allMember} />
          {actualDiscussion.discussionId ? <TextZone /> : <StartConverse />}
        </>
      ) : (
        <div className="choose_conversation_card">
          <h1>
            Welcome {me.firstName ? `${me.firstName} ${me.secondName}` : " "}{" "}
          </h1>
          <div className="image_d_accueil">
            <img
              src="https://i0.wp.com/blog.fastandfresh.fr/wp-content/uploads/2019/08/Conception-de-sites-web-page-daccueil.png?resize=989%2C640&ssl=1"
              alt="illustration d'accueil"
            />
          </div>
        </div>
      )}
    </div>
  );
}
