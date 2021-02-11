import { BoardArr, deepcloneArray, Sign, Vertex, vertexEquals } from "./utils"

const errorCode = {
  notEmpty: "已经有棋子， 无法落子",
  notAllow: "禁入点",
  notKo: "打劫",
}

export class goBoard {
  board: BoardArr
  size: number
  _koInfo = {
    sign: 0,
    vertex: [-1, -1],
  }
  constructor(size: number, board: BoardArr) {
    this.size = size
    this.board =
      board || new Array(size).fill(undefined).map(_ => new Array(size).fill(0))
  }

  get([x, y]: Vertex) {
    return this.board[y] !== null ? this.board[y][x] : null
  }

  has([x, y]: Vertex) {
    return 0 <= x && x < this.size && 0 <= y && y < this.size
  }

  set([x, y]: Vertex, sign: Sign) {
    if (this.has([x, y])) {
      this.board[y][x] = sign
    }
    return this
  }

  clone() {
    let board = new goBoard(this.size, deepcloneArray(this.board))
    board._koInfo = this._koInfo
    return board
  }

  putChess([x, y]: Vertex, type: Sign) {
    let shadowBoard = this.clone()

    if (shadowBoard.get([x, y]) !== 0) {
      throw errorCode.notEmpty
    } else {
      shadowBoard.set([x, y], type)
      let hasAir = shadowBoard.haveair([x, y])
      let { whitedeads, blackdeads } = shadowBoard.findAllDeadPieces()
      if (!hasAir && (whitedeads.length === 0 || blackdeads.length === 0)) {
        throw errorCode.notAllow
      } else {
        let deads = type === 1 ? blackdeads : whitedeads
        let sign = type === 1 ? -1 : 1
        // 判断劫争
        if (
          deads.length === 1 &&
          this._koInfo.sign === sign &&
          vertexEquals(this._koInfo.vertex as any, deads[0])
        ) {
          throw errorCode.notKo
        }

        if (deads.length === 1) {
          this._koInfo.sign = type
          this._koInfo.vertex = [x, y]
        } else {
          this._koInfo.sign = 0
          this._koInfo.vertex = [-1, -1]
        }
        shadowBoard.clearDeadPieces(deads)
        return shadowBoard
      }
    }
  }

  findAllDeadPieces() {
    let whitedeads: Vertex[] = []
    let blackdeads: Vertex[] = []
    this.board.forEach((_, i) => {
      _.forEach((s, j) => {
        console.log(s)
        let sign = this.get([i, j])
        if (sign !== 0) {
          let alive = this.haveair([i, j])
          if (!alive) {
            let deads = sign === 1 ? whitedeads : blackdeads
            deads.push([i, j])
          }
        }
      })
    })
    return {
      whitedeads,
      blackdeads,
    }
  }

  clearDeadPieces(deads: Vertex[]) {
    deads.forEach(d => {
      this.set(d, 0)
    })
  }

  haveair([x, y]: Vertex, visited: any = {}): boolean {
    let vertex: Vertex = [x, y]
    if ((vertex as any) in visited) return false
    let sign = this.get([x, y])
    let neibours = this.getNeibour([x, y])
    if (neibours.some(n => this.get(n) === 0)) {
      return true
    }
    visited[vertex as any] = true
    return neibours
      .filter(n => this.get(n) === sign)
      .some(n => this.haveair(n, visited))
  }

  getNeibour([x, y]: Vertex) {
    let neibours: Vertex[] = [
      [x, y - 1],
      [x, y + 1],
      [x - 1, y],
      [x + 1, y],
    ]
    return neibours.filter(vertex => this.has(vertex as Vertex))
  }
}
