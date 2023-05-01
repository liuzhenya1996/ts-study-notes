// 对象类型和结构语法要分清
function function123 ({a: i = 1, b: j = '2'}: { a: number, b: string }) {
  console.log(i, j)
}

// 接口中的只读属性
interface a {
  readonly b: string,
  c: number
}

const aObj: a = {
  b: '1',
  c: 2
}

aObj.c = 3
// aObj.b = '4' // 不可修改

// 如何给对象扩展无数属性
interface b {
  [key: string]: number | string | boolean,
  length: number // 除了 length 之外，b 接口可以扩展任意 number | string | boolean 类型的属性
}
const bObj: b = {
  i: 1,
  j: '2',
  k: true,
  length: 0
}