import React from "react";

export default function Message ({ position, bulle, content, date }){
    return (
        <div className={`message ${position}`}>
            <div className={`${bulle}`}  > {content} </div>
            <div className="small"> {date} </div>
        </div>
    )
}