import React from 'react'
import PropTypes from 'prop-types'

export default function Message({
  position,
  content,
  date,
  bulle,
  state,
  data,
}) {
  return (
    <div
      className={`message ${position}`}
      onClick={() => {
        console.log(data)
      }}
    >
      <div className={`${bulle} msg_bulle`}>
        <div className="content">{content}</div>
        <span className={`${state} smaller`}>
          {' '}
          {state == 'msg_sended' ? 'ok' : false}{' '}
          {state == 'failure' ? 'échec d&lsquoenvoie' : false}{' '}
        </span>
      </div>
      <div className="smaller"> {date} </div>
    </div>
  )
}

Message.propTypes = {
  name: PropTypes.string,
  position: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  bulle: PropTypes.string,
  state: PropTypes.string,
  data: PropTypes.string,
}
