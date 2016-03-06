var das = 14,
  dasFrameLeft = 0,
  dasFrameRight = 0,
  gravity = 4, // 256 gravity = 1 tile/frame (1G)
  softDropGravity = 128,
  miniTilesDown = 0,
  lockframe = 0,
  lockdelay = 30,
  areFrame = 0,
  deadFrame = 0,
  cwIsPresed = false,
  ccwIsPressed = false

function movement() {

  var axisX = 0,
    axisY = 0

  if (keys[controls.keyCodes[0]]) {
    //left arrow
    axisX --
  }

  if (keys[controls.keyCodes[1]]) {
    //right arrow
    axisX ++
  }

  if (axisX == -1) {
    if (dasFrameLeft == 0 || dasFrameLeft >= das) {
      if (colCheck(game.piecePos[0],game.piecePos[1]-1,game.currentRotation) == false) {
        if (areFrame <= 0) {
          game.piecePos[1] -= 1
        }
      }
    }
    dasFrameLeft ++
    dasFrameRight = 0
  } else if (axisX == 1) {
    if (dasFrameRight == 0 || dasFrameRight >= das) {
      if (colCheck(game.piecePos[0],game.piecePos[1]+1,game.currentRotation) == false) {
        if (areFrame <= 0){
          game.piecePos[1] += 1
        }
      }
    }
    dasFrameRight ++
    dasFrameLeft = 0
  } else {
    dasFrameLeft = 0
    dasFrameRight = 0
  }

  if (areFrame > 0) {
    areFrame--
    return
  }

  //rotation
  if (keys[controls.keyCodes[2]]) {
    //z - ccw rotation
    if (!ccwIsPressed) {
      var newRotation = game.currentRotation -1
      if (newRotation < 0) {
        newRotation = 3
      }
      if (colCheck(game.piecePos[0],game.piecePos[1],newRotation) == false) {
        game.currentRotation = newRotation
      } else if (colCheck(game.piecePos[0],game.piecePos[1]-1,newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[1] -= 1
      } else if (colCheck(game.piecePos[0],game.piecePos[1]+1,newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[1] += 1
      } else if (colCheck(game.piecePos[0]+1,game.piecePos[1],newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[0] += 1
      } else if (colCheck(game.piecePos[0]+1,game.piecePos[1]-1,newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[1] -= 1
        game.piecePos[0] += 1
      } else if (colCheck(game.piecePos[0]+1,game.piecePos[1]+1,newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[1] += 1
        game.piecePos[0] += 1
      } else if (colCheck(game.piecePos[0]-1,game.piecePos[1],newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[0] -= 1
      }
    }
    ccwIsPressed = true
  } else {
    ccwIsPressed = false
  }

  if (keys[controls.keyCodes[3]]) {
    //x - cw rotation
    if (!cwIsPressed) {
      var newRotation = game.currentRotation + 1
      if (newRotation > 3) {
        newRotation = 0
      }
      if (colCheck(game.piecePos[0],game.piecePos[1],newRotation) == false) {
        game.currentRotation = newRotation
      } else if (colCheck(game.piecePos[0],game.piecePos[1]+1,newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[1] += 1
      } else if (colCheck(game.piecePos[0],game.piecePos[1]-1,newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[1] -= 1
      } else if (colCheck(game.piecePos[0]+1,game.piecePos[1],newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[0] += 1
      } else if (colCheck(game.piecePos[0]+1,game.piecePos[1]+1,newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[1] += 1
        game.piecePos[0] += 1
      } else if (colCheck(game.piecePos[0]+1,game.piecePos[1]-1,newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[1] -= 1
        game.piecePos[0] += 1
      } else if (colCheck(game.piecePos[0]-1,game.piecePos[1],newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[0] -= 1
      }
    }
    cwIsPressed = true
  } else {
    cwIsPressed = false
  }

  //gravity

  if (keys[controls.keyCodes[4]]) {
    //up arrow - hard drop
    axisY --
  }

  if (keys[controls.keyCodes[5]]) {
    //down arrow - soft drop
    axisY ++
  }

  if (axisY == -1) {
    miniTilesDown += 5120
  } else if (axisY == 1) {
    miniTilesDown += softDropGravity
    if (colCheck(game.piecePos[0]+1,game.piecePos[1],game.currentRotation)) {
      lockframe += 1000
    }
  } else {
    if (colCheck(game.piecePos[0]+1,game.piecePos[1],game.currentRotation) == false) {
      miniTilesDown += gravity
    }
  }

  //process vertical movement
  while (miniTilesDown >= 256) {
    if (colCheck(game.piecePos[0]+1,game.piecePos[1],game.currentRotation) == false) {
      miniTilesDown -= 256
      game.piecePos[0]++
      lockframe = 0
    } else {
      miniTilesDown = 0
      break
    }
  }

  if (keys[controls.keyCodes[6]]) {
    deadFrame++
  }

}