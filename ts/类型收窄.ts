// 类型收窄其实就是一个概念，加 if 条件来筛选入参的类型
// 1. 类型收窄
function getUpper (params: number | string) {
  if (typeof params === 'string') return params.toUpperCase()
}

// 2.真值收窄
function getFixed (params?: number) {
  if (params) return params.toFixed(2)
}

// 3.相等收窄
function getEqul (params1: number | string, params2: number | boolean) {
  if (params1 === params2) return params1 + params2 // params1 和 params2相等时，必然都是 number 类型
}