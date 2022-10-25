import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import discussionContext from '../../contexts/discussion'

export default function AllMemberButton() {
  const { setAllMember } = useContext(discussionContext)
  const [members, setMembers] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: process.env.REACT_APP_SERVER_LINK_DEV + '/api/user',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((data) => {
        setMembers(data.data)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <button
      className="nav_btn"
      onClick={() => {
        setAllMember(members)
      }}
    >
      <h3>Member</h3>
    </button>
  )
}
