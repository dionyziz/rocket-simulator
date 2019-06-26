import universe from './universe'
import renderer from './render'

let t: number = Date.now()

function tick() {
  let dt = Date.now() - t
  t = Date.now()
  universe.integrate(dt)
  renderer.render()
  window.requestAnimationFrame(tick)
}

tick()
