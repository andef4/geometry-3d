export default function (dimension, rotationMatrixX, rotationMatrixY, rotationMatrixZ) {
  let applyMatrix = 'applyMatrix' + dimension.toString()
  let applyMatrixCenter = 'applyMatrixCenter' + dimension.toString()

  return {
    rotateOriginClockwiseX ({commit}) {
      let matrix = rotationMatrixX(15)
      commit(applyMatrix, {matrix})
    },
    rotateOriginCounterClockwiseX ({commit}) {
      let matrix = rotationMatrixX(-15)
      commit(applyMatrix, {matrix})
    },
    rotateOriginClockwiseY ({commit}) {
      let matrix = rotationMatrixY(15)
      commit(applyMatrix, {matrix})
    },
    rotateOriginCounterClockwiseY ({commit}) {
      let matrix = rotationMatrixY(-15)
      commit(applyMatrix, {matrix})
    },
    rotateOriginClockwiseZ ({commit}) {
      let matrix = rotationMatrixZ(15)
      commit(applyMatrix, {matrix})
    },
    rotateOriginCounterClockwiseZ ({commit}) {
      let matrix = rotationMatrixZ(-15)
      commit(applyMatrix, {matrix})
    },

    rotateCenterClockwiseX ({dispatch}) {
      let matrix = rotationMatrixX(15)
      dispatch(applyMatrixCenter, {matrix})
    },
    rotateCenterCounterClockwiseX ({dispatch}) {
      let matrix = rotationMatrixX(-15)
      dispatch(applyMatrixCenter, {matrix})
    },
    rotateCenterClockwiseY ({dispatch}) {
      let matrix = rotationMatrixY(15)
      dispatch(applyMatrixCenter, {matrix})
    },
    rotateCenterCounterClockwiseY ({dispatch}) {
      let matrix = rotationMatrixY(-15)
      dispatch(applyMatrixCenter, {matrix})
    },
    rotateCenterClockwiseZ ({dispatch}) {
      let matrix = rotationMatrixZ(15)
      dispatch(applyMatrixCenter, {matrix})
    },
    rotateCenterCounterClockwiseZ ({dispatch}) {
      let matrix = rotationMatrixZ(-15)
      dispatch(applyMatrixCenter, {matrix})
    }
  }
}
