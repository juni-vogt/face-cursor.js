# face-cursor.js
A little jQuery plugin to 3D transform elements relative to the cursor position

[![Demo](https://raw.githubusercontent.com/matthias-vogt/face-cursor.js/gh-pages/demo-media/img/demo.gif)](//matthias-vogt.github.io/face-cursor.js)

Demo: [matthias-vogt.github.io/face-cursor.js](//matthias-vogt.github.io/face-cursor.js)

This is a [`jQuery`](//jquery.com) plugin that adds CSS `transform: rotate3d()` based on the element's position relative to the mouse.

## Usage
`face-cursor.js` depends on [jQuery](https://jquery.com/), so make sure you have that loaded. You can use it like this:
```javascript
$(".some, .elements").faceCursor();
```
```javascript
$(".some, .elements").faceCursor({
    options: "go here"
});
```

### Install

```html
<script src="jquery.min.js"></script>
<script src="face-cursor.js"></script>
```

For better loading performance, I'd recommend loading the script as non-critical content (by putting the `<script>` and `<style>` tags at the end of the body tag). Please also consider concatenating it with your other dependencies.

Install and update easily using [npm](http://npmjs.com):
```sh
npm install face-cursor --save
```

### Options
```javascript
{
    avertCursor: false,
    // whether the element should face away from the cursor instead of toward it
    perspective: "6rem", // CSS perspective for transforms
    cacheElementData: true // whether height, width and offset of the elements should be cached instead of recalculated each frame (if the elements move around or you want the effect to be consistent during browser resizing, disable)
}
```


### Destroying
The plugin's instances can be destroyed on specific elements by doing
```javascript
$elements.data("plugin_faceCursor").destroy();
```
…or, to destroy all instances:
```javascript
$("*").filter(function() {
    return $(this).data("plugin_faceCursor") !== undefined
}).each(function() {
    $(this).data("plugin_faceCursor").destroy()
});
```

## Browser support
This uses CSS3 transitions and window.requestAnimationFrame, so [browser support](http://caniuse.com/#feat=css-transitions) is ie10+.

## Contributing
You are very welcome to contribute! Please send pull requests and issues.

## Feature requests
Feel free to post issues to ask for features.

## TODO
- [ ] support CommonJS and AMD
- [ ] automatic testing

## License
ISC
