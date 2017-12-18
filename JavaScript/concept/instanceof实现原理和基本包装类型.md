- instanceof实现原理：
`instanceof`检测对象 A 是不是对象 B 的实例的原理：查看对象 B 的 `prototype` 所指向的对象（即 B 的原型对象）是否在 A 的`[[prototype]]`链(原型链)上。   

参考：
1，http://www.itkaoyan.cn/?p=62   
1，https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/index.html