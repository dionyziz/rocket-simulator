class PointThing {
  position: Vector2D
  velocity: Vector2D = new Vector2D(0, 0)
  acceleration: Vector2D = new Vector2D(0, 0)
  force: Vector2D = new Vector2D(0, 0)
  mass: Number = 1
  angle: Number = 0
  angularVelocity: Number = 0
  angularAcceleration: Number = 0
  torque: Number = 0
  momentOfInertia: Number = 1

  constructor(position: Vector2D, mass: Number?) {
    this.position = position
    this.mass = mass
  }
  integrate(dt: Number): void {
    // Newton's Second Law
    this.acceleration = this.force.scale(1 / this.mass)

    this.velocity.integrate(this.acceleration, dt)
    this.position.integrate(this.velocity, dt)

    // Newton's Second Law of Rotation
    this.angularAcceleration = this.torque.scale(1 / this.momentOfInertia)

    this.angularVelocity += dt * this.angularAcceleration
    this.angle += dt * this.angularVelocity
  }
}

let dell = 10

class Rod extends PointThing {
  length: Number

  applyRotationalForce(force: VectorField) {
    for (let ell = -length / 2;
             ell < length / 2;
             ell += dell) {
      this.position(Vector2D.fromPolar(ell, this.angle))
    }
  }
}

class Rocket extends Rod {
}

type VectorField = Vector2D => Vector2D

class Universe {
  things: Thing[]
  air: VectorField

  add(thing: Thing): void {
    this.things.push(thing)
  }
  integrate(dt: Number): void {
    for (let thing of this.things) {
      thing.integrate(dt)
    }
  }
}

function nil(location: Vector2D) {
  return new Vector2D(0, 0)
}

let universe = new Universe()
let rocket = new Rocket()
universe.air = nil
universe.add(rocket)

function integrate(dt) {
  universe.integrate(dt)
}

let t: Integer = Date.now()

function tick() {
  let dt = Date.now() - t
  t = Date.now()
  integrate(dt)
  render()
  requestAnimationFrame(tick)
}

tick()
