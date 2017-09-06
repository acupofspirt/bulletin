import settings from './settings.js'

const {playerSize, weaponSize} = settings,
      tripledPI = Math.PI / 3

export default {
  player (ctx, player) {
    const halvedPlayerSize = playerSize / 4,
          {x, y} = player,
          playerSkin = ctx.createRadialGradient(
            x,
            y,
            halvedPlayerSize,
            x,
            y,
            playerSize
          )

    playerSkin.addColorStop(0, '#2ecc71')
    playerSkin.addColorStop(1, '#27ae60')
    ctx.fillStyle = playerSkin
    ctx.strokeStyle = playerSkin
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // const weaponAngle = player.mNg,
    // 			weaponX = x + Math.cos(weaponAngle) * weaponSize,
    // 			weaponY = y + Math.sin(weaponAngle) * weaponSize

    // Weapon
    ctx.beginPath()
    ctx.arc(x, y, weaponSize, player.mNg - tripledPI, player.mNg + tripledPI)
    ctx.stroke()
    // Body
    ctx.beginPath()
    ctx.arc(x, y, playerSize, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }
}