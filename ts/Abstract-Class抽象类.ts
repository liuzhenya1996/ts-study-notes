// 抽象类 Abstract Class 与接口 Interface 及其类似，抽象类本身不是类，它是一个类的描述，只能被继承实现，其内部的抽象属性在实现时也必须要实现
// 在充分理解了 Interface 的概念之后，Abstract Class 的概念理解起来就很简单了
abstract class Class050301 {
  abstract name: string // 抽象属性 name 在被继承时，必须声明时，声明之后类中才有此属性
  age = 37 // 非抽象属性在被继承时会自动带入子类，不必实现
  abstract getName (): string // 抽象属性 getName() 在被继承时，必须声明时，声明之后类中才有此属性
}
// const class050301 = new Class050301() // 不允许噢，无法创建抽象类的实例
class Class050302 extends Class050301 {
  name = '123' // 如果不声明就会报错
  getName() { // 如果不声明就会报错
    return '123'
  }
}
const class050302 = new Class050302()
console.log('class050302', class050302.name, class050302.age, class050302.getName())