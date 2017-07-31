- instanceof实现原理：
`instanceof`检测对象A是不是对象B的实例的原理：查看对象B的`prototype`所指向的对象是否在A的`[[prototype]]`链(原型链)上。   

参考：
1，http://www.itkaoyan.cn/?p=62   
1，https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/index.html