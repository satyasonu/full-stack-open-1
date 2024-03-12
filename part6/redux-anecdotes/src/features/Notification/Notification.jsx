import React from 'react'

const Notification = ({data}) => {
  return (
    <div style={{border: `2px solid  ${data.color !== '' ? data.color : '' }`,borderRadius: '10px', padding: '10px'}}>{data.data}</div>
  )
}

export default Notification