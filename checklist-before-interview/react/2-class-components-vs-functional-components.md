# Class Components vs Functional Components

> Function components capture the rendered values. Every function inside the component render (including event handlers, effects, timeouts or API calls inside them) captures the props and state of the render call that defined it.

> With classes, function props by themselves aren’t truly a part of the data flow.

> Functional component doesn't have life cycle. Its mental model is totally different from class component. Functional component unifies describing the initial render result and the updates. This reduces the entropy of your program. It’s all about the destination, not the journey. React synchronizes the DOM according to our current props and state. There is no distinction between a “mount” or an “update” when rendering.

ref:

- [Dan's blog post](https://overreacted.io/how-are-function-components-different-from-classes/)

## Translation between function and class

Function will alert the user at the moment when user clicked the Follow button.
But class will alert the user at the moment when showMessage is called.

Steps:

1. current props is `{ user: 'Leo' }`
2. click Follow Button
3. change props to `{ user: 'Una' }`
4. after 3 seconds, functional component alerts "Followed Leo" but class component alerts "Followed Una"

Why? Because for functional components, the event handlers are a part of the render result — just like the visual output.

```js
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user)
  }

  const handleClick = () => {
    setTimeout(showMessage, 3000)
  }

  return <button onClick={handleClick}>Follow</button>
}
```

```js
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user)
  }

  handleClick = () => {
    setTimeout(this.showMessage, 3000)
  }

  render() {
    return <button onClick={this.handleClick}>Follow</button>
  }
}
```

## How to fix it?

You can use a block-scoping variable to captured the user.

```js
class ProfilePage extends React.Component {
  showMessage = (user) => {
    alert('Followed ' + user)
  }

  handleClick = () => {
    const { user } = this.props
    setTimeout(() => this.showMessage(user), 3000)
  }

  render() {
    return <button onClick={this.handleClick}>Follow</button>
  }
}
```

Or you can put those methods into the render method.

```js
class ProfilePage extends React.Component {
  render() {
    // Capture the props!
    const props = this.props

    // Note: we are *inside render*.
    // These aren't class methods.
    const showMessage = () => {
      alert('Followed ' + props.user)
    }

    const handleClick = () => {
      setTimeout(showMessage, 3000)
    }

    return <button onClick={handleClick}>Follow</button>
  }
}
```

## Remove the class shell

That's a functional component.

```js
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user)
  }

  const handleClick = () => {
    setTimeout(showMessage, 3000)
  }

  return <button onClick={handleClick}>Follow</button>
}
```
