function zipWith(as: any[], bs: any[], f: function): any[] {
  return as.map((a, i) => f(a, bs[i]))
}

function times(x, y) {
  return x * y
}

function plus(x, y) {
  return x + y
}

function sum(xs: Number[]) {
  return xs.reduce(plus)
}
