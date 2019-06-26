abstract class Renderable {
  constructor(public thing: any) {}
  abstract render(): void
}

class Renderer {
  renderables: Renderable[] = []

  add(thing: any): void {
    this.renderables.push(Renderer.toRenderable(thing))
  }
  static toRenderable(thing: any): Renderable {
    return thing as Renderable
  }
  render(): void {
  }
}

// class RocketView implements Renderable {
//   constructor(public thing: any) {}
//   render(): void {
//
//   }
// }

export default new Renderer()
