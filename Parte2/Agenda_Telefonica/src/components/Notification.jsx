const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const { message, type } = notification
  
  return (
    <div className={`notification ${type === 'error' ? 'notification-error' : 'notification-success'}`}>
      {message}
    </div>
  )
}

export default Notification