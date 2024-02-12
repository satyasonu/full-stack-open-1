const Notification = (props) => {
  const { color, content } = props.data
  return (
    <>
      { content &&
        <div className="notification-container" style={{ border: `2px solid ${color}`, borderRadius: '10px', color: `${color}`, padding: '10px', backgroundColor: '#CDCDCD' }}>
          {content}
        </div>
      }
    </>
  )
}

export default Notification