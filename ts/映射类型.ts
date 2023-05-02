// 映射类型有点像是遍历类型中的属性的感觉
// 1.映射基础语法
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


// 2.字面量语法
// 现在有个接口 infer050201
interface infer050201 {
  name: string,
  age: number,
  isMale: boolean
}
// 要通过它映射出来下面这样
interface infer050202 {
  getName: () => string,
  getAge: () => number,
  getIsMale: () => boolean
}
// 需要 Capitalize
type TypeToStr<Type> = string & Type
type TransToGetFunctions<T> = {
  [key1 in keyof T as `get${Capitalize<TypeToStr<key1>>}`]: () => T[key1] // Capitalize 接受一个 string 类型，将会转换首字母为大写，更多转换 API => https://blog.csdn.net/yehuozhili/article/details/122162473
}
type infer050203 = TransToGetFunctions<infer050201>


// 3. 遍历联合类型
// 有两个类，分别是圆形和方形
interface Circle {
  shapeName: 'Circle',
  radius: number
}
interface Square {
  shapeName: 'Square',
  length: number,
  width: number
}
// 现在我要遍历这两个类，取出他们共同的属性 shapeName，组成下面这样的类
interface ShapeNames {
  Circle: (name: 'Circle') => number,
  Square: (name: 'Square') => number
}
// 需要用到 in 遍历，并用 as 转换取出 shapeName
type GetShapeNames<T extends { shapeName: string }> = { // 这里还是要再继承一下 Shape 类，因为入参 T 是未知的，并不确定里面有没有 shapeName 属性
  [key2 in T as T['shapeName']]: (name: key2) => key2 // 这里好像不太对，不知道为啥，key2 本身就是从 T as T['shapeName'] 里面遍历的，是一个确定的 item，但是下面 ShapeNames1 得到的却是 (name: Circle | Square) => Circle | Square，和老师讲的不一样呢
}
type ShapeNames1 = GetShapeNames<Circle | Square>

