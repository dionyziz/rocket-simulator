import { Vector2D, Vector3D } from './vector'
import {
  Position,
  Velocity,
  Acceleration,
  Force,
  Angle,
  AngularVelocity,
  AngularAcceleration,
  Torque,
  MomentOfInertia
} from './types'

interface Integratable {
  integrate(dt: number): void
}

class PointThing implements Integratable {
  velocity: Velocity = new Vector2D(0, 0)
  acceleration: Acceleration = new Vector2D(0, 0)
  force: Force = new Vector2D(0, 0)
  angle: Angle = 0
  angularVelocity: AngularVelocity = 0
  angularAcceleration: AngularAcceleration = 0
  torque: Torque = new Vector3D(0, 0, 0)
  momentOfInertia: MomentOfInertia = 1

  constructor(public position: Vector2D, public mass = 1) {}
  integrate(dt: number): void {
    // Newton's Second Law
    this.acceleration = this.force.scale(1 / this.mass)

    this.velocity.integrate(this.acceleration, dt)
    this.position.integrate(this.velocity, dt)

    // Newton's Second Law of Rotation
    this.angularAcceleration = this.torque.length() * Math.sign(this.torque.z) / this.momentOfInertia

    this.angularVelocity += dt * this.angularAcceleration
    this.angle += dt * this.angularVelocity
  }
}

let dell = 10

class Rod extends PointThing {
  constructor(position: Vector2D, public length: number) {
    super(position)
  }
  calculateTorqueFromForce(force: VectorField): Torque {
    let torque: Torque = new Vector3D(0, 0, 0)
    let rodVector = Vector2D.fromPolar(1, this.angle)

    // Line integral over the rod
    for (let ell = -length / 2; ell < length / 2; ell += dell) {
      let relativePosition: Position = rodVector.scale(ell)
      let absolutePosition: Position = this.position.add(relativePosition)
      let f = force(absolutePosition)
      torque = torque.add(relativePosition.cross(f))
    }

    return torque
  }
}

class Rocket extends Rod {
}

type VectorField = (r: Position) => Vector2D

function nil(_: Position) {
  return new Vector2D(0, 0)
}

class Universe {
  things: Integratable[] = []
  air: VectorField = nil

  add(thing: Integratable): void {
    this.things.push(thing)
  }
  integrate(dt: number): void {
    for (let thing of this.things) {
      thing.integrate(dt)
    }
  }
}

let universe = new Universe()
let rocket = new Rocket(new Vector2D(0, 0), 5)
universe.air = nil
universe.add(rocket)

export default universe
