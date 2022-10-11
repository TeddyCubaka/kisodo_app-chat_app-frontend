import React from "react";

export default function Message ({ position, content, date, bulle }){
    return (
        <div className={`message ${position}`}
        onClick={()=>{
            console.log(date)
        }}
        >
            <div className={bulle}  > {content} </div>
            <div className="smaller"> {date} </div>
        </div>
    )
}