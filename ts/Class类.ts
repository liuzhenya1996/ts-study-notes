// Class类是 JavaScript 中就存在的概念， typescript 中的 Class 和 JavaScript 中的 Class 是一个概念，但是 typescript 中 对 Class 扩充了一些功能
// 注意区分 类Class 类型type 接口interface
// 简单声明一个Class
class Person { // class 和 interface 很相似，但是还是要注意他们不是一个概念
  name = 'lee'
  getName () {
    return this.name
  }
}

class Student extends Person { // 类的继承和 interface 的继承语法类似
  getName () {
    return this.name + 'dell' // 子类可以重写父类中的属性
  }
  getParentProperty () {
    return super.getName() // super 代表父类，此处 super.getName() 调用的父类中的 getName 方法而不是子类中重写后的方法 getName
  }
}