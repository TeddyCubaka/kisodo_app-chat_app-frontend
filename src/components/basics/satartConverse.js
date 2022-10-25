import React, { useContext } from 'react'
import { MdOutlineContactMail } from 'react-icons/md'
import { AiOutlineCamera } from 'react-icons/ai'
import discussionContext from '../../contexts/discussion'
import axios from 'axios'

export default function StartConverse() {
  const { actualDiscussion, freind, me } = useContext(discussionContext)
  return (
    <div className="text_zone">
      <div className="text_input">
        <textarea
          spellCheck="true"
          placeholder="Start converse with this person"
        ></textarea>
        <div>
          <AiOutlineCamera size="30px" />
        </div>
      </div>
      <button
        onClick={() => {
          if (prompt('sure ?', 'oui')) {
            axios({
              method: 'post',
              url: process.env.REACT_APP_SERVER_LINK_DEV + '/api/discussion/',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
              data: {
                isGroup: false,
                membres: [
                  {
                    userId: freind.userId,
                    fullName: freind.fullName,
                    image: freind.image,
                    biography: freind.biography,
                  },
                  {
                    userId: me.userId,
                    fullName: me.firstName + ' ' + me.secondName,
                    image: me.image,
                    biography: me.biography,
                  },
                ],
              },
            })
              .then((res) => console.log(res.data))
              .catch((err) => console.log(err))
          } else {
            console.log('nan')
          }
        }}
      >
        <MdOutlineContactMail />
      </button>
    </div>
  )
}

//     if (!actualDiscussion.userId) {
//         axios({
//             method: "post",
//             url: "process.env.REACT_APP_SERVER_LINK_DEV/api/discussion/",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization:
//                     "Bearer " + localStorage.getItem("token"),
//             },
//             data: {
//                 isGroup: false,
//                 membres: [
//                     {
//                         userId: freind.userId,
//                         fullName: freind.fullName,
//                         image: freind.image,
//                         biography: freind.biography,
//                     },
//                     {
//                         userId: me.userId,
//                         fullName:
//                             me.firstName + " " + me.secondName,
//                         image: me.image,
//                         biography: me.biography,
//                     },
//                 ],
//             },
//         })
//             .then((res) => console.log(res))
//             .catch((err) => console.log(err));
//     }
