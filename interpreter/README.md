## Interpreter


### Parser



```js
// AST for the expression `>(x, 5)`
{
  type: "apply",
  operator: {type: "word", name: ">"},
  args: [
    {type: "word", name: "x"},
    {type: "value", value: 5}
  ]
}
```

- syntax tree


## Resources

- https://github.com/acornjs/acorn
- https://github.com/jquery/esprima
- https://github.com/estree/estree
