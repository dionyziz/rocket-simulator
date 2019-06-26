import R from 'ramda'
import { Matrix } from './matrix'
import assert from 'assert'

export class Vector {
  constructor(public data: number[]) {}
  scale(r: number): Vector {
    return new Vector(this.data.map(R.multiply(r)))
  }
  add(other: Vector): Vector {
    assert(this.data.length == other.data.length)
    return new Vector(R.zipWith(R.add, this.data, other.data))
  }
  dot(other: Vector): number {
    assert(this.data.length == other.data.length)
    return R.sum(R.zipWith(R.multiply, this.data, other.data))
  }
  copyFrom(other: Vector): void {
    this.data = [...other.data]
  }
  integrate(derivative: Vector, dt: number): void {
    this.copyFrom(this.add(derivative.scale(dt)))
  }
  toMatrix(): Matrix {
    return new Matrix(this.data.map(x => [x]))
  }
  equal(other: Vector): boolean {
    return R.zipWith(R.equals, this.data, other.data).reduce(R.and)
  }
  length(): number {
    return Math.sqrt(R.sum(this.data.map(x => x * x)))
  }
}

export class Vector3D extends Vector {
  constructor(public x: number, public y: number, public z: number) {
    super([x, y, z])
  }
  scale(r: number): Vector3D {
    return super.scale(r) as Vector3D
  }
  add(other: Vector3D): Vector3D {
    return super.add(other) as Vector3D
  }
  cross(other: Vector3D | Vector2D): Vector3D {
    if (other instanceof Vector2D) {
      return this.cross(other.to3D())
    }
    return new Vector3D(
      this.data[1] * other.data[2] - this.data[2] * other.data[1],
      this.data[2] * other.data[0] - this.data[0] * other.data[2],
      this.data[0] * other.data[1] - this.data[1] * other.data[0]
    )
  }
}

export class Vector2D extends Vector {
  constructor(public x: number, public y: number) {
    super([x, y])
  }
  scale(r: number): Vector2D {
    return super.scale(r) as Vector2D
  }
  add(other: Vector2D): Vector2D {
    return super.add(other) as Vector2D
  }
  rotate(angle: number): Vector2D {
    let rotationMatrix = new Matrix([
      [Math.cos(angle), -Math.sin(angle)],
      [Math.sin(angle), Math.cos(angle)]
    ])

    return rotationMatrix.multiplyWithVector(this) as Vector2D
  }
  to3D(): Vector3D {
    return new Vector3D(this.x, this.y, 0)
  }
  cross(other: Vector3D | Vector2D): Vector3D {
    return this.to3D().cross(other)
  }
  static fromPolar(length: number, angle: number): Vector2D {
    return (new Vector2D(length, 0)).rotate(angle)
  }
}
