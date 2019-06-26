class Vector {
  constructor(data: Number[]) {
    this.data = data
  }
  scale(r: Number): Vector {
    return this.data.map(times)
  }
  add(other: Vector): Vector {
    assert(this.data.length == other.data.length)
    return new Vector(zipWith(this.data, other.data, plus))
  }
  dot(xs: Number[], ys: Number[]): Number {
    return sum(zipWith(xs, ys, times))
  }
  copyFrom(other: Vector2D): void {
    this.data = [...other.data]
  }
  integrate(derivative: Vector, dt: Number): void {
    this.copyFrom(this.add(derivative.scale(dt)))
  }
  toMatrix(): Matrix {
    return new Matrix(this.data.map(x => [x]))
  }
}

class Vector2D extends Vector {
  constructor(x: Number, y: Number) {
    super([x, y])
  }
  rotate(angle: Number): Vector2D {
    let rotationMatrix = new Matrix([
      [Math.cos(angle), -Math.sin(angle)],
      [Math.sin(angle), Math.cos(angle)]
    ])

    return rotationMatrix.multiplyWithVector(this)
  }
  static fromPolar(length: Number, angle: Number): Vector2D {
    return (new Vector2D(length, 0)).rotate(angle)
  }
}
