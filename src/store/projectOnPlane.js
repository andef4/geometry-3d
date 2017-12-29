export default function ({ state, commit }, { a, b, c, d }) {
  for (let i = 0; i < state.coordinates.length; i++) {
    let coordinate = state.coordinates[i]
    let x = coordinate.x
    let y = coordinate.y
    let z = coordinate.z

    let r = -d / (a * x + b * y + c * z)

    coordinate = {
      x: x * r + 0.1,
      y: y * r + 0.1,
      z: z * r + 0.1
    }

    commit('updateCoordinate', { index: i, coordinate: coordinate })
  }
}
