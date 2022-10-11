import React from "react";
import DiscutInfo from "../basics/discutInfo";
import DiscutMessages from "../basics/discutMessages";
import TextZone from "../basics/textZone"

export default function Discussion (){
    return (
        <div className="discussion radius margin bloc_with_shaddow">
            <DiscutInfo />
            <DiscutMessages />
            <TextZone />
        </div>
    )
}