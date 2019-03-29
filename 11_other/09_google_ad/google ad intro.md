同一素材不能出现在同一页面？

1. google ad slot rendered get what div id is render.
[How to get the div id of the slot rendered? ](https://productforums.google.com/forum/#!msg/dfp/GfGELAzSISA/kxYUT3rUAwAJ)

```js
googletag.pubads().addEventListener('slotRenderEnded', function(event) {
	var id = event.slot.getSlotElementId();
	console.log( "a slot has been rendered into the div "+id );
});
```
