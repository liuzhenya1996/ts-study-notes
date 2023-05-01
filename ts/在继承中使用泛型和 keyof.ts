// 现在我们有一个这样的类型
interface p1 {
  name: string
}
function func050101 (params: p1) {
  console.log(params.name)
}
func050101({name: '1'}) // 这样是可以的
// func050101({name: '1', age: 2}) // 但是这样就不行了，因为 func050101 的入参类型是 p1，p1里面不允许有未声明的 age
// 如果我想要解决这个问题，那么我们就用范型和继承结合
function func050102<T extends p1> (params: T) { // 给函数一个泛型，他继承了 p1，需要实现 p1 内的属性 name，其余的属性自己做主即可，ts 不再规约，实际上这里想说就是泛型的自由性，比较高的自主性
  console.log(params.name)
}
func050102({name: '1', age: 2})

// 讲一下 keyof 这个东西
interface p2 {
  name: string,
  age: number
}
const p2Obj: p2 = {
  name: 'dell',
  age: 30
}
function func050103 (params1: p2, key: string) {
  // console.log(params1[key]) // 这里会报错，因为 key 是 string，不一定是 p2 中的属性，所以有潜在风险
}
function func050104<T extends keyof p2> (params1: p2, key: T) { // 泛型继承 keyof p2，表示 T 是 p2 中的属性名类型
  console.log(params1[key])
}
func050104(p2Obj, 'name')
// func050104(p2Obj, '123') // 使用不存在的 key 值会报错
