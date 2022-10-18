import React, { useContext, useEffect, useState } from "react";
import Contacts from "./contats";
import Discussion from "./discussion";
import Navigation from "./navigation";
import Search from "./search";

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
