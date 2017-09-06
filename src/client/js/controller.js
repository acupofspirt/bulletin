import state from './state.js'

function shoot () {}

function keyboardController ({keyCode}) {
  switch (keyCode) {
    case 32: shoot()

      break
  }
}

function onMouseMove ({clientX, clientY}) {
  state.player.one.mxLast = clientX
  state.player.one.myLast = clientY
}

function onMouseDown () {
  state.player.one.mousePressed = true
}

function onMouseUp () {
  state.player.one.mousePressed = false
}

document.addEventListener('keydown', keyboardController)
document.addEventListener('mousemove', onMouseMove)
document.addEventListener('mousedown', onMouseDown)
document.addEventListener('mouseup', onMouseUp)