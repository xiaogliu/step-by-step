sublime自带js语法高亮对JSX不友好，下载[babel-sublime](https://github.com/babel/babel-sublime)可以解决这个问题。   

但如果直接使用babel的js语法，那html标签自动闭合功能失效（安装Emmet插件以后），这种影响在html文件中尤其严重。   

通过下面方法可以在文件使用babel的js语法高亮的同时，html标签也可以在输入`tab`键以后自动闭合：

首先确保已经安装了 `babel` & `Emmet` 插件，然后在 Preferences --> Key Bindings --> User 文件下添加下面代码

```bash
{
    "keys": ["tab"], "command": "expand_abbreviation_by_tab", "context": [
        {
            "operand": "source.js", 
            "operator": "equal", 
            "match_all": true, 
            "key": "selector"
        },
        {   
            "key": "selection_empty", 
            "operator": "equal", 
            "operand": true,
            "match_all": true 
        }
    ]
},
{ "keys": ["tab"], "command": "next_field", "context":
    [
        { "key": "has_next_field", "operator": "equal", "operand": true }
    ]
}
```
