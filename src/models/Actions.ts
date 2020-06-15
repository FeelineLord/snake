interface KeysActionsInterface {
  top: boolean,
  right: boolean,
  bottom: boolean,
  left: boolean
}

interface ActionsInterface {
  directions: KeysActionsInterface,
}

interface KeysInterface {
  W: number,
  A: number,
  S: number,
  D: number,
  TOP: number,
  LEFT: number,
  BOTTOM: number,
  RIGHT: number,
}

export const KEYS: KeysInterface = {
  W: 87,
  A: 65,
  S: 83,
  D: 68,
  TOP: 38,
  LEFT: 37,
  BOTTOM: 40,
  RIGHT: 39,
};

const Actions = {
  directions: {
    top: false,
    right: true,
    bottom: false,
    left: false
  }
}

const setDirection = (direction) => {
  for (const d in Actions.directions) {
    Actions.directions[d] = false;
  }

  Actions.directions[direction] = true;
};

export const getActions = (): ActionsInterface => {
  return Actions;
};

export const keyboardEvents = (code: number): void => {
  if (
    code === KEYS.W ||
    code === KEYS.TOP
  ) {
    setDirection('top');
  } else if (
    code === KEYS.A ||
    code === KEYS.LEFT
  ) {
    setDirection('left');
  } else if (
    code === KEYS.S ||
    code === KEYS.BOTTOM
  ) {
    setDirection('bottom');
  } else if (
    code === KEYS.D ||
    code === KEYS.RIGHT
  ) {
    setDirection('right');
  }
};
