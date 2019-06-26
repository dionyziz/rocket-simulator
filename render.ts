function render() {

}

class ThingView {
  constructor(thing: Thing) {
    this.thing = thing
  }
}

class RocketView extends ThingView {
}

let rocketView = new RocketView(rocket)
