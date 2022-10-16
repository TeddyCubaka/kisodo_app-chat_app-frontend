import React from "react";
import { MdOutlineContactMail } from "react-icons/md";
import { AiOutlineCamera } from "react-icons/ai";

export default function StartConverse() {
    return (
        <div>
            <div className="text_input">
                <textarea
                    spellCheck="true"
                    value={"start converse xith him"}
                ></textarea>
                <div>
                    <AiOutlineCamera size="30px" />
                </div>
            </div>
            <button>
                <MdOutlineContactMail />
            </button>
        </div>
    );
}
