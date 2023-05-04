// 类型保护就是通过类似类型收窄的方式，提升代码的安全性

// 1.使用断言的方式收窄类型实现类型保护
// 现在有两个类型
interface inter050401 {
  kind: string,
  fly: () => {}
}
interface inter050402 {
  kind: string,
  bark: () => {}
}
function func050401 (par: inter050401 | inter050402) {
  // par.fly() //这样是不允许的，因为入参有 inter050401 inter050402 两种类型，但是只有 inter050401 类型有 fly()
  // 使用断言的方式收窄类型实现代码的安全性
  if (par.kind) {
    (par as inter050401).fly() // 断言为 inter050401 类型就可以使用它的 fly() 了，但是一般来讲，断言这种方式都是不建议使用的，因为强扭的瓜不甜
  } else {
    (par as inter050402).bark()
  }
}

// 2.使用 in 语法来实现类型保护
function func050402 (par: inter050401 | inter050402) {
  // par.fly() //这样是不允许的，因为入参有 inter050401 inter050402 两种类型，但是只有 inter050401 类型有 fly()
  if ('fly' in par) { // 判断 par 中有没有 fly
    par.fly() // 有就可以用
  } else { // 既然入参有 inter050401 inter050402 两种类型，但是只有 inter050401 类型有 fly()，所以如果 'fly' 不在 par 中，那就必然在 inter050402 中
    par.bark() // inter050402 中有 bark()，可以安全调用
  }
}

// 3.使用 instanceof 判断来实现类型保护
class Class050401 {
  num: number
}
function func050403 (par1: Class050401 | object, par2: Class050401 | object) {
  // console.log(par1.num + par2.num) 不允许，如果 par1 或 par2 有一个是 object 时，就不能保证它有 num 属性
  if (par1 instanceof Class050401 && par2 instanceof Class050401) { // 如果 par1 和 par2 都是来自 Class050401 的话，就可以安全的调用其内部的 num 属性了
    console.log(par1.num + par2.num)
  }
}
// 也可以定义一个类型，继承 Class050401，那么 inter050403 类型中就必然有 Class050401 内部的属性 num
interface inter050403 extends Class050401 {}
function func050404 (par1: Class050401 | inter050403, par2: Class050401 | inter050403) {
  console.log(par1.num + par2.num) // 这样 par1 和 par2 无论是 Class050401 还是 inter050403，其内部都有属性 num 可以拿来用了
}