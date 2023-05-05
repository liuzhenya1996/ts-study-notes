// 枚举类型的意思就是字面的意思，用于存放枚举值的类型
enum Enum050501 {
  i,
  j,
  k
}
console.log(Enum050501.i) // => 0 // 枚举项对应的值从 0 开始往下递增 1
console.log(Enum050501.j) // => 1
console.log(Enum050501.k) // => 2


enum Enum050502 {
  i = 2, // 枚举项对应的初始值可以被重新赋值，后续的值从 这个初始值 开始往下递增 1
  j,
  k
}
console.log(Enum050502.i) // => 2
console.log(Enum050502.j) // => 3
console.log(Enum050502.k) // => 4
// 枚举值可以被反向查询
console.log(Enum050502[2]) // => i
console.log(Enum050502[3]) // => j
console.log(Enum050502[4]) // => k
console.log(Enum050502[5]) // => undefined // 不存在的查询值输出 undefined

enum Enum050503 {
  i,
  j = 15, // 任意枚举项都可以被重新赋值，后续的值从 这个值 开始往下递增 1，之前的值不受影响
  k,
  l = 78,
  m,
  n
}
console.log(Enum050503.i) // => 0
console.log(Enum050503.j) // => 15
console.log(Enum050503.k) // => 16
console.log(Enum050503.l) // => 78
console.log(Enum050503.m) // => 79
console.log(Enum050503.n) // => 80