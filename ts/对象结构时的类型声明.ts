function getAb({ a, b }: { a: number, b: 1 }) { // 结构形参对象时，我们不知道入参的类型，如果想要声明结构出的属性的类型，则需要用这种方式
  return a + b
}
getAb({a: 1, b: 1})