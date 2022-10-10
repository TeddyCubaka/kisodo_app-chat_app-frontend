import React, { useEffect, useState } from "react";
import Contact from "../basics/contact";

export default function Home (){
    const [contact, setContact] = useState([])
    useEffect(()=>{
        fetch('http://localhost:3000/api/user')
            .then(data => data.json()
                .then(res => setContact(res))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="home radius">
            <h3>Recent</h3>
            {
                contact.length > 1 ? 
                contact.map((cont)=>(
                    <Contact name={`${cont.firstName} ${cont.secondName}`} message={false} />
                ))
                : <div>No contact here</div>
            }
        </div>
    )
}