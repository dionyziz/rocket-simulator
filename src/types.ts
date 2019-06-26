import { Vector2D, Vector3D } from './vector'

export interface Type<T> extends Function { new (...args: any[]): T }

export type Torque = Vector3D
export type Force = Vector2D
export type Mass = number
export type MomentOfInertia = number

export type Position = Vector2D
export type Velocity = Vector2D
export type Acceleration = Vector2D

export type Angle = number
export type AngularVelocity = number
export type AngularAcceleration = number
