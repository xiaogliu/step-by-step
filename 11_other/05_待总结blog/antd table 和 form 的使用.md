自己对这块很不熟，导致在随手记和 tinklabs 做后端管理系统都特别吃力！！！！

结合 react 的特点，比如组件式开发很重要。

写两篇 blog 熟悉下。

其他，实际我再开发 tinklabs 应用时有足够多的时间学习的 antdesign 的组件使用方式的，但自己太着急，导致在不熟悉组件使用方式的情况下业务需求也没开发好。**这是方法问题**

另外，越是遇到比较困难的任务，越要进行分解，争取达到事半功倍的效果，而非无头苍蝇干着急，最后事倍功半。

遇到问题先思考怎么做，然后做事情的时候胸有成竹的去做，全局统筹的观念，而不是走一步看一步。比如，做这个后台管理系统：

首先分析，antd table 和 form 不熟，应该拿一到两天先把文档看下，对于其使用有大概认识（**注意是大概，切岂一开始就抠细节，先会用**），然后能快速开发业务。而后开发过程中遇到问题及时查文档，看对应的组件怎么实现某些功能（**而非用已有的知识搞半天搞不出，比如 initialValue 和 changeValue 和之前不同，提交表单数据也有封装好的方法**），业务完成后再对源码进行分析（组件/裤），或者学习高级特性（新语言）。

另外，先把业务搞定，在谈优化，比如，table，form 都没搞清楚怎么用，就想着怎么封装函数，本末倒置。


不要说我不熟，而是想着怎么在不熟的情况下高质量完整需求。这是对高级工程师的要求，不然，和菜鸟有啥区别？


## Table：

通过往 table 组件中传递 dataSource 和 columns 定义表格数据以及表头（在 columns 中定义）。其中 `dataIndex` 是对数据项中的 key。如果存在 `dataIndex` 可以不在 columns 中使用 `key`。

record 表示当前行的 data，对应 dataSource 中的数据。

```js
const dataSource = [
  {
    // 供 react 优化用
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号"
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号"
  }
];

// 含有三列
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    // 如果 dataIndex 存在，可以不写 key
    key: "name"
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address"
  }
];

<Table dataSource={dataSource} columns={columns} />;
```

## From

使用流程

1. Form.create，这样在组件的 props 就有 form 属性，里面有各种方法，比如 getFieldDecorator，getFieldsValue 等.
2. 一般配合 Form.item + getFieldDecorator 进行 input 的转化（antd 进行了封装，使得验证什么更方便），但要注意以下问题：主要就是不能直接使用 onChange 以及直接设置初始值和动态改变值，使用 antd 封装好的方法。

> 经过 getFieldDecorator 包装的控件，表单控件会自动添加 value（或 valuePropName 指定的其他属性） onChange（或 trigger 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

> 你不再需要也不应该用 onChange 来做同步，但还是可以继续监听 onChange 等事件。

> 你不能用控件的 value defaultValue 等属性来设置表单域的值，默认值可以用 getFieldDecorator 里的 `initialValue。`

> 你不应该用 setState，可以使用 this.props.form.setFieldsValue 来动态改变表单值。

3. validateFields：校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部 item 组件（子组件中的 item 会包含进来吗，这实际是 react 的知识，或者子组件 form 的 name 和 父组件一致？？？）。
