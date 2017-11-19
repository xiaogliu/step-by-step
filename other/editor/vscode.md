自接触编程以来，编辑器使用过程： vim --> sublime --> webstorm --> sublime --> atom --> sublime --> stom --> vscode   

vim 配置成本太高，更重要的是最后也不能选到自己喜欢的主题配色；webstorm 太过笨重；sublime 轻量、性能好、主题配色也令人满意，但在含有注释的文本中自动缩进一直不对（bug？），这点绝对不能认，除此之外，sublime 语法高亮相对 atom 和 vscode 也不够智能，比如不能区分 ES6 的某些关键词，markdown编辑有些鸡肋。   

上述几个编辑器的问题，atom 和 vscode 基本都解决了，最后基本就在 atom 和 vscode 之间纠结，最开始一直用 atom 但最终还是选择了 vscode，原因是 atom 有时会卡顿，这点不能忍，尤其在电脑没有连接电源的时候简直抓狂（8小时内如果出现3次以上卡顿就属于不能忍的程度了，内存占用高就忍了），并且我现在的电脑可以 2017款 MacBook pro 256 SSD硬盘/8G 内存，要说配置低显然没说服力。   

vscode关键是不会卡顿，其他插件、配色、快捷键和 atom 能基本一致，markdown 编辑略逊色于 atom，但够用。至于大文件编辑未测试。   

看到有对 vscode 和 atom 一个评价，感觉挺中肯：**atom 相当于 Firefox，而 vscode 类似于 chrome**。   

- 坑  

1. 有些快捷键只能在英文输入法状态下使用，比如调出 setting 面板、代码注释等。如果有时快捷键不能用了切换输入法试下。
2. workspace 判断项目所在分支会错误，当在命令行中切换项目分支时很容易复现这个问题。现在（2017-11-19）都是只在一个窗口打开一个项目。 

- 列选择： cmd + shift + 鼠标左键；cmd + alt + 上／下箭头;

- setting自定义部分：   

```json
{
    "atomKeymap.promptV3Features": true,
    "editor.multiCursorModifier": "ctrlCmd",
    "editor.formatOnPaste": true,
    "workbench.colorTheme": "One Dark Pro",
    "editor.fontFamily": "Monaco, 'Courier New', monospace",
    "editor.fontSize": 14,
    "workbench.iconTheme": "material-icon-theme",
    "editor.tabSize": 2,
    "editor.detectIndentation": true,
    "workbench.statusBar.visible": true,
    "workbench.activityBar.visible": false,
    "editor.wordSeparators": "`~!@#$%^&*()=+[{]}\\|;:'\",.<>/?",
}
```

- 自定义快捷键   

首先将 atom 快捷键映射过来，其次，自定义部分，只有结合插件 `beautify` 进行自动缩进：   

```json
[{
  "key": "cmd+alt+i",
  "command": "HookyQR.beautify",
  "when": "editorFocus"
}]
```