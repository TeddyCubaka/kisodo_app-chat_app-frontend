import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io();

export default function SocketTest() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);

    useEffect(() => {
        
    }, []);

    const sendPing = () => {
        socket.emit("ping");
    };

    return (
        <div>
            <p>Connected: {"" + isConnected}</p>
            <p>Last pong: {lastPong || "-"}</p>
            <button onClick={sendPing}>Send ping</button>
        </div>
    );
}
