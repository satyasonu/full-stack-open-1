import { useState} from 'react'

export const useField = (type, name) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  const resetvalue = () => {
    setValue('')
  }
  return {
    content: {value,
    type,
    onChange,
    name},
    resetvalue
  }
}
