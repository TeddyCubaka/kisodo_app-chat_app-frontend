import React from "react";

export default function Message ({ position, bulle }){
    return (
        <div className={`message ${position}`}>
            <div className={`${bulle}`}  >Hello</div>
            <div className="small">data</div>
        </div>
    )
}