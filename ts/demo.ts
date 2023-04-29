type dl = {
  x: number,
  y: number
}
interface dd {
  a: string,
  b: number
}
function func (dl1: dl, dl2: dl) {
  return [dl2.x - dl1.x, dl2.y - dl1.y]
}
console.log(func({x: 1, y: 1}, {x: 2, y: 2}))
const b:dd = { a: '1', b: 2 }