import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleBad, handleGood, handleOk, handleReset } from './ratingSlice'

const Rating = () => {
  const good = useSelector((state) => state.rating.good)
  const bad = useSelector((state) => state.rating.bad)
  const ok = useSelector((state) => state.rating.ok)
  const dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => dispatch(handleGood())}>Good</button>
      <button onClick={() => dispatch(handleOk())}>Ok</button>
      <button onClick={() => dispatch(handleBad())}>Bad</button>
      <button onClick={() => dispatch(handleReset())}>Reset stats</button>
      <p>good {good}</p>
      <p>ok {ok}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default Rating