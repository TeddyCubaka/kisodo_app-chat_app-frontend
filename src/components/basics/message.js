import React from "react";

export default function Message({ position, content, date, bulle, state }) {
    return (
        <div className={`message ${position}`}>
            <div className={`${bulle} msg_bulle`}>
                <div className="content">{content}</div>
                <span className={`${state} smaller`}>
                    {" "}
                    {/* {state == "msg_loader" ? false : "ok"}{" "} */}
                </span>
            </div>
            <div className="smaller"> {date} </div>
        </div>
    );
}
