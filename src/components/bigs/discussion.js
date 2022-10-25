import React, { useContext } from 'react'
import discussionContext from '../../contexts/discussion'
import DiscutInfo from '../basics/discutInfo'
import DiscutMessages from '../basics/discutMessages'
import StartConverse from '../basics/satartConverse'
import TextZone from '../basics/textZone'

export default function Discussion() {
  const { actualDiscussion } = useContext(discussionContext)
  return (
    <div className="discussion radius margin bloc_with_shaddow">
      <DiscutInfo />
      <DiscutMessages />
      {actualDiscussion.discussionId ? <TextZone /> : <StartConverse />}
    </div>
  )
}
