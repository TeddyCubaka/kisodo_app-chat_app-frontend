import React, { useContext, useEffect, useState } from "react";
import Contacts from "./contats";
import Discussion from "./discussion";
import Navigation from "./navigation";
import Search from "./search";
import io from "socket.io-client";
import discussionContext from "../../contexts/discussion";

export let socket =
  localStorage.getItem("token") !== ""
    ? io("http://localhost:4000")
    : "Not connect";

export default function Home() {
  const { me, setMe, usersOnline, setUsersOnline } =
    useContext(discussionContext);
  useEffect(() => {
    if (me.userId) {
      socket.emit("online", me);
      socket.on("userOnline", async (users) => {
        const findMe = await users.find((user) => {
          return user.userId === me.userId;
        });
        setMe({ ...me, onLine: true });
        setUsersOnline(users);
      });
    }
  }, [me.userId]);

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
