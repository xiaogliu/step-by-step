There is a differentiation between **src** and **href** and they can't be used interchangeably. We use **src** for replaced elements while **href** for establishing a relationship between the referencing document and an external resource.   

**href** (Hypertext Reference) attribute specifies the location of a Web resource thus defining a link or relationship between the current element (in case of anchor `a`) or current document (in case of `link`) and the destination anchor or resource defined by this attribute. When we write:   

```html
<link href="style.css" rel="stylesheet" />
```

The browser understands that this resource is a stylesheet and the ~~processing~~ parsing of the page is **not** paused (rendering might be paused since the browser needs the style rules to paint and render the page). It is **not** similar to dumping the contents of the css file inside the `style` tag. (Hence is is advisable to use `link` rather than `@import` for attaching stylesheets to your html document.)   

**src** (Source) attribute just embeds the resource in the current document at the location of the element's definition. For eg. When the browser finds   

```html
<script src="script.js"></script>
```
The loading and processing of the page is paused until this the browser fetches, compiles and executes the file. It is similar to dumping the contents of the js file inside the `script` tag. Similar is the case with `img` tag. It is an empty tag and the content, that should come inside it, is defined by the `src` attribute. The browser pauses the loading until it fetches and loads the image. [so is the case with `iframe`]   

This is the reason why it is advisable to load all JavaScript files at the bottom (before the `</body>` tag)   

from：[Difference between SRC and HREF](https://stackoverflow.com/questions/3395359/difference-between-src-and-href)