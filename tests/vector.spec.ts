import { expect } from 'chai'
import { Vector, Vector2D, Vector3D } from '../src/vector'

describe('Vector2D', () => {
  let a: Vector2D, b: Vector2D

  beforeEach(() => {
    a = new Vector2D(5, 7)
    b = new Vector2D(-12, 37)
  })

  it('has coordinates', () => {
    expect(a.x).to.be.equal(5)
    expect(a.y).to.be.equal(7)
  })

  it('adds', () => {
    expect(a.add(b).equals(new Vector2D(-7, 44))).to.be.true
  })
  it('negates', () => {
    expect(a.negate().equals(new Vector2D(-5, -7))).to.be.true
  })
  it('subtracts', () => {
    expect(a.subtract(b).equals(new Vector2D(17, -30))).to.be.true
  })
  it('scales', () => {
    expect(a.scale(2).equals(new Vector2D(10, 14))).to.be.true
  })
})

describe('Vector', () => {
  let a: Vector, b: Vector

  beforeEach(() => {
    a = new Vector(0, 1, 2, 3)
    b = new Vector(-2, -3, 5, 7)
  })

  it('checks equality', () => {
    expect(a.equals(new Vector(0, 1, 2, 3))).to.be.true
    expect(a.equals(new Vector(5, 6))).to.be.false
    expect(a.equals(new Vector(0, 1, -2, 3))).to.be.false
  })

  it('dots', () => {
    expect(a.dot(b)).to.equal(28)
  })

  it('adds', () => {
    expect(a.add(b).equals(new Vector(-2, -2, 7, 10))).to.be.true
  })
  it('negates', () => {
    expect(a.negate().equals(new Vector(0, -1, -2, -3))).to.be.true
  })
  it('subtracts', () => {
    expect(a.subtract(b).equals(new Vector(2, 4, -3, -4))).to.be.true
  })
  it('scales', () => {
    expect(a.scale(2).equals(new Vector(0, 2, 4, 6))).to.be.true
  })
})

describe('Vector3D', () => {
  let a: Vector3D, b: Vector3D

  beforeEach(() => {
    a = new Vector3D(0, 2, 4)
    b = new Vector3D(1, 3, 5)
  })

  it('has coordinates', () => {
    expect(a.x).to.be.equal(0)
    expect(a.y).to.be.equal(2)
    expect(a.z).to.be.equal(4)
  })

  it('adds', () => {
    expect(a.add(b).equals(new Vector3D(1, 5, 9))).to.be.true
  })
  it('negates', () => {
    expect(a.negate().equals(new Vector3D(0, -2, -4))).to.be.true
  })
  it('subtracts', () => {
    expect(a.subtract(b).equals(new Vector3D(-1, -1, -1))).to.be.true
  })
  it('scales', () => {
    expect(a.scale(2).equals(new Vector3D(0, 4, 8))).to.be.true
  })

  it('crosses', () => {
    expect(a.cross(b).equals(new Vector3D(-2, 4, -2))).to.be.true
    let i = new Vector2D(1, 0)
    let j = new Vector2D(0, 1)
    let k = new Vector3D(0, 0, 1)
    expect(i.cross(j).equals(k)).to.be.true
    expect(j.cross(k).equals(i)).to.be.true
    expect(i.cross(k).equals(j.negate())).to.be.true
  })
})
