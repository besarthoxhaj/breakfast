## Trees

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

## Resources