# mv-progressbar

MvProgressbar is a Meveo progress bar component based on lit-element.

## Quick Start

To experiment with the MvProgressbar component.

1. Clone this repo.

2. Serve the project from the root directory with some http server (best served with meveo itself)

3. Update the progress bar demo component in demo.js file

The `mv-progressbar` includes:
 * 2 `type`:
```
default, infinite 
```
* 2 `theme`:
```
light, dark 
```

## Sample usage

```html
<mv-progressbar
  type="infinite"                 //use the default or infinite progress bar
  .value="${progressValue}"       //the value of the progress bar
  striped                         //show the stripes
  animated                        //show the animation of the stripes
  .theme="${progressbarTheme}"    //toggle the light and dark theme mode
></mv-progressbar>
```

You can also check this [demo](https://progressbar.meveo.org/)
