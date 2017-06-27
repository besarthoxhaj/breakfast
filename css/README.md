## Run

```bash
 $ npm run css:watch
 # visit
```

## Cascading Style Sheet

| Num |                     Title                     | Description | Link |
| --- | --------------------------------------------- | ----------- | ---- |
| 04  | Background Img Opacity                        | ./04.html   |      |
| 05  | Animate Opacity Based on Scroll               | ./05.html   |      |
| 12  | Parent/Child where top child is bottom Parent | ./12.html   |      |
|     |                                               |             |      |

## Colors
CSS has functions `rgb(255,255,255)` or `rgba(0,0,0,1)` are two common examples.

```css
{
  /**
   * calculate the new position of an element after it has been rotated by
   * 45 degress
   */
  transform: rotate(45deg);
  /**
   *  calculate the new position of an element after it has been moved across
   *  50px and down 60px
   */
  transform: translate(50px, 60px);
  /**
   * calculate the computed value of 90% of the current width minus 15px
   */
  width: calc(90%-15px);
  /**
   * fetch an image from the network to be used as a background image
   */
  background-image: url('myimage.png');
}
```

## Cascade and inheritance

What selectors win out in the cascade depends on three factors (these are listed in order of weight — earlier ones will overrule later ones):

- Importance
- Specificity
- Source order

### Importance


### 12 - Align child top at the bottom of the parent

Resources:
- https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateY
- https://stackoverflow.com/questions/35239873/css-align-top-of-child-container-to-bottom-of-parent-container
