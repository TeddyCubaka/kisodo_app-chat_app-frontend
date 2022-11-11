import React, { useContext, useEffect } from "react";
import Contacts from "./contats";
import Discussion from "./discussion";
import Navigation from "./navigation";
import Search from "./search";
import io from "socket.io-client";
import discussionContext from "../../contexts/discussion";

export let socket =
  localStorage.getItem("token") !== "" ? io("http://localhost:4000") : "shesh";

export default function Home() {
  const { me } = useContext(discussionContext);
  useEffect(() => {
    if (me.userId) {
      socket.emit("online", me);
      socket.on("userOnline", (users) => {
        me.onLine = true;
      });
    }
  }, [me]);

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
