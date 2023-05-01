// 先看一个简单的条件判断
interface Animal {
  breathe: () => {}
}
interface Dog extends Animal {
  bark: () => {}
}
type DogIsNumber = Dog extends Animal ? number : string // Dog 是否继承了 Animal，如果继承了，走 true，否则走 false
type DogIsString = Dog extends {breathe: Function} ? string : number // 注意继承的条件判断仅仅判断是否有相同的属性名和类型，不会很严格，只要属性和类型对上就行了


// 现在有一个需求，一个函数的入参可能是 string 或 number，出参可能是类型 inter1 或 inter2，需要实现当入参是 string 时，出参 inter1，否则出参 inter2，我们需要用函数重载来实现
interface inter1 { name: string }
interface inter2 { id: number }
function func050105 (par: string): inter1 // 定义一个函数，入参 string，出参 inter1
function func050105 (par: number): inter2 // 重定义（即重载）这个函数，入参 number，出参 inter2
function func050105 (par: string | number): inter1 | inter2 { // 实现这个函数
  if (typeof par === 'string') return { name: 'lee' } // 命中初始定义时
  else return { id: 1 } // 命中重定义时
}
const getInter1 = func050105('123') // 命中了初始定义，入参 string，出参 inter1
const getInter2 = func050105(123) // 命中了重载，入参 number，出参 inter2

// 但是这样实现过于复杂，我们可以利用刚刚的条件判断来实现
// 先定义一个条件判断
type IsNumInter1<T> = T extends number ? inter2 : inter1 // 接收一个类型参数 T，T 是 number 时，IsNumInter1 是 inter2，否则是 inter1
// 再定义一个函数
function func050106<T extends string | number> (par: T): IsNumInter1<T> // 定义一个类型参数 T，有 string 和 number 两种类型，函数入参用这个类型 T，把这个类型直接传入 IsNumInter1，让它自己去做判断
// 再实现这个函数
function func050106 (par: string | number): inter1 | inter2 {
  if (typeof par === 'string') return { name: 'lee' }
  else return { id: 1 }
}
const getInter3 = func050106('123') // 命中了初始定义，入参 string，出参 inter1
const getInter4 = func050106(123) // 命中了重载，入参 number，出参 inter2


// 再说一个需求，现在我有一个接口 inter3，里面有一个属性叫 message，类型未知，我现在需要判断另一个接口 inter4 里面有没有这个 message 属性（也就是说是不是继承了 inter3），如果继承了，则返回 inter4 里面 message 属性的类型，我们实现下
interface inter3 { message: unknown }
type GetMessageType<T> = T extends inter3 ? T['message'] : never
interface inter4 { name: number, message: string} // 很明显 inter4 里面继承了 inter3，我需要拿到的就是 inter4 里面的 massage 的类型 string
type messageType = GetMessageType<inter4> // 这个语句可以看作函数写法，传入一个类型参数为 inter4，得到一个 类型 为 string
const messageString: messageType = '123'


// 说个概念： infer
// infer 可以理解为函数出参类型指向，一般和 extends 配合使用，比如，一个函数的出参是什么类型我不知道，也不想知道，我只想继承这个类型用作类型判断，那么
type GetReturnType<T> = T extends () => infer returnType ? returnType : never // 意思就是如果类型入参是函数，则得到函数出参的类型，否则得到 never
type FuncReturnString = () => string
type GetReturnType1 = GetReturnType<FuncReturnString> // 传入函数类型，得到函数的出参类型
type StrType = string
type GetReturnType2 = GetReturnType<StrType> // 传入的不是函数类型，得到 never 类型


// 需求，传入一个继承 any 的类型，得到这个由这个类型组成的数组，否则得到 never
type GetArrType<T> = T extends any ? T[] : never
type StrArr = GetArrType<string>
type NeverArr = GetArrType<never>

// 需求延伸，传入联合类型，得到这个联合类型组成的数组
// 如果我们直接用刚刚声明的 GetArrType 来搞
type StrArrOrNumArr = GetArrType<string | number> // 会发现不太对，这样我们只能得到 string[] 或者 number【】，那么如何得到 (string | number)[] 呢，这样做
type GetUnionArrType<T> = [T] extends [any] ? T[] : never
type StrOrNumArr = GetUnionArrType<string | number> // 这样就对了
