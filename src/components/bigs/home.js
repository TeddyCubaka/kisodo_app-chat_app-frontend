import React, { useEffect } from "react";
import { json } from "react-router-dom";
import Contact from "../basics/contact";

export default function Home (){
    useEffect(()=>{
        fetch('http://localhost:3000/api/user')
            .then(data => data.json()
                .then(res => console.log(res))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="home radius">
            <h3>Recent</h3>
            <Contact />
        </div>
    )
}