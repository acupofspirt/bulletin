import './controller.js'
import ctx from './context.js'
import state from './state.js'
import startScene from './scene.js'

startScene(ctx, state)

/**
 * @todo Add manipulation rate, for non-linear speed increasing
 * @todo Shooting
 * @todo Slightly slowdown player when shooting
 */