// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { LocationInterface } from '@locations/locationsInterfaces';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { locations, locationsMaker } from '@locations/locations';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { sprites, SpritesInterface} from '@assets/sprites/sprites';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Obstructions } from '@logic/Obstructions';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Snake from '@logic/Snake';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Loot from '@logic/Loot';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { KEYS, keyboardEvents, getActions } from "./Actions";

class Level {
  readonly _location: LocationInterface;
  private _sprites: SpritesInterface;

  constructor(
    level: number,
    canvasWidth: number,
    canvasHeight: number,
    thickness: number,
    sprites,
    locations
  ) {
    switch (level) {
      case 1:
        this._sprites = sprites.default;
        this._location = locationsMaker(canvasWidth, canvasHeight, thickness, locations.simpleLocation);
        break;

      case 2:
        this._sprites = sprites.default;
        this._location = locationsMaker(canvasWidth, canvasHeight, thickness, locations.advancedLocation);
        break;

      default:
        this._sprites = sprites.default;
        this._location = locationsMaker(canvasWidth, canvasHeight, thickness, locations.simpleLocation);
    }
  }

  get sprites() {
    return this._sprites;
  }

  set sprites(value: HTMLImageElement) {
    this._sprites = value as HTMLImageElement;
  }

  get location(): LocationInterface {
    return this._location;
  }
}

class Game {
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  public canvasWidth: number;
  public canvasHeight: number;
  public thickness: number
  private level: Level | any;
  private snake: Snake | any;
  private loot: Loot;
  private obstructions: Obstructions;
  public state;

  constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    thickness: number
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.thickness = thickness;
    this.level = {};
    this.obstructions = {};
    this.loot = {};
    this.state = {
      firstLoad: true,
      actions: getActions(),
    };
  }

  private setState = (newValues, callback?) => {
    const newState = this.state;

    for (const value in newValues) {
      if (
        newValues.hasOwnProperty(value)
      ) {
        newState[value] = newValues[value]
      }
    }

    this.state = {...newState};
    if (
      typeof callback !== 'undefined'
    ) {
      callback();
    }
  }

  private setEvents = (): void => {
    window.addEventListener("keydown", (e) => {
      const {
        snakeHead
      } = this.snake.state;
      if (
        e.keyCode === KEYS.TOP &&
        snakeHead.direction === 'bottom' ||
        e.keyCode === KEYS.W &&
        snakeHead.direction === 'bottom' ||
        e.keyCode === KEYS.RIGHT &&
        snakeHead.direction === 'left' ||
        e.keyCode === KEYS.D &&
        snakeHead.direction === 'left' ||
        e.keyCode === KEYS.BOTTOM &&
        snakeHead.direction === 'top' ||
        e.keyCode === KEYS.S &&
        snakeHead.direction === 'top' ||
        e.keyCode === KEYS.LEFT &&
        snakeHead.direction === 'right' ||
        e.keyCode === KEYS.A &&
        snakeHead.direction === 'right'
      ) {
        return ;
      } else {
        keyboardEvents(e.keyCode);
      }
    });
  };

  public init = (level): void => {
    keyboardEvents(68);
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.setState({
      score: 0,
      levelWasCompleted: false,
      gameIsFailed: false,
      gameIsOver: false
    });

    const score = document.querySelector('#score') as HTMLElement;
    score.textContent = '0';

    this.level = new Level(
      level,
      this.canvasWidth,
      this.canvasHeight,
      this.thickness,
      sprites,
      locations
    ) as Level;
    this.obstructions = new Obstructions(
      this.ctx,
      this.canvasWidth,
      this.canvasHeight,
      this.thickness,
      this.level.sprites,
      this.level.location
    ) as Obstructions;
    this.snake = new Snake(
      this.ctx,
      this.canvasWidth,
      this.canvasHeight,
      this.thickness,
      this.level.sprites
    ) as Snake;
    this.loot = new Loot(
      this.ctx,
      this.canvasWidth,
      this.canvasHeight,
      this.thickness,
      this.level.sprites,
      this.thickness * 2,
    ) as Loot;
    this.setEvents();
    this.start();
  };

  private preload = (callback: () => void) => {
    let loaded = 0;

    const reqiredIterations = Object.keys(this.level.sprites).length;

    const onSourceLoaded = () => {
      ++loaded;

      if (loaded >= reqiredIterations) {
        callback();
      }
    }

    for (const sprite in this.level.sprites) {
      if (
        this.level.sprites.hasOwnProperty(sprite)
      ) {
        const image = new Image() as HTMLImageElement;
        image.src = this.level.sprites[sprite];
        this.level.sprites[sprite] = image;
        this.level.sprites[sprite].addEventListener('load', onSourceLoaded);
      }
    }
  };

  private load = (): void => {
    this.obstructions.init();
    this.snake.init();
    this.snake.preRender();
    this.loot.createNewLoot(this.obstructions.crashZones, this.snake.state.snakeBody);
  };

  private render = (): void => {
    this.setState({
      firstLoad: false
    });

    this.obstructions.render();

    const dynamic = (): void => {
      window.requestAnimationFrame(() => {
        const {
          score,
          actions
        } = this.state;

        const scoreElement = document.querySelector('#score') as HTMLElement;
        scoreElement.textContent = score;

        for (const dir in actions.directions) {
          if (
            actions.directions[dir]
          ) {
            this.snake.switchDirection(dir);
            break;
          }
        }

        this.loot.render();
        this.snake.render();
        if (
          this.snake.crash(this.obstructions.crashZones)
        ) {
          this.setState({
            gameIsOver: true,
            gameIsFailed: true,
          });
        } else if (
          this.state.score === 300
        ) {
          this.setState({
            levelWasCompleted: true
          });
        }

        if (
          this.snake.takeApple(this.loot.state)
        ) {
          this.snake.increase(2);
          this.loot.removeApple(this.loot.state, this.snake.forceDraw);
          this.loot.createNewLoot(this.obstructions.crashZones, this.snake.state.snakeBody);
          const newScore = score + 10;
          this.setState({
            score: newScore
          });
        }

        if (
          !this.state.gameIsOver &&
          !this.state.levelWasCompleted
        ) {
          dynamic();
        } else {
          this.reload();
        }
      })
    }
    dynamic();
  };

  private reload = (): void => {
    if (
      this.state.gameIsFailed
    ) {
      this.init(1);
    } else {
      this.init(2);
    }
  }

  private run = (): void => {
    this.render();
  };

  private start = (): void => {
    if (
      this.state.firstLoad
    ) {
      this.preload(() => {
        this.load();
        this.run();
      });
    } else {
      this.load();
      this.run();
    }
  };
}

const startGame = (width, height, thickness) => {
  const root = document.querySelector('#root') as HTMLElement;
  const snake = document.createElement('canvas') as HTMLCanvasElement;
  const game = new Game(snake, width, height, thickness);
  snake.width = width;
  snake.height = height;
  snake.className = 'snake';
  snake.id = 'snake';

  const score = document.createElement('span') as HTMLElement;
  score.className = 'score';
  score.id = 'score';
  score.textContent = game.state.score;

  root.append(snake);
  root.append(score);

  game.init(1);
}

window.addEventListener('load', () => {
  startGame(1920, 1080, 15);
});
