// 映射类型有点像是遍历类型中的属性的感觉
// 现在有一个类型 infer050101
interface infer050101 {
  readonly a: string,
  readonly b: string
  c?: number
}
// 使用映射复制出另一个类型 infer050103 与 infer050101 一样
type infer050102<Infer> = {
  [key in keyof Infer]: Infer[key]
}
type infer050103 = infer050102<infer050101>

// 使用 -readonly 去除映射过来的 readonly
type infer050104<Infer> = {
  -readonly [key in keyof Infer]: Infer[key]
}
type infer050105 = infer050104<infer050101>

// 使用 -? 将映射过来的可缺属性变为必须属性
type infer050106<Infer> = {
  -readonly [key in keyof Infer] -?: Infer[key] // 到这里就会发现，减号在前就是去除前面的修饰语，减号在后就是去除后面的修饰语
}
type infer050107 = infer050106<infer050101>

// 使用 Exclude 来去掉某个属性，比如去掉属性c
type infer050108<Infer> = {
  [key in keyof Infer as Exclude<key, 'c'>]: Infer[key]
}
type infer050109 = infer050108<infer050107>