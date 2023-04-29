// 1.基础类型 string、number、boolean
const userName: string = 'liuzhenya'
const userAge: number = 26
const userIsMale: boolean = true

// 2.数组类型
const numberArrEmpty: number[] = [] // 基础类型后直接加 [], 支持空数组
const stringArr: string[] = ['a', 'b', 'c'] // 基础类型后直接加 []
const numberOrStringArr: number[]|string[] = [1, 2, 3] // 使用 | ，来兼容2个及以上的不同类型
const booleanArr: Array<boolean> = [true] // 使用 Array 关键字声明，通过 <> 传入类型
const booleanOrStringArr: Array<boolean|string> = [true, '234']

// 3.对象类型
const user: {name: string, age: number} = { name: 'liuzhenya', age: 26 } // 使用 {} 来声明对象类型，对于每一个 key，需要单独申明其类型
const userNoAge: { name: string, age?: number } = { name: 'liuzhenya' } // 声明了的 key，都必须要赋值，如果不想赋值，则在声明时加一个 ?

// 4.联合类型
const consoleFunc = (id: string|number) => {
  // console.log(id.toLowerCase()) // 对于此情况，编辑器将会一眼看出来潜在问题并报红错，因为当传入的 id 为 number 时，将会导致运行报错
  if (typeof id === 'string') { // 使用 Narrowing, 类型收窄，可实现更严谨的，预先规避可能出错的情况 
    console.log(id.toLowerCase())
  } else {
    console.log(id.toFixed(2))
  }
}

// 5.类型别名（类型复用）
type User = {
  name: string,
  age: number
}
const user1: User = { name: 'liuzhenya', age: 26 }
const user2: User = { name: 'liuzhenya1', age: 25 }

// 6.任意类型 any
const consoleAny = (id: any) => { // 即便是任意类型，也建议显式的声明其类型为 any，如果声明了 tsconfig.compilerOptions.noImplicitAny 为 true，那么任意类型就必须显式的声明为 any
  console.log(id)
}

// 7.函数类型
function getAge (age: number): number { // 函数类型除了可以规约入参的类型之外，还可以规约出参的类型
  return age
}
const getName: (name: string) => number = (name: string) => name.length // 箭头函数的规约出参写法，由于剪头函数本身是对一个量直接赋值的，所以在它的等于号之前的部分其实都是他的类型声明部分
// 上面这个函数或许可以写成类型别名的形式，会看得更清楚
type GetNameLength = (name: string) => number
const getNameL: GetNameLength = (name: string) => name.length
const getNameL1: GetNameLength = getName

// 8.接口
// 有点类似类型别名
interface Person {
  name: string,
  age: number
}
const person: Person = {
  name: 'liuzhenya',
  age: 26
}
// 属性允许不赋值
interface PersonNoAge {
  name: string,
  age?: number
}
const person1: PersonNoAge = {
  name: 'liuzhenya'
}
// 接口重用，扩展属性（区别于类型别名的独有功能）
interface Person { // 重复声明一个接口，后续声明的属性将会补充至之前的接口
  sex?: boolean
}
// 接口继承（区别于类型别名的独有功能）
interface Student extends Person { // 继承接口内的所有属性，并允许新加入自己的属性
  class: string
}
const student: Student = {
  name: '李子明',
  age: 9,
  sex: true,
  class: '三年六班'
}

// 9.交叉类型
// 实际上，类型别名也支持属性扩充，这就是交叉类型的功能
type Teacher = User & { tel: number }
const teacher: Teacher = {
  name: '李老师',
  age: 29,
  tel: 123456
}

// 10.断言 Assersion
const dom1 = document.getElementById('root')
// const dom2: HTMLElement = document.getElementById('root')
// 对于 document.getElementById 这个语句，编辑器会推断出，你会找出一个 HTMLElement 类型的数据
// 但是现在，我不要你觉得，我要我觉得，因为我很清楚的，我的页面根本就没有一个 id 为 root 的节点
// 所以我断言 document.getElementById('root') 它肯定是 null，而不可能是编辑器推断出的 HTMLElement 类型，咱就是这么硬气
// 那么有以下两种写法可以满足你
const dom3: null = document.getElementById('root') as null
const dom4: null = <null>document.getElementById('root')
// 有时，编辑器同样也会很强硬，一就是一，二就是二，你再怎么觉得都没有用，比如
const number1: number = 123
// 123 它就是 number 类型，你觉得他是 string 那你就是在放屁，所以下面这个写法编辑器就会给你报红错
// const number2: string = 123 as string
// 那你说，人定胜天，是魔是仙，我说了才算，我说它是 string 它就必须是 string，今天就是天王老子来了都没用，好，你牛逼，可以，你这样写就行
const number3: string = 123 as any as string // as any 之后，你再把它转定义成什么类型都是允许的，但是这样做是很危险且离谱的行为，一般不建议这么搞

// 11.字面量类型
// 什么是字面量类型，比如
const a: '123'|123 = 123
// 字面量类型不属于 string、number、Array 等任何类型，所以他们的类型是不可以通等的，例如上面这个 a，它规定了它的值只能是 '123' 或 123，不能赋值任何其他值，其他类型也和它没有任何交集
// 在 ts 里，字面量类型中默认不区分 null 和 undefined，这是一个默认的缺陷，一般我们需要指定 tsconfig.compilerOptions.strictNullChecks 为 true，来规避这样的缺陷，注意喽，这么配置过后，第 10 里的 dom1 和 dom2 就会非常严谨了，编辑器会主动判断出你有可能是 null 类型

// 12. void 
// void 最为一个函数的返回值类型，当配置此类型时，该函数不得返回除了 undefined 之外的任何类型，类似与定义了判断类型为 undefined
function returnUndefined (params: number): void {
  return undefined
}
function noReturn (params: number): void {
  return // 不返回任何值和返回 undefined 是一样的
}