import React from "react";


export default function Contact ({name, message, image}){
    return (
        <div className="contact_card">
            <div className="contact_img">
                {image ? <img src={image} alt={`Image de ${name}`} />
                 : <img src="https://cdn1.iconfinder.com/data/icons/circle-flats/170/contacts-512.png" alt=""/>
                 }
            </div>
            <div className="contact_info">
                <div className="strong"> {name} </div>
                {message ? 
                <div className="small">{ message }</div>
                : <div className="small">No message here</div>
                }
            </div>
        </div>
    )
}