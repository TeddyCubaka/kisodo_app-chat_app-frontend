import React, { useEffect, useState } from "react";

export default function DisplayerImage(urls) {
  const [url, setUrl] = useState([]);

  useEffect(() => {
    setUrl(urls.urls);
  }, [urls]);

  return (
    <div className="image-card">
      {url.length < 1 ? (
        ""
      ) : (
        <div className="displayer_image">
          <button
            onClick={() => {
              setUrl([]);
            }}
          >
            X
          </button>
          <div className="images">
            {url.map((url) => (
              <div className="image_message" key={url}>
                <img src={url} alt="" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
