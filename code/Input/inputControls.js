var controls = {
    currentSelection : 0,
    namelist : [
      "Move Left",
      "Move Right",
      "A (Rotate L/R)",
      "B (Rotate R/L)",
      "C (Rotate L/R)",
      "Sonic Drop",
      "Soft Drop",
      "Suicide"
    ],
    keyCodes : [
      37,
      39,
      90,
      88,
      67,
      38,
      40,
      75
    ]
  },
  isChangingKeyCode = false;

function keyCapture(e) {
  if (e.keyCode != 27) {
    controls.keyCodes[controls.currentSelection] = e.keyCode;
  }
  keys[e.keyCode] = false;
  document.body.removeEventListener("keydown",keyCapture);
  isChangingKeyCode = false;
}

function inputControls() {
  if (keys[38] && !isChangingKeyCode) {
    //up arrow
    controls.currentSelection--;
    if (controls.currentSelection < 0) {
      controls.currentSelection = controls.keyCodes.length-1;
    }
    keys[38] = false;
  }

  if (keys[40] && !isChangingKeyCode) {
    //down arrow
    controls.currentSelection++;
    if (controls.currentSelection > controls.keyCodes.length-1) {
      controls.currentSelection = 0;
    }
    keys[40] = false;
  }

  if (keys[13]) {
    //enter
    isChangingKeyCode = true;
    document.body.addEventListener("keydown",keyCapture);
  }

  if (keys[27]) {
    //escape
    gamestate = 0;
  }

}
