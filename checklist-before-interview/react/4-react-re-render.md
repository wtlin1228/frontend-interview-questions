Please refer [this wonderful post](https://www.developerway.com/posts/react-re-renders-guide?) written by NADIA MAKAREVICH. I just want to have a backup.

---

Comprehensive guide on React re-renders. The guide explains what are re-renders, what is necessary and unnecessary re-render, what can trigger a React component re-render.

Also includes most important patterns that can help prevent re-renders and a few anti-patterns that lead to unnecessary re-renders and poor performance as a result. Every pattern and antipattern is accompanied by visual aid and working code example.

Table of Contents

- Part 1: what is re-render in React?
- Part 2: when React component re-renders itself?
- Part 3: preventing re-renders with composition
- Part 4: preventing re-renders with React.memo
- Part 5: improving re-renders performance with useMemo/useCallback
- Part 6: improving re-renders performance of lists
- Part 7: preventing re-renders caused by Context

# What is re-render in React?

When talking about React performance, there are two major stages that we need to care about:

- initial render - happens when a component first appears on the screen
- re-render - second and any consecutive render of a component that is already on the screen

Re-render happens when React needs to update the app with some new data. Usually, this happens as a result of a user interacting with the app or some external data coming through via an asynchronous request or some subscription model.

Non-interactive apps that don’t have any asynchronous data updates will never re-render, and therefore don’t need to care about re-renders performance optimization.

## 🧐 What is a necessary and unnecessary re-render?

Necessary re-render - re-render of a component that is the source of the changes, or a component that directly uses the new information. For example, if a user types in an input field, the component that manages its state needs to update itself on every keystroke, i.e. re-render.

Unnecessary re-render - re-render of a component that is propagated through the app via different re-renders mechanisms due to either mistake or inefficient app architecture. For example, if a user types in an input field, and the entire page re-renders on every keystroke, the page has been re-rendered unnecessarily.

Unnecessary re-renders by themselves are not a problem: React is very fast and usually able to deal with them without users noticing anything.

However, if re-renders happen too often and/or on very heavy components, this could lead to user experience appearing “laggy”, visible delays on every interaction, or even the app becoming completely unresponsive.

# When React component re-renders itself?

There are four reasons why a component would re-render itself: state changes, parent (or children) re-renders, context changes, and hooks changes. There is also a big myth: that re-renders happen when the component’s props change. By itself, it’s not true (see the explanation below).

## 🧐 Re-renders reason: state changes

When a component’s state changes, it will re-render itself. Usually, it happens either in a callback or in useEffect hook.

State changes are the “root” source of all re-renders.

See example in codesandbox

## 🧐 Re-renders reason: parent re-renders

A component will re-render itself if its parent re-renders. Or, if we look at this from the opposite direction: when a component re-renders, it also re-renders all its children.

It always goes “down” the tree: the re-render of a child doesn’t trigger the re-render of a parent. (There are a few caveats and edge cases here, see the full guide for more details: The mystery of React Element, children, parents and re-renders).

See example in codesandbox

## 🧐 Re-renders reason: context changes

When the value in Context Provider changes, all components that use this Context will re-render, even if they don’t use the changed portion of the data directly. Those re-renders can not be prevented with memoization directly, but there are a few workarounds that can simulate it (see Part 7: preventing re-renders caused by Context).

See example in codesandbox

## 🧐 Re-renders reason: hooks changes

Everything that is happening inside a hook “belongs” to the component that uses it. The same rules regarding Context and State changes apply here:

state change inside the hook will trigger an unpreventable re-rerender of the “host” component
if the hook uses Context and Context’s value changes, it will trigger an unpreventable re-rerender of the “host” component
Hooks can be chained. Every single hook inside the chain still “belongs” to the “host” component, and the same rules apply to any of them.

See example in codesandbox

## ⛔️ Re-renders reason: props changes (the big myth)

It doesn’t matter whether the component’s props change or not when talking about re-renders of not memoized components.

In order for props to change, they need to be updated by the parent component. This means the parent would have to re-render, which will trigger re-render of the child component regardless of its props.

See example in codesandbox

Only when memoization techniques are used (React.memo, useMemo), then props change becomes important.

# Preventing re-renders with composition

## ⛔️ Antipattern: Creating components in render function

Creating components inside render function of another component is an anti-pattern that can be the biggest performance killer. On every re-render React will re-mount this component (i.e. destroy it and re-create it from scratch), which is going to be much slower than a normal re-render. On top of that, this will lead to such bugs as:

possible “flashes” of content during re-renders
state being reset in the component with every re-render
useEffect with no dependencies triggered on every re-render
if a component was focused, focus will be lost
See example in codesandbox

Additional resources to read: How to write performant React code: rules, patterns, do's and don'ts

## ✅ Preventing re-renders with composition: moving state down

This pattern can be beneficial when a heavy component manages state, and this state is only used on a small isolated portion of the render tree. A typical example would be opening/closing a dialog with a button click in a complicated component that renders a significant portion of a page.

In this case, the state that controls modal dialog appearance, dialog itself, and the button that triggers the update can be encapsulated in a smaller component. As a result, the bigger component won’t re-render on those state changes.

See example in codesandbox

Additional resources to read: The mystery of React Element, children, parents and re-renders, How to write performant React code: rules, patterns, do's and don'ts

## ✅ Preventing re-renders with composition: children as props

This can also be called “wrap state around children”. This pattern is similar to “moving state down”: it encapsulates state changes in a smaller component. The difference here is that state is used on an element that wraps a slow portion of the render tree, so it can’t be extracted that easily. A typical example would be onScroll or onMouseMove callbacks attached to the root element of a component.

In this situation, state management and components that use that state can be extracted into a smaller component, and the slow component can be passed to it as children. From the smaller component perspective children are just prop, so they will not be affected by the state change and therefore won’t re-render.

See example in codesandbox

Additional resources to read: The mystery of React Element, children, parents and re-renders

## ✅ Preventing re-renders with composition: components as props

Pretty much the same as the previous pattern, with the same behavior: it encapsulates the state inside a smaller component, and heavy components are passed to it as props. Props are not affected by the state change, so heavy components won’t re-render.

Can be useful when a few heavy components are independent from the state, but can’t be extracted as children as a group.

See example in codesandbox

Read more about passing components as props here: React component as prop: the right way™️, The mystery of React Element, children, parents and re-renders

# Preventing re-renders with React.memo

Wrapping a component in React.memo will stop the downstream chain of re-renders that is triggered somewhere up the render tree, unless this component’s props have changed.

This can be useful when rendering a heavy component that is not dependent on the source of re-renders (i.e. state, changed data).

See example in codesandbox

## ✅ React.memo: component with props

All props that are not primitive values have to be memoized for React.memo to work

See example in codesandbox

## ✅ React.memo: components as props or children

React.memo has to be applied to the elements passed as children/props. Memoizing the parent component will not work: children and props will be objects, so they will change with every re-render.

See here for more details on how memoization works for children/parent relationships: The mystery of React Element, children, parents and re-renders

See example in codesandbox

# Improving re-renders performance with useMemo/useCallback

## ⛔️ Antipattern: unnecessary useMemo/useCallback on props

Memoizing props by themselves will not prevent re-renders of a child component. If a parent component re-renders, it will trigger re-render of a child component regardless of its props.

See example in codesandbox

## ✅ Necessary useMemo/useCallback

If a child component is wrapped in React.memo, all props that are not primitive values have to be memoized

See example in codesandbox

If a component uses non-primitive value as a dependency in hooks like useEffect, useMemo, useCallback, it should be memoized.

See example in codesandbox

## ✅ useMemo for expensive calculations

One of the use cases for useMemo is to avoid expensive calculations on every re-render.

useMemo has its cost (consumes a bit of memory and makes initial render slightly slower), so it should not be used for every calculation. In React, mounting and updating components will be the most expensive calculation in most cases (unless you’re actually calculating prime numbers, which you shouldn’t do on the frontend anyway).

As a result, the typical use case for useMemo would be to memoize React elements. Usually parts of an existing render tree or results of generated render tree, like a map function that returns new elements.

The cost of “pure” javascript operations like sorting or filtering an array is usually negligible, compare to components updates.

See example in codesandbox

# Improving re-render performance of lists

In addition to the regular re-renders rules and patterns, the key attribute can affect the performance of lists in React.

Important: just providing key attribute will not improve lists' performance. To prevent re-renders of list elements you need to wrap them in React.memo and follow all of its best practices.

Value in key should be a string, that is consistent between re-renders for every element in the list. Typically, item’s id or array’s index is used for that.

It is okay to use array’s index as key, if the list is static, i.e. elements are not added/removed/inserted/re-ordered.

Using array’s index on dynamic lists can lead to:

- bugs if items have state or any uncontrolled elements (like form inputs)
- degraded performance if items are wrapped in React.memo

Read about this in more details here: React key attribute: best practices for performant lists.

See example in codesandbox - static list

See example in codesandbox - dynaminc list

## ⛔️ Antipattern: random value as key in lists

Randomly generated values should never be used as values in key attribute in lists. They will lead to React re-mounting items on every re-render, which will lead to:

very poor performance of the list
bugs if items have state or any uncontrolled elements (like form inputs)
See example in codesandbox

# Preventing re-renders caused by Context

## ✅ Preventing Context re-renders: memoizing Provider value

If Context Provider is placed not at the very root of the app, and there is a possibility it can re-render itself because of changes in its ancestors, its value should be memoized.

See example in codesandbox

## ✅ Preventing Context re-renders: splitting data and API

If in Context there is a combination of data and API (getters and setters) they can be split into different Providers under the same component. That way, components that use API only won’t re-render when the data changes.

Read more about this pattern here: How to write performant React apps with Context

See example in codesandbox

## ✅ Preventing Context re-renders: splitting data into chunks

If Context manages a few independent data chunks, they can be split into smaller providers under the same provider. That way, only consumers of changed chunk will re-render.

Read more about this pattern here: How to write performant React apps with Context

See example in codesandbox

## ✅ Preventing Context re-renders: Context selectors

There is no way to prevent a component that uses a portion of Context value from re-rendering, even if the used piece of data hasn’t changed, even with useMemo hook.

Context selectors, however, could be faked with the use of higher-order components and React.memo.

Read more about this pattern here: Higher-Order Components in React Hooks era

See example in codesandbox
