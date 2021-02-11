export type BoardArr = number[][]
export type Vertex = [number, number]
export type Sign = 0 | -1 | 1

export const deepcloneArray = (arr: BoardArr) => {
  let re = []
  for (let i = 0; i < arr.length; i++) {
    let [...arr1] = arr[i]
    re.push(arr1)
  }
  return re
}

export const compareArray = (arr1: BoardArr, arr2: BoardArr) => {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1.length; j++) {
      let value1 = arr1[i][j]
      let value2 = arr2[i][j]
      if (value1 !== value2) {
        return false
      }
    }
  }
  return true
}

export const vertexEquals = ([x1, y1]: Vertex, [x2, y2]: Vertex) => {
  return x1 === x2 && y1 === y2
}
