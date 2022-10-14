import React, { useContext } from "react";
import discussionContext from "../../contexts/discussion";

export default function Contact({ name, message, image, data }) {
    const { setFreind, setMe } = useContext(discussionContext);

    return (
        <div
            className="contact_card"
            onClick={() => {
                setFreind({
                    userId: data._id,
                    fullName: `${data.firstName} ${data.secondName}`,
                    image: data.image,
                    biography: data.biography,
                });
            }}
        >
            <div className="margin_x-10 content_center img_card">
                {image ? (
                    <img src={image} alt="" />
                ) : (
                    <img
                        src="https://cdn1.iconfinder.com/data/icons/circle-flats/170/contacts-512.png"
                        alt=""
                    />
                )}
            </div>
            <div className="contact_info">
                <div className="strong"> {name} </div>
                {message ? (
                    <div className="small">{message.message}</div>
                ) : (
                    <div className="small">No message here</div>
                )}
            </div>
        </div>
    );
}
