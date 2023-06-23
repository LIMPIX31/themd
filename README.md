# Themd - theme tool
<img width="1000" alt="Frame 1" src="https://github.com/LIMPIX31/themd/assets/81296950/00d62d08-a5be-42c9-9454-efd8f4e732c9">

# How it works
###### This is simply a function that approximates color to your palette by blending your color with similar colors. No magic.
<img width="624" alt="Frame 2" src="https://github.com/LIMPIX31/themd/assets/81296950/175b0e59-b4a8-4793-b35e-7ac3bfb8a7f0">

# How to use
###### Firstly define your color guides. The more the better
```ts
const guides = [
  // colors
  '#dc322f', // red
  '#cb4b16', // orange
  '#b58900', // yellow
  '#859900', // green
  '#2aa198', // aqua
  '#268bd2', // blue
  '#6c71c4', // magenta
  '#d33682', // purple

  // grayscales
  '#002b36',
  '#073642',
  '#586e75',
  '#657b83',
  '#839496',
  '#93a1a1',
  '#eee8d5',
  '#fdf6e3',
]
```
###### Let's derive a new color based on the guides
```ts
import { derive } from 'themd'

const target = '#00FF57' // toxic green

const getColor = derive(guides)
const result = getColor(target)

console.log(result)
```
###### You can configure it
```ts
const getColor = derive(guides, {
  ratio: 0.75, // Limit on the ratio and number of colors to be mixed (default: 0.75)
  dry: 0.5, // Mixing ratio with input color
  clamp: false, // The output color can't be lighter or darker than the color guides (default: false)
})
```
* **Dry: 1** - means that the output color consists only of color guides
* **Ratio: >2**  - The more `ratio`, the more colors will be mixed, it is recommended to change between 0.25 and 1.75
* **Clamped: true** - means that even with the input color `#000` you won't get a color darker than what is in the color guides. Similarly with light colors.

# Troubleshooting
* Sometimes the input color can fall into the group of background colors (too dark or light). This is considered normal because the colors are often more similar in brightness than in hue. You have two ways to solve this problem: add a similar color to the color guides or adjust the `ratio` parameter in more detail.

# Specific use
You can convert colors to grayscale. Note that this may be unstable.
