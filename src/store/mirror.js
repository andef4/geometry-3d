export default function ({ commit }, { a, b, c, d }) {
  // make unit vector from a b c
  let length = Math.sqrt(a * a + b * b + c * c)
  a /= length
  b /= length
  c /= length

  // distance of plane from origin
  d = d / length

  let matrix = [[1 - 2 * a * a, -2 * a * b, -2 * a * c, -2 * a * d],
           [-2 * a * b, 1 - 2 * b * b, -2 * b * c, -2 * b * d],
           [-2 * a * c, -2 * b * c, 1 - 2 * c * c, -2 * c * d],
           [0, 0, 0, 1]]
  commit('applyMatrix4', { matrix })
}
