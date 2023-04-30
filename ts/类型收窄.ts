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

// 4.使用 in 或 instanceof 收窄
type Fish = {
  swim: string
}

type Bird = {
  fly: string
}

function test1 (params: Fish | Bird) {
  if ('swin' in params) {
    return params.swin
  }
}

function test2 (params: Date | String) {
  if (params instanceof String) return params.trim()
}

// 5.使用类型陈述语句收窄
function test3 (params: Fish | Bird): params is Fish {
  if ((params as Fish).swim !== undefined) return true
  else return false
}

function test4 (params: Fish | Bird) {
  if (test3(params)) return params.swim
}