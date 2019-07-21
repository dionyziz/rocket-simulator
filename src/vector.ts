import R from 'ramda'
import { Matrix } from './matrix'
import assert from 'assert'
import { equals } from './utils'

export class Vector {
  public data: number[]

  constructor(...args: number[]) {
    this.data = args
  }
  scale(r: number): Vector {
    return this.map(R.multiply(r))
  }
  add(other: Vector): Vector {
    assert(this.data.length == other.data.length)
    return new Vector(...R.zipWith(R.add, this.data, other.data))
  }
  map(f: (x: number) => number): Vector {
    return new Vector(...this.data.map(f))
  }
  negate(): Vector {
    return this.map(R.negate)
  }
  subtract(other: Vector): Vector {
    return this.add(other.negate())
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
  equals(other: Vector): boolean {
    return R.zipWith(equals, this.data, other.data).reduce(R.and)
  }
  length(): number {
    return Math.sqrt(R.sum(this.data.map(x => x * x)))
  }
}

export class Vector3D extends Vector {
  constructor(public x: number, public y: number, public z: number) {
    super(x, y, z)
  }
  lift<T extends Array<any>>(f: (...args: T) => Vector): (...args: T) => Vector3D {
    return (...args: T) => {
      return Vector3D.fromVector(f.apply(this, args))
    }
  }
  scale = this.lift(super.scale)
  add = this.lift(super.add)
  negate = this.lift(super.negate)
  subtract = this.lift(super.subtract)
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
  static fromVector(vector: Vector): Vector3D {
    return new Vector3D(vector.data[0], vector.data[1], vector.data[2])
  }
}

export class Vector2D extends Vector {
  constructor(public x: number, public y: number) {
    super(x, y)
  }
  lift<T extends Array<any>>(f: (...args: T) => Vector): (...args: T) => Vector2D {
    return (...args: T) => {
      return Vector2D.fromVector(f.apply(this, args))
    }
  }
  scale = this.lift(super.scale)
  add = this.lift(super.add)
  negate = this.lift(super.negate)
  subtract = this.lift(super.subtract)
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
  static fromVector(vector: Vector): Vector2D {
    return new Vector2D(vector.data[0], vector.data[1])
  }
}
