# @anarchy_zzh/goboard

A Go board data type.

## Installation

Use npm to install:

~~~
$ npm install @anarchy_zzh/goboard
~~~

## Usage

~~~js
const goBoard = require('@anarchy_zzh/goboard')
let board = new Board([
    [ 0, 0, 0,-1,-1,-1, 1, 0, 1, 1,-1,-1, 0,-1, 0,-1,-1, 1, 0],
    [ 0, 0,-1, 0,-1, 1, 1, 1, 0, 1,-1, 0,-1,-1,-1,-1, 1, 1, 0],
    [ 0, 0,-1,-1,-1, 1, 1, 0, 0, 1, 1,-1,-1, 1,-1, 1, 0, 1, 0],
    [ 0, 0, 0, 0,-1,-1, 1, 0, 1,-1, 1, 1, 1, 1, 1, 0, 1, 0, 0],
    [ 0, 0, 0, 0,-1, 0,-1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0],
    [ 0, 0,-1, 0, 0,-1,-1, 1, 0,-1,-1, 1,-1,-1, 0, 1, 0, 0, 1],
    [ 0, 0, 0,-1,-1, 1, 1, 1, 1, 1, 1, 1, 1,-1,-1,-1, 1, 1, 1],
    [ 0, 0,-1, 1, 1, 0, 1,-1,-1, 1, 0, 1,-1, 0, 1,-1,-1,-1, 1],
    [ 0, 0,-1,-1, 1, 1, 1, 0,-1, 1,-1,-1, 0,-1,-1, 1, 1, 1, 1],
    [ 0, 0,-1, 1, 1,-1,-1,-1,-1, 1, 1, 1,-1,-1,-1,-1, 1,-1,-1],
    [-1,-1,-1,-1, 1, 1, 1,-1, 0,-1, 1,-1,-1, 0,-1, 1, 1,-1, 0],
    [-1, 1,-1, 0,-1,-1,-1,-1,-1,-1, 1,-1, 0,-1,-1, 1,-1, 0,-1],
    [ 1, 1, 1, 1,-1, 1, 1, 1,-1, 1, 0, 1,-1, 0,-1, 1,-1,-1, 0],
    [ 0, 1,-1, 1, 1,-1,-1, 1,-1, 1, 1, 1,-1, 1,-1, 1, 1,-1, 1],
    [ 0, 0,-1, 1, 0, 0, 1, 1,-1,-1, 0, 1,-1, 1,-1, 1,-1, 0,-1],
    [ 0, 0, 1, 0, 1, 0, 1, 1, 1,-1,-1, 1,-1,-1, 1,-1,-1,-1, 0],
    [ 0, 0, 0, 0, 1, 1, 0, 1,-1, 0,-1,-1, 1, 1, 1, 1,-1,-1,-1],
    [ 0, 0, 1, 1,-1, 1, 1,-1, 0,-1,-1, 1, 1, 1, 1, 0, 1,-1, 1],
    [ 0, 0, 0, 1,-1,-1,-1,-1,-1, 0,-1,-1, 1, 1, 0, 1, 1, 1, 0]
])
let move = board.putChess([9, 4], 1)
~~~

## API

### board

The board arrangement is represented by an array of arrays. Each of those subarrays represent one row, all containing the same number of integers. `-1` denotes a white stone, `1` a black stone, and `0` represents an empty vertex.

#### Example

~~~js
[[ 0, 0, 1, 0,-1,-1, 1, 0, 0],
 [ 1, 0, 1,-1,-1, 1, 1, 1, 0],
 [ 0, 0, 1,-1, 0, 1,-1,-1, 0],
 [ 1, 1, 1,-1,-1,-1, 1,-1, 0],
 [ 1,-1, 1, 1,-1, 1, 1, 1, 0],
 [-1,-1,-1,-1,-1, 1, 0, 0, 0],
 [ 0,-1,-1, 0,-1, 1, 1, 1, 1],
 [ 0, 0, 0, 0, 0,-1,-1,-1, 1],
 [ 0, 0, 0, 0, 0, 0, 0,-1, 0]]
~~~

### Vertex

Board positions are represented by a vertex, i.e. an array of the form `[x, y]` where `x` and `y` are non-negative integers, zero-based coordinates. `[0, 0]` denotes the upper left position of the board.

---

### `class goBoard`

#### Constructors

##### `new Board(size, [signMap])`

- `signMap` [`<BoardArr>`](#sign-map) *(optional)* - Default: `[]`


#### Properties

##### `board.board`

[`<BoardArr>`](#sign-map) - The underlying sign map of the board.


#### Stone Arrangement Functions

##### `board.get(vertex)`

- `vertex` [`<Vertex>`](#vertex)

Returns the sign at the given `vertex`.

##### `board.set(vertex, sign)`

- `vertex` [`<Vertex>`](#vertex)
- `sign` `<Integer>` - One of `-1`, `0`, or `1`

Sets the sign at the given `vertex`. No validity checks will be made. This function mutates the board and returns `this` to enable chaining.

##### `board.has(vertex)`

- `vertex` [`<Vertex>`](#vertex)

Returns a boolean whether the given `vertex` is valid or can be found on the board.

##### `board.putChess(vertex, sign)`

- `sign` `<Integer>` - One of `-1`, `0`, or `1`
- `vertex` [`<Vertex>`](#vertex)

Returns a new board instance that represents the board state after the player who corresponds to the given `sign` makes a move at `vertex`. The capture count will also be updated correctly. If `board` is [valid](#boardisvalid) then the new returned board instance will also be valid. This function will not mutate `board`. If `sign` is `0` or `vertex` not valid, this function will be equivalent to [`clone()`](#boardclone).


