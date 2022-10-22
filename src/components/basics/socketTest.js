import React, { useState, useEffect } from "react";
import io from "socket.io-client";


export default function SocketTest() {
    const socket = io(process.env.REACT_APP_SERVER_LINK_DEV);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);

    useEffect(() => {
        socket.on("connect", (socket)=>{
            console.log("connected")
            setIsConnected(true)
        })
        // socket.on("onLine", (socket)=>{
        //     console.log(socket)
        // })
        socket.on("discussion", (disc)=>{
            console.log(disc)
        })
        
    }, []);

    const sendPing = () => {
        socket.emit("message", {
            message : "That's me, my nigga"
        });
    };

    return (
        <div>
            <p>Connected: {"  " + isConnected}</p>
            <p>Last pong: {lastPong || "-"}</p>
            <button onClick={sendPing}>Send ping</button>
        </div>
    );
}
