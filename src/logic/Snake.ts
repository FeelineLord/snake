import AbstractElement from './Abstract';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SpritesInterface } from '@assets/sprites/sprites';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

interface SnakeElementInterface {
  type: string
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  direction: string
}

export default class Snake extends AbstractElement {
  protected _state = {};
  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    thickness: number,
    sprites: SpritesInterface) {
    super(ctx, width, height, thickness, sprites)
  }

  public init = (): void => {
    const snakeHead: SnakeElementInterface = {
      type: 'snake',
      x1: this.thickness * 10,
      x2: this.thickness * 11,
      y1: (this.canvasHeight / 2) + this.thickness,
      y2: (this.canvasHeight / 2) + (this.thickness * 2),
      direction: 'right'
    };

    const snakeBody: SnakeElementInterface[] = [
      {
        type: 'snake',
        x1: snakeHead.x1 - (this.thickness * 40),
        x2: snakeHead.x2 - (this.thickness * 40),
        y1: snakeHead.y1,
        y2: snakeHead.y2,
        direction: snakeHead.direction,
      }
    ];

    this.setState({
      snakeHead,
      snakeBody
    });

    for (let i = 0; i < 40; i++) {
      this.makeNewBody();
    }
  }

  private makeNewBody = (): void => {
    const newBody: SnakeElementInterface[] = [ ...this.state.snakeBody ];
    const newBodyElement: SnakeElementInterface = this.makeElement(
      { ...newBody[0] }
      );

    newBody.unshift(newBodyElement);

    this.setState({
      snakeBody: newBody
    });
  };

  public preRender = (): void => {
    const {
      snakeBody
    } = this.state;
    for (const el of snakeBody) {
      this.renderItem(el);
    }
  }

  makeElement = (element: SnakeElementInterface): SnakeElementInterface => {
    const newElement = { ...element };

    switch (element.direction) {
      case 'top':
        newElement.y1 -= this.thickness;
        newElement.y2 -= this.thickness;
        break;

      case 'right':
        newElement.x1 += this.thickness;
        newElement.x2 += this.thickness;
        break;

      case 'bottom':
        newElement.y1 += this.thickness;
        newElement.y2 += this.thickness;
        break;

      case 'left':
        newElement.x1 -= this.thickness;
        newElement.x2 -= this.thickness;
    }

    return newElement;
  };

  public switchDirection = (direction: string): void => {
    const {
      snakeHead
    } = this.state;

    const dr = direction.toLowerCase();
    const newSnakeHead = { ...snakeHead };
    newSnakeHead.direction = dr;

    this.setState({
      snakeHead: newSnakeHead
    });
  };

  removeLast = (): void => {
    const {
      snakeBody
    } = this.state;
    const lastElement = snakeBody[this.state.snakeBody.length - 1];
    const newSnakeBody = [ ...snakeBody ];
    newSnakeBody.pop();
    this.ctx.clearRect(lastElement.x1, lastElement.y1, this.thickness, this.thickness);

    this.setState({
      snakeBody: newSnakeBody
    });
  };

  makeNew = (): void => {
    const {
      snakeBody,
      snakeHead
    } = this.state;
    const newSnakeBody = [ ...snakeBody ];
    newSnakeBody.unshift({
      ...snakeHead
    });
    this.setState({
      snakeBody: newSnakeBody
    })
  };

  coordinateCondition = (item: SnakeElementInterface): SnakeElementInterface => {
    const newItem = { ...item };
    switch (true) {
      case newItem.x1 < 0:
        newItem.x1 = this.canvasWidth - this.thickness;
        newItem.x2 = this.canvasWidth;
        break;

      case newItem.x2 > this.canvasWidth:
        newItem.x1 = 0;
        newItem.x2 = this.thickness;
        break;

      case newItem.y1 < 0:
        newItem.y1 = this.canvasHeight - this.thickness;
        newItem.y2 = this.canvasHeight;
        break;

      case newItem.y2 > this.canvasHeight:
        newItem.y1 = 0;
        newItem.y2 = this.thickness;
        break;

      default:
        break;
    }

    return newItem;
  };

  crash = (crashZones): boolean => {
    const {
      snakeHead,
      snakeBody
    } = this.state;

    const crashObstructionCheck = crashZones.some(z => {
      return snakeHead.x2 >= z.x1 + this.thickness &&
      snakeHead.x2 <= z.x2 &&
      snakeHead.y2 >= z.y1 + this.thickness &&
        snakeHead.y2 <= z.y2;
    });

    const crashHerself = snakeBody.some((b, i) => {
      return snakeHead.x2 >= b.x1 + this.thickness &&
        snakeHead.x2 <= b.x2 &&
        snakeHead.y2 >= b.y1 + this.thickness &&
        snakeHead.y2 <= b.y2 &&
        i > 3;
    });

    return !!(crashObstructionCheck ||
      crashHerself);
  };

  public takeApple = (apple): boolean => {
    const {
      snakeHead
    } = this.state;

    return snakeHead.x2 >= apple.x1 &&
      snakeHead.x1 <= apple.x2 &&
      snakeHead.y2 >= apple.y1 &&
      snakeHead.y1 <= apple.y2;
  };

  public increase = (iterations: number): void => {
    const {
      snakeBody
    } = this.state;

    const newElements: SnakeElementInterface[] = [];

    let i = 0;

    while (iterations > i) {
      let newElement: SnakeElementInterface;
      if (
        !newElements.length
      ) {
        newElement = this.makeElement(snakeBody[snakeBody.length - 1]);
      } else {
        newElement = this.makeElement(newElements[newElements.length - 1]);
      }

      newElements.push(newElement);
      i++
    }

    for (const el of newElements) {
      this.renderItem(el);
    }

    const newBody = [ ...snakeBody, ...newElements ];

    this.setState({
      snakeBody: newBody
    });
  };

  public forceDraw = (): void => {
    const {
      snakeHead
    } = this.state;

    this.ctx.drawImage(this.sprites.snake, snakeHead.x1, snakeHead.y1, this.thickness, this.thickness);
  };

  render = (): void => {
    const {
      snakeHead
    } = this.state;

    this.removeLast();
    this.makeNew();

    let newHead = this.makeElement(snakeHead);
    newHead = this.coordinateCondition(newHead);

    this.renderItem(newHead);
    this.setState({
      snakeHead: newHead,
    });
  };
}
