export function complexMultiplication (c1, c2) {
  return {
    re: c1.re * c2.re - c1.im * c2.im,
    im: c1.re * c2.im + c1.im * c2.re
  }
}

export function complexRotation (angle) {
  let radians = angle * (Math.PI / 180)
  return {re: Math.cos(radians), im: Math.sin(radians)}
}
