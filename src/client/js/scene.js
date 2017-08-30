import draw from './draw.js'
import settings from './settings.js'
import context from './context.js'

const { canvasHeight, canvasWidth, playerSize } = settings,
			canvas = context.canvas

function calculatePosition(player) {
	const quadricFriction = Math.pow(player.friction, 2)
	player.xVel *= player.friction
	player.x += player.xVel

	player.yVel *= player.friction
	player.y += player.yVel

	// Edge checks
	if (player.x >= canvasWidth - playerSize) {
		player.x = canvasWidth - playerSize
		// slow down player on edge collision
		// and kick him back
		player.xVel *= -quadricFriction
		player.yVel *= quadricFriction
	}

	if (player.x <= playerSize) {
		player.x = playerSize
		player.xVel *= -quadricFriction
		player.yVel *= quadricFriction
	}

	if (player.y >= canvasHeight - playerSize) {
		player.y = canvasHeight - playerSize
		player.yVel *= -quadricFriction
		player.yXel *= quadricFriction
	}

	if (player.y <= playerSize) {
		player.y = playerSize
		player.yVel *= -quadricFriction
		player.yXel *= quadricFriction
	}
}

function calculateMouseAngle(player) {
	const { mxLast, myLast, x, y } = player,
				{ top, left } = canvas.getBoundingClientRect(),
				relativeX = mxLast - left - x,
				relativeY = myLast - top - y

	player.mx = relativeX
	player.my = relativeY
	player.mNg = Math.atan2(relativeY, relativeX)
}

function clearScene(ctx) {
	ctx.clearRect(0, 0, 900, 506)
}

function drawScene(ctx, state) {
	const { x, y, mx, my } = state.player.one

	clearScene(ctx)
	calculatePosition(state.player.one)
	calculateMouseAngle(state.player.one)
	draw.player(ctx, state.player.one)
}

export default function startScene(ctx, state) {
	function gameLoop() {
		drawScene(ctx, state)
	
		requestAnimationFrame(gameLoop)
	}

	requestAnimationFrame(gameLoop)
}