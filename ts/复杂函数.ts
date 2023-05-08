// 1.如何定义一个有属性的函数
interface FuncWithAttr {
  attr1: string,
  (params1: string): number
}

const funcWithAttr: FuncWithAttr  = (params1: string) => {
  return 123
}
funcWithAttr.attr1 = '234'

// 2.函数和泛型
function getArrFirt<Type> (params: Type[]): Type { // 在函数名称后使用 <> 传入 Type，后续就可以指定入参是这个 Type，出参也可以指定是这个 Type
  return params[0]
}
getArrFirt([1, 2, 3])

// 3.函数重载
// 一个函数可以多次声明，在实现该函数时，则需要按照每一个声明的要求实现（这里我不太吃得透）
function function1 (params1: string): string
function function1 (params1: string, params2: string): number
function function1 (params1: string, params2?: string) {
  if (typeof params2 === 'string') return params2.length + 2 // 这里两个茶树必须要要上其中一个，否则就报红第二次函数声明没有实现
  else return params1 // 这里貌似必须要用上 params1 这个入参，否则就报红说第一次的函数声明没有实现
}

// 4.函数的入参允许可选
function fucn050801 (par1: number, par2: number, par3?: number) {
  return par1 + par2 + (par3 || 0)
}
// 可选参数必须放在最后，否则会报红
// function fucn050802 (par1: number, par2?: number, par3: number) { // 必选参数不能位于可选参数后
//   return par1 + (par2 || 0) + par3
// }