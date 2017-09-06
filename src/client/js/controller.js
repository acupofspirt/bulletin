import state from './state.js'
import context from './context.js'

const canvas = context.canvas,
      degreeNormalizeUnit = 1 / 90

function shoot () {}

function keyboardController ({keyCode}) {
  switch (keyCode) {
    case 32: shoot()

      break
  }
}

function onMouseMove ({clientX, clientY}) {
  const {top, left} = canvas.getBoundingClientRect(),
        relativeX = clientX - left - state.player.one.x,
        relativeY = clientY - top - state.player.one.y

  state.player.one.mxLast = clientX
  state.player.one.myLast = clientY

  if (state.player.one.mousePressed) {
    let normalizedAngle = Math.abs(state.player.one.mNg * 180 / Math.PI % 90)

    // Make sure that angle calculates from x axis
    if (relativeX < 0) {
      normalizedAngle = 90 - normalizedAngle
    }

    // cast 90 to 1, 45 to 0.5, and 0 to 0, and etc...
    const yMovementFactor = normalizedAngle * degreeNormalizeUnit,
          xMovementFactor = 1 - yMovementFactor

    // top
    if (relativeY < 0) {
      state.player.one.yVel -= yMovementFactor
    }
    // bottom
    else if (relativeY > 0) {
      state.player.one.yVel += yMovementFactor
    }
    // right
    if (relativeX > 0) {
      state.player.one.xVel += xMovementFactor
    }
    // left
    else if (relativeX < 0) {
      state.player.one.xVel -= xMovementFactor
    }
  }
}

function onMouseDown ({clientX, clientY}) {
  const {top, left} = canvas.getBoundingClientRect(),
        relativeX = clientX - left - state.player.one.x,
        relativeY = clientY - top - state.player.one.y

  state.player.one.mousePressed = true

  let normalizedAngle = Math.abs(state.player.one.mNg * 180 / Math.PI % 90)

  // Make sure that angle calculates from x axis
  if (relativeX < 0) {
    normalizedAngle = 90 - normalizedAngle
  }

  // cast 90 to 1, 45 to 0.5, and 0 to 0, and etc...
  const yMovementFactor = normalizedAngle * degreeNormalizeUnit,
        xMovementFactor = 1 - yMovementFactor

  // top
  if (relativeY < 0) {
    state.player.one.yVel -= yMovementFactor
  }
  // bottom
  else if (relativeY > 0) {
    state.player.one.yVel += yMovementFactor
  }
  // right
  if (relativeX > 0) {
    state.player.one.xVel += xMovementFactor
  }
  // left
  else if (relativeX < 0) {
    state.player.one.xVel -= xMovementFactor
  }
}

function onMouseUp () {
  state.player.one.mousePressed = false
}


document.addEventListener('keydown', keyboardController)
document.addEventListener('mousemove', onMouseMove)
document.addEventListener('mousedown', onMouseDown)
document.addEventListener('mouseup', onMouseUp)