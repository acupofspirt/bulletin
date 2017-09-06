import draw from './draw.js'
import settings from './settings.js'
import context from './context.js'

const {canvasHeight, canvasWidth, playerSize} = settings,
      canvas = context.canvas

function calculateMouseAngle (player) {
  const {mxLast, myLast, x, y} = player,
        {top, left} = canvas.getBoundingClientRect(),
        relativeX = mxLast - left - x,
        relativeY = myLast - top - y

  player.mx = relativeX
  player.my = relativeY
  player.mNg = Math.atan2(relativeY, relativeX)
}

function reactOnUserMouse (player) {
  // react only if mouse pressed
  if (!player.mousePressed) {
    return undefined
  }

  const relativeX = player.mx,
        relativeY = player.my
  let normalizedAngle = Math.abs(player.mNg * 180 / Math.PI % 90)

  // Make sure that angle calculates from x axis
  if (relativeX < 0) {
    normalizedAngle = 90 - normalizedAngle
  }

  // cast 90 to 1, 45 to 0.5, and 0 to 0, and etc...
  const yMovementFactor = normalizedAngle * settings.degreeNormalizeUnit,
        xMovementFactor = 1 - yMovementFactor

  // top
  if (relativeY < 0) {
    player.yVel -= yMovementFactor
  }
  // bottom
  else if (relativeY > 0) {
    player.yVel += yMovementFactor
  }
  // right
  if (relativeX > 0) {
    player.xVel += xMovementFactor
  }
  // left
  else if (relativeX < 0) {
    player.xVel -= xMovementFactor
  }
}

function calculatePlayerPosition (player) {
  const quadricFriction = Math.pow(player.friction, 2),
        maxXCoordinate = canvasWidth - playerSize,
        maxYCoordinate = canvasHeight - playerSize

  player.xVel *= player.friction
  player.x += player.xVel

  player.yVel *= player.friction
  player.y += player.yVel

  // Edge checks
  if (player.x >= maxXCoordinate) {
    player.x = maxXCoordinate
    // slow down player on edge collision
    // and kick him back
    player.xVel *= -quadricFriction
    player.yVel *= quadricFriction
  }
  else if (player.x <= playerSize) {
    player.x = playerSize
    player.xVel *= -quadricFriction
    player.yVel *= quadricFriction
  }

  if (player.y >= maxYCoordinate) {
    player.y = maxYCoordinate
    player.xVel *= quadricFriction
    player.yVel *= -quadricFriction
  }
  else if (player.y <= playerSize) {
    player.y = playerSize
    player.xVel *= quadricFriction
    player.yVel *= -quadricFriction
  }

  // Speed limit
  if (Math.abs(player.xVel) > player.maxVel) {
    if (player.xVel > 0) {
      player.xVel = player.maxVel
    }
    else {
      player.xVel = -player.maxVel
    }
  }
  else if (Math.abs(player.xVel) < player.minVelTreshold) {
    player.xVel = 0
  }

  if (Math.abs(player.yVel) > player.maxVel) {
    if (player.yVel > 0) {
      player.yVel = player.maxVel
    }
    else {
      player.yVel = -player.maxVel
    }
  }
  else if (Math.abs(player.yVel) < player.minVelTreshold) {
    player.yVel = 0
  }
}

function clearScene (ctx) {
  ctx.clearRect(0, 0, 900, 506)
}

function drawScene (ctx, state) {
  const player = state.player.one

  clearScene(ctx)

  calculateMouseAngle(player)
  reactOnUserMouse(player)
  calculatePlayerPosition(player)

  draw.player(ctx, state.player.one)
}

export default function startScene (ctx, state) {
  function gameLoop () {
    drawScene(ctx, state)

    requestAnimationFrame(gameLoop)
  }

  requestAnimationFrame(gameLoop)
}