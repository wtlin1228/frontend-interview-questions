# React useEffect

> Effects are a part of your data flow.

> React remembers the effect function you provided, and runs it after flushing changes to the DOM and letting the browser paint the screen.

ref:

- [Dan's blog post](https://overreacted.io/a-complete-guide-to-useeffect/)

## Handle race condition of fetching data with useEffect

```js
function Article({ id }) {
  const [article, setArticle] = useState(null)

  useEffect(() => {
    let didCancel = false

    async function fetchArticle() {
      const article = await API.fetchArticle(id)
      if (!didCancel) {
        setArticle(article)
      }
    }

    fetchArticle()

    return () => {
      didCancel = true
    }
  }, [id])
}
```

## Trick with useReducer() to avoid clean function

This approach gives you more flexibility. Inside the reducer, you have the access both to current state and fresh props. The `dispatch` function itself never changes so you can pump data into it from any closure. One limitation of `useReducer()` is that you can’t yet emit side effects in it. (However, you could return new state — triggering some effect.)

```js
function Counter() {
  const [step, setStep] = useState(1)

  const [count, dispatch] = useReducer((state, action) => {
    if (action === 'inc') {
      // access the current state
      return state + step
    }
  }, 0)

  useEffect(() => {
    let id = setInterval(() => {
      dispatch('inc')
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setStep((step) => step + 1)}>+1 step</button>
      <button onClick={() => setStep((step) => step - 1)}>-1 step</button>
    </div>
  )
}
```

## Why useEffect() is triggered twice in React.StrictMode in React 18

This is intended. In the future, React would provide a feature called "reusable state". And that feature need to ensure that your components can be unmount and remount multiple times.

ref: https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state
