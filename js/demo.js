const func1 = ({x1, y1}, {x2, y2}) => {
  return [x2 - x1, y2 - y1]
}
console.log(func1({x1: 1, y1: 1}, {x2: 2, y2: 2}))