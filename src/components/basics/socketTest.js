import React, { useState } from "react";
import { io } from "socket.io-client";

const SocketTest = () => {
    const [time, setTime] = useState("fetching");
    React.useEffect(() => {
        const socket = io("http://localhost:3000");
        socket.emit("message", "hello from frontend")
    }, []);
    return <div className="App">{time}</div>;
};
export default SocketTest;
