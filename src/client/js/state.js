export default {
  player: {
    one: {
      x: 100,
      y: 100,
      mNg: 0,
      mx: 0, // actual mouse x relative to player position
      mxLast: 0, // clientX by last mousemove
      my: 0, // actual mouse y relative to player position
      myLast: 0, // clientY by last mousemove
      xVel: 0,
      yVel: 0,
      maxVel: 15,
      minVelTreshold: 0.02,
      friction: 0.96,
      mousePressed: false
    },
    two: { }
  }
}