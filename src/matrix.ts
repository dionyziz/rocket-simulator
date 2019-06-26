import R from 'ramda'
import { Type } from './types'
import { Vector, Vector2D, Vector3D } from './vector'
import assert from 'assert'

export class Matrix {
  constructor(public data: number[][]) {}
  toVector(): Vector | Vector2D | Vector3D {
    assert(this.data[0].length == 1)

    let vectorData = this.data.map(([x]) => x)
    let vectorClass: Type<Vector> = Vector

    if (this.data.length == 3) {
      vectorClass = Vector3D
    }
    if (this.data.length == 2) {
      vectorClass = Vector2D
    }
    return new vectorClass(vectorData)
  }
  transpose(): Matrix {
    return new Matrix(R.transpose(this.data))
  }
  cols(): number[][] {
    return this.transpose().data
  }
  rows(): number[][] {
    return this.data
  }
  multiplyWithVector(other: Vector): Vector | Vector2D | Vector3D {
    return this.multiply(other.toMatrix()).toVector()
  }
  multiply(other: Matrix): Matrix {
    return new Matrix(
      this.rows().map(
        (row: number[]) => other.cols().map(
          (col: number[]) => (new Vector(row)).dot(new Vector(col))
        )
      )
    )
  }
}
