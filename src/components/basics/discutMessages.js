import React, { useRef } from "react";
import Message from "./message";

export default function DiscutMessages() {
  const divRef = useRef(null);

  return (
    <div className="discut_msg" ref={divRef}>
      <Message />
      <Message />
    </div>
  );
}
