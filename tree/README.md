## Trees

Trees are one of the most common data structures in computer science.

## Challenge

```js
insert()
// insert element in the binary search tree.

search()
// check if an element is present in the tree.

height()
// returns the height of the tree.

max()
// return maximum value present in the tree

min()
// return minimum value present in the tree
```
## Why

As usual the main reason is performance. Let's have a look:

|           | Array (unsorted) | Linked List | Array (sorted) | BST (balanced) |
| ---       | ---              | ---         | ---            | ---            |
| Search(x) | O(n)             | O(n)        | O(log n)       | O(log n)       |
| Insert(x) | O(1)             | O(1)        | O(n)           | O(log n)       |
| Remove(x) | O(n)             | O(n)        | O(n)           | O(log n)       |

## Structure
- root
- children
- parent
- sibling
- leaf
- ancestor
- descendent
- cousin

## Depth and Height

## Traversal

There two main ways to traverse a tree:
- level-order traversal or breadth-first using queue (FIFO)

Level order traversal...

- sub-tree traversal or depth-first using stack (LIFO)

Depending on the order there are three strategies

|           | First | Second | Third |
| ---       | ---   | ---    | ---   |
| Preorder  | root  | left   | right |
| Inorder   | left  | root   | right |
| Postorder | left  | right  | root  |

## Binary tree

Is a tree in which each node can have at most 2 children.

## Binary Search Tree (BST)

Is a tree in which for each node, the value of all the nodes in the left subtree is lesser or equal to the value of all the nodes in right subtree.

## Applications
- storing naturally hierarchical data (i.e. file system)
- organize data for quick search, insertion, deletion
- `trie` is used to store dictionary
- network routing algorithm

## Implementation

## Memory allocation

## Javascript consideration

In javascript it is not possible to delete a variable declaration, example:

```js

```

## Resources

- https://xuyuanguo.wordpress.com/2013/02/06/dsw-algorithm-balancing-binary-search-tree/