import { useCallback, useEffect, useRef, useState } from 'react'

function useInterval(callback, delay = 1000, pause = false) {
  const callbackRef = useRef()

  // remember the latest callback
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!pause) {
      const timerId = setInterval(() => callbackRef.current(), delay)

      return () => clearInterval(timerId)
    }
  }, [delay, pause])
}

function Counter() {
  const [delay, setDelay] = useState(1000)
  const [pause, setPause] = useState(false)
  const [count, setCount] = useState(0)

  // one way to prevent keep clearing the interval
  // const callback = useCallback(() => setCount((count) => count + 1), [])
  const callback = () => setCount((count) => count + 1)

  useInterval(callback, delay, pause)

  const handleDelayChange = useCallback((e) => {
    setDelay(e.target.value)
  }, [])

  const handlePause = useCallback(() => {
    setPause((pause) => !pause)
  }, [])

  return (
    <div>
      <h1>{count}</h1>

      <p>delay: {delay}</p>
      <input
        type="range"
        value={delay}
        onChange={handleDelayChange}
        max="3000"
        min="50"
      />

      <button onClick={handlePause}>
        {pause === true ? 'turn on' : 'turn off'}
      </button>
    </div>
  )
}

function App() {
  return <Counter />
}

export default App
