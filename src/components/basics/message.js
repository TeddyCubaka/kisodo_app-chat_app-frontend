import React from "react";

export default function Message({ position, content, date, bulle, state }) {
    return (
        <div className={`message ${position}`}>
            <div className={bulle}>
                {content}
                <span className="msg_loader"></span>
            </div>
            <div className="smaller"> {date} </div>
        </div>
    );
}
