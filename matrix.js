class Matrix {
  constructor(data: Number[][]) {
    this.data = data
  }
  toVector(): Vector2D {
    assert(this.data.length == 2)
    assert(this.data[0].length == 1)
  }
  cols() {

  }
  rows() {
    return this.data
  }
  multiplyWithVector(other: Vector2D): Vector2D {
    return this.multiply(other.toMatrix()).toVector()
  }
  multiply(other: Matrix): Matrix {
    return zipWith(this.rows(), other.cols(), dot)
  }
}
