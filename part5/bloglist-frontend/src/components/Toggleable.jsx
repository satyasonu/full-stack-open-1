import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

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
        <button style={{ display: showHide ? 'none' : '' }} onClick={handleCreatebutton}>{props.buttonLabel}</button>
        <div style={{ display: showHide ? '' : 'none' }}>
          {props.children}
          <button onClick={handleCancelButton}>cancel</button>
        </div>
      </div>
    </>
  )
})
Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable'
export default Toggleable