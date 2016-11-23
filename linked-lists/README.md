### Challenge

Write a singly linked list, which implements the following methods and properties:
- length
- insert
- getAt
- insertAt

### Single

```js
length
// Simple property of the list. Get's updated every time
// the list is modified.

insert(data)
// If there is no List `head` it means the List is empty and
// that the new Node created will be assigned as List `head`.
// If the List has already an `head` traverse until the `tail`
// and assign the `next` property of the `tail` to the newly
// created Node.

getAt(idx)
// ...

insertAt(idx,data)
// Create new `node`.
// Get node at (`idx` - 1), let's call it `nodeIdx`.
// Grab `nodeIdx.next` and assign to a `oldNode` variable.
// Assign `newNode` to `nodeIdx.next`.
// Assign `newNode.next` to `oldNode`.
```

### Double

## Resources

- http://cslibrary.stanford.edu/105/