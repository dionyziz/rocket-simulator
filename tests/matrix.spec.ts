import { expect } from 'chai'
import { Matrix } from '../src/matrix'
import { Vector3D } from '../src/vector'

describe('Matrix', () => {
  let a: Matrix, b: Matrix
  beforeEach(() => {
    a = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
      [0, -1, -2]
    ])
    b = new Matrix([
      [-5, -10, -15],
      [3, 5, 7],
      [0, 0, 0]
    ])
  })

  it('compares', () => {
    expect(a.equals(new Matrix([
      [1, 2, 3],
      [4, 5, 6],
      [0, -1, -2]
    ]))).to.be.true
    expect(a.equals(b)).to.be.false
    expect(a.equals(a)).to.be.true
  })

  it('transposes', () => {
    expect(a.transpose().equals(new Matrix([
      [1, 4, 0],
      [2, 5, -1],
      [3, 6, -2]
    ]))).to.be.true
  })

  it('adds', () => {
    expect(a.add(b).equals(new Matrix([
      [-4, -8, -12],
      [7, 10, 13],
      [0, -1, -2]
    ]))).to.be.true
  })

  it('multiplies', () => {
    expect(a.multiply(b).equals(new Matrix([
      [1, 0, -1],
      [-5, -15, -25],
      [-3, -5, -7]
    ]))).to.be.true
  })

  it('multiplies with vector', () => {
    const v: Vector3D = new Vector3D(6, 0, -1)

    expect(
      a.multiplyWithVector(v).equals(
        new Vector3D(3, 18, 2)
      )
    ).to.be.true
  })
})
