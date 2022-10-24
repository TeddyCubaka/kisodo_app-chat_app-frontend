import React from "react";
import Contacts from "./contats";
import Discussion from "./discussion";
import Navigation from "./navigation";
import Search from "./search";
import io from "socket.io-client";


export let socket = localStorage.getItem("token") !== "" ? (io("http://localhost:4000")) : "shesh"
// if(localStorage.getItem("token") !== ""){
//      socket =  (io("http://localhost:4000"))
//      console.log(socket)
//     }

export default function Home() {
    return (
        <div className="App">
            <Navigation />
            <div className="margin home">
                <Search />
                <Contacts />
            </div>
            <Discussion />
        </div>
    );
}
