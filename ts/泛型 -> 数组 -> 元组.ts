// 在这里，详细的理解下 typescript 中泛型的概念
/**
 * 泛型说的直白点，其实就是类型参数，一个类型我事先并不知道他会是什么类型，可能是 number、string、Boolean 等等，那我就先写个 Type 在这里，你定义具体的数据时传进来你想要的类型就行
 * 这里要区别范型和泛型这两个概念，范型又叫范型编程，是一种使用模板使代码高效重用的技术(范型类和范型函数)，常用于 Java 编程思想，typescript 中并未提及这个概念
 */

interface AnyType<Type> { // 我里面有一个 i 属性，但是我不知道他会是什么类型，先写个类型参数 Type 在这里
  i: Type // i 就用刚刚定义的 Type，具体是什么，不知道，用的时候再说
}

const typeString: AnyType<string> = {i: '1234'} // 我传入的是 string，那么 i 就是 string 类型
const typeNumber: AnyType<number> = {i: 1234} // 我传入的是 number，那么 i 就是 number 类型

// 使用泛型来扩展生成新的类型
// 现在我需要定义一个 类型变量 或 null
type TypeOrNull<Type> = Type | null;
const a1: TypeOrNull<string> = '123';
const a2: TypeOrNull<string> = null;

// 现在我需要定义一个 类型变量 或 该类型变量组成的数组
type OneOrArr<Type> = Type | Type[];
const b1: OneOrArr<string> = '123';
const b2: OneOrArr<string> = ['123'];

// 现在我需要定义一个 类型变量 或 该类型变量组成的数组 或 null，那么我就有以下两种写法
type OneOrArrOrNull1<Type> = OneOrArr<Type> | null // 直接使用刚刚定义的 OneOrArr 再手动扩充一个 null
type OneOrArrOrNull2<Type> = TypeOrNull<OneOrArr<Type>> // 使用刚刚定义的 TypeOrNull 和 OneOrArr 组合，由 TypeOrNull 作外层，OneOrArr 作为类型参数传入 TypeOrNull

const c1: OneOrArrOrNull1<string> = null
const c2: OneOrArrOrNull1<string> = '123'
const c3: OneOrArrOrNull1<string> = ['123']

const d1: OneOrArrOrNull2<string> = null
const d2: OneOrArrOrNull2<string> = '123'
const d3: OneOrArrOrNull2<string> = ['123']

// 接下来讲讲数组
// 我们知道在 ts 中定义一个数组可以用以下两种方式
const arr1: string[] = ['1', '2']
const arr2: Array<string> = ['1', '2']
// 我们发现了，第二种这种声明数组的方法，非常像是用了泛型的概念，其实这种方式确实是运用了泛型的，我们可以根据泛型的理解来推断下 Array 这个类型的实现方式
// 在这里为防止重名，我们就用 Array1 吧
interface Array1<Type> {
  [key: number]: Type, // 每个下标都是数字，对应的值的类型是传入的类型
  length: number, // 数组有个长度
  push: (...items: Type[]) => number, // 有各种各样的内置方法
  pop: () => number | undefined
}
// 其实 Array 类内部实现逻辑大概就是这个样子了


// 接下来讲讲元组 (Tuple)
// 指定了每一项元素的类型的数组，叫做元组
type tuple = [number, string]
const tuple1: tuple = [1, '2']

// 元组支持 readonly
type tupleReadyOnly = readonly [number, string]
const tuple2: tupleReadyOnly = [1, '2']
// tuple2[1] = '3' // 不可修改

// 元组虽说和数组很像，但是和数组不是一个类型，不可以将数组类型和元组类型互通
function func4 ([num, str]: tuple) {
  console.log(num, str)
}
const arr = [1, '2']
// func4(arr) // 不允许，因为 arr 在定义时未声明类型，因此被推断为 数组类型，但是函数仅支持传入 元组类型
const arr3: tuple = [1, '2']
func4(arr3) // 必须在声明时即表明他是元祖类型才可以传入