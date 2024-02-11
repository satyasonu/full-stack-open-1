import { forwardRef, useImperativeHandle, useState } from "react"

const Toggleable = forwardRef((props, refs) => {
  const [showHide, setShowHide] = useState(false)

  const handleCreatebutton = () => {
    setShowHide(true)
  }
  const handleCancelButton = () => {
    setShowHide(false)
  }

  useImperativeHandle(refs, () => {
      return {
        handleCancelButton
      }
  })
  return (
    <>
      <div>
        <button style={{display: showHide ? 'none' : '' }} onClick={handleCreatebutton}>new blog</button>
        <div style={{display: showHide ? '' : 'none'}}>
          {props.children}
          <button onClick={handleCancelButton}>cancel</button>
        </div>
      </div>
    </>
  )
})
export default Toggleable