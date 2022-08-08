# Best practices for performant lists

- never use random value in the “key” attribute: it will cause the item to re-mount on every render. Unless of course, this is your intention
- there is no harm in using the array’s index as “key” in “static” lists - those whose items number and order stay the same
- use item unique identifier (“id”) as “key” when the list can be re-sorted or items can be added in random places
- you can use the array’s index as “key” for dynamic lists with stateless items, where items are replaced with the new ones - paginated lists, search and autocomplete results and the like. This will improve the list’s performance.

## General use cases

1. use item.id as your key

   ```js
   <Item key={item.id} >
   ```

2. memo your item with React.memo

   ```js
   const ItemMemo = React.memo(Item)
   ```

Put those above together:

```js
const ItemMemo = React.memo(Item)

const PerformantList = (items) => {
  return (
    <div>
      <h1>My List</h1>
      {items.map((item) => (
        <ItemMemo key={item.id} item={item} />
      ))}
    </div>
  )
}
```

## You can use "index" as a "key" if your list is static

Because `items` in a static list won't change.

## Why “index” as a “key” attribute IS a good idea

After the previous sections it’s easy to say “just always use a unique item id for “key” attribute”, isn’t it? And for most cases it’s true and if you use id all the time nobody will probably notice or mind. But when you have the knowledge, you have superpowers. Now, since we know what exactly is happening when React renders lists, we can cheat and make some lists even faster with index instead of id.

A typical scenario: paginated list. You have a limited number of items in a list, you click on a button - and you want to show different items of the same type in the same size list. If you go with key="id" approach, then every time you change the page you’ll load completely new set of items with completely different ids. Which means React won’t be able to find any “existing” items, unmount the entire list, and mount completely fresh set of items. But! If you go with key="index" approach, React will think that all the items on the new “page” already existed, and will just update those items with the fresh data, leaving the actual components mounted. This is going to be visibly faster even on relatively small data sets, if item components are complicated.

Take a look at this example in the codesandbox. Pay attention to the console output - when you switch pages in the “id"-based list on the right, every item is re-mounted. But in “index"-based list on the left items are only re-rendered. Much faster! With throttled CPU, even with 50 items very simple list (just a text and an image), the difference between switching pages in the “id"-based list and “index"-based list is already visible.

And exactly the same situation is going to be with all sorts of dynamic list-like data, where you replace your existing items with the new data set while preserving the list-like appearance: autocomplete components, google-like search pages, paginated tables. Just would need to be mindful about introducing state in those items: they would have to be either stateless, or state should be synced with props.

ref: https://www.developerway.com/posts/react-key-attribute
