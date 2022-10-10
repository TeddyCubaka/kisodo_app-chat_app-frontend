import React from "react";
import { AiOutlineCamera, AiOutlineSend } from "react-icons/ai"


export default function TextZone (){
    return (
        <div className="text_zone">
            <div className="text_input">
                <textarea spellcheck="true"></textarea>
                <div>
                    <AiOutlineCamera />
                </div>
            </div>
            <button>
                <AiOutlineSend />
            </button>
        </div>
    )
}