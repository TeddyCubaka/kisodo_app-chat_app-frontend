import React from "react";
import Message from "./message";

export default function DiscutMessages() {

  return (
    <div className="discut_msg">
        <Message bulle={"message_right"} position={"flex_end-r"} />
        <Message bulle={"message_left"} position={"flex_start-r"} />
    </div>
  );
}
