import React from "react";
import DiscutInfo from "../basics/discutInfo";
import TextZone from "../basics/textZone"

export default function Discussion (){
    return (
        <div className="discussion radius margin">
            <DiscutInfo />
            <div></div>
            <TextZone />
        </div>
    )
}