直接在`{{}}`里面无法解析html标签，可以放在`ng-bind-html`指令中。   

但如果是不规则html，从安全角度考虑，`ng-bind-html`会过滤部分属性，要完全还原html标签需要用`$sce.trustAsHtml`
   
```js
$scope.setting.about = $sce.trustAsHtml(response);
```
