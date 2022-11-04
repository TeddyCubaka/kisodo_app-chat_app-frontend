import React, { useState } from "react";

export default function DisplayerImage(urls, state) {
  const [position, setPosition] = useState(state);
  return (
    <div className="image-card">
      <div className={position}>
        <button
          onClick={() => {
            setPosition("hide");
          }}
        >
          X
        </button>
        <div className="images">
          {urls.urls.map((url) => (
            <div className="image_message" key={url}>
              <img src={url} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
