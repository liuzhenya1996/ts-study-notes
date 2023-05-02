// Class类是 JavaScript 中就存在的概念， typescript 中的 Class 和 JavaScript 中的 Class 是一个概念，但是 typescript 中 对 Class 扩充了一些功能
// 注意区分 类Class 类型type 接口interface
// 简单声明一个Class
class Person1 { // class 和 interface 很相似，但是还是要注意他们不是一个概念
  name = 'lee'
  getName () {
    return this.name
  }
}

class Student1 extends Person1 { // 类的继承和 interface 的继承语法类似
  getName () {
    return this.name + 'dell' // 子类可以重写父类中的属性
  }
  getParentProperty () {
    return super.getName() // super 代表父类，此处 super.getName() 调用的父类中的 getName 方法而不是子类中重写后的方法 getName
  }
}

const student1 = new Student1() // Class 的实现需要关键字 new
console.log(student1.getName())
console.log(student1.getParentProperty())


// Class 中的属性有 public、private、protected 三种作用域修饰符
/**
 * public 为公有的属性，在所有地方都可以直接访问，如果声明 Class 时没有指定作用域，则默认为 public
 * protected 仅限 Class 内部和其子类的内部访问，外部无法访问
 * private 仅限 Class 内部访问，其余所有地方都无法访问
*/

class Class050201 {
  private name: string
  protected age: number
  public getName () {
    return 123
  }
}
class Class050202 extends Class050201 {
  getParName () {
    // return this.name // 无法访问
    return this.age // 子类可以访问父类中的 protected age
  }
}
const class050201 = new Class050201()
// console.log(class050201.name) // 无法访问
console.log(class050201.getName()) // public getName 可以自由访问


// 构造函数及其相关的 Class 内部的属性赋值简写
// constructor 是 Class 内部默认存在的一个函数，该函数在 Class 生成的一刻会自动执行
class Class050203 {
  name: string
  constructor (name: string) {
    this.name = name
  }
}
// 上面这个 class 的构造函数内，实现了将内部的 公有属性 name 赋值的功能，但是这里有个简写的方法
class Class050204 {
  constructor (public name: string) {} // 给入参声明作用域后，就相当于上面那一大坨的功能
}
const class050202 = new Class050204('1')
console.log('class050202', class050202.name)

// 对于拥有构造函数的 class，其子类如果也有构造函数，那么子类的构造函数内必须先调用一下 super() 把父类的功能完整的继承过来
class Class050205 extends Class050204 {
  constructor (public age: number) { // 这里相当于声明了一个内部的属性 age，并且实现 Class050205 时可以传入 age 实现 age 的赋值
    super('name1') // 这里 super() 就相当于调用了父类中的构造函数，如刚刚所说，这是必须的语句，不能少
  }
}
const class050203 = new Class050205(23)
console.log('class050203', class050203.age, class050203.name)

// 类中的 Getter 和 Setter
// 现在有一个类，内部属性是私密的
class Class050206 {
  constructor (private name: string) {} // 我们知道外部无法直接读取 name，我们可以使用 get 功能来实现读取内部属性
  get getName () { return this.name }
  // getName () { return this.name } // 当然使用这个方式也可以，但是取值还是建议使用 class 官方给的 get 功能
  set setName (name: string) { // 也可以用 set 功能实现内部私密属性的修改
    this.name = name + ' form set'
  }
}
const class050204 = new Class050206('liuzhenya')
console.log('class050204', class050204.getName) // 注意噢，get 功能提供的其实要看做属性，不能写成 getName()
class050204.setName ='liuzhenya' // 注意噢，set 功能提供的也要看做属性，不能写成 setName(’liuzhenya)
console.log('class050204-set', class050204.getName) // 注意噢，get 功能提供的其实要看做属性，不能写成 getName()

// 静态属性 static，static 声明的属性仅属于类本身，外部实现实例中将不存在这个属性
class Class050207 {
  static name1 = 'static name';
}
const class050205 = new Class050207()
// console.log(class050205.name1) // 不存在噢
console.log(Class050207.name1) // 直接从 class 中访问

// 实现需求，希望一个的类只能被 new 一次，后续不能再 new 了，只能用第一次 new 出来的
class Class050208 {
  private static classInter: Class050208 // 声明一个内部静态属性 classInter，类型为 Class050208
  private constructor () {} // 构造函数私有后，外部将不能再通过 new 关键字生成此类的实例
  public static getClassInter () {
    if (!this.classInter) { // classInter 是否有实例了，注意刚刚只是声明了它的类型，没有直接赋值噢
      this.classInter = new Class050208() // 没有实例就生成一下
    } else {
      return this.classInter // 有实例了就直接返回
    }
  }
}
// const class050206 = new Class050208() // 不允许了噢
const class050207 = Class050208.getClassInter() // 生成了一个实例
const class050208 = Class050208.getClassInter() // 实例已经存在了，直接返回生成好的