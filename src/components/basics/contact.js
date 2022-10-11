import React, { useContext } from "react";
import discussionContext from "../../contexts/discussion";

export default function Contact({ name, message, image, data, array, index }) {
  const { setFreind, setMe } = useContext(discussionContext);

  return (
    <div
      className="contact_card"
      onClick={() => {
        const obj = {
          userId: data._id,
          fullName: `${data.firstName} ${data.secondName}`,
          image: data.image,
          biography: data.biography,
        };
        setFreind(obj);
        if (index == 1) {
          setMe({
            userId: array[0]._id,
            fullName: `${array[0].firstName} ${array[0].secondName}`,
            image: array[0].image,
            biography: array[0].biography,
          });
        } else {
          setMe({
            userId: array[1]._id,
            fullName: `${array[1].firstName} ${array[1].secondName}`,
            image: array[1].image,
            biography: array[1].biography,
          });
        }
      }}
    >
      <div className="margin_x-10 content_center img_card">
        {image ? (
          <img src={image} alt={`Image de ${name}`} />
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
