import './controller.js'
import ctx from './context.js'
import state from './state.js'
import startScene from './scene.js'

startScene(ctx, state)

/**
 * @todo Movement based not on event freq but on mouse pressed flag
 * @todo Speed limit
 * @todo Move all calculations to scene
 * @todo Shooting
 * @todo Slightly slowdown player when shooting
 */