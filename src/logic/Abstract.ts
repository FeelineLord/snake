// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SpritesInterface } from '@assets/sprites/sprites';

export default class AbstractElement {
  readonly ctx: CanvasRenderingContext2D;
  readonly canvasWidth;
  readonly canvasHeight;
  readonly thickness;
  readonly sprites: SpritesInterface;
  protected _state: any;

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    thickness: number,
    sprites: SpritesInterface
  ) {
    this.ctx = ctx;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.thickness = thickness;
    this.sprites = sprites;
    this._state = {};
  }

  public setState = (newValues, callback?: () => void): void => {
    const newState = {...this.state};

    for (const value in newValues) {
      if (
        newValues.hasOwnProperty(value)
      ) {
        newState[value] = newValues[value]
      }
    }

    this._state = {...newState};
    if (
      typeof callback !== 'undefined'
    ) {
      callback();
    }
  };

  private getRotatedCoordinates = (degrees) => {
    switch(degrees) {
      case 90:
        return {
          cx: 0,
          cy: -this.thickness
        }

      case 180:
        return {
          cx: -this.thickness,
          cy: -this.thickness
        }

      case -90:
        return {
          cx: -this.thickness,
          cy: 0
        }

      default:
        return {
          cx: 0,
          cy: 0
        }
    }
  };

  private drawingWithRotation = (sprite: HTMLImageElement, degrees, x, y, scale?, vertical?) => {
    const newCoordinates = this.getRotatedCoordinates(degrees);

    this.ctx.save();
    this.ctx.translate(x, y);

    if (
      scale
    ) {
      this.ctx.scale(-1, 1);
      newCoordinates.cx = ((newCoordinates.cx - this.thickness) * - 1) - this.thickness * 2;

      if (
        vertical
      ) {
        newCoordinates.cy = (newCoordinates.cy * -1) - this.thickness;
        newCoordinates.cx = (newCoordinates.cx * -1) - this.thickness;
      }
    }

    this.ctx.rotate(degrees * Math.PI / 180);
    this.ctx.drawImage(sprite as HTMLImageElement, newCoordinates.cx, newCoordinates.cy, this.thickness, this.thickness);
    this.ctx.restore();
  };

  public renderItem = (item): void => {
    switch (item.type) {
      case 'line-horizontal':
        for (let newX = item.x1; newX < item.x2; newX += this.thickness) {
          this.ctx.drawImage(this.sprites.obstructionLine, newX, item.y1, this.thickness, this.thickness);
        }
        break;

      case 'line-vertical':
        for (let newY = item.y1; newY < item.y2; newY += this.thickness) {
          this.drawingWithRotation(this.sprites.obstructionLine, 90, item.x1, newY, false);
        }
        break;

      case 'connector-top-left':
        this.ctx.drawImage(this.sprites.obstructionConnector, item.x1, item.y1, this.thickness, this.thickness);
        break;

      case 'connector-top-right':
        this.drawingWithRotation(this.sprites.obstructionConnector, 90, item.x1, item.y1, false);
        break;

      case 'connector-bottom-left':
        this.drawingWithRotation(this.sprites.obstructionConnector, -90, item.x1, item.y1, false);
        break;

      case 'connector-bottom-right':
        this.drawingWithRotation(this.sprites.obstructionConnector, 180, item.x1, item.y1, false);
        break;

      case 'bevel-horizontal-bottom-right':
        this.ctx.drawImage(this.sprites.obstructionBavel, item.x1, item.y1, this.thickness, this.thickness);
        break;

      case 'bevel-horizontal-bottom-left':
        this.drawingWithRotation(this.sprites.obstructionBavel, 0, item.x1, item.y1, true);
        break;

      case 'bevel-horizontal-top-right':
        this.drawingWithRotation(this.sprites.obstructionBavel, 180, item.x1, item.y1, true);
        break;

      case 'bevel-horizontal-top-left':
        this.drawingWithRotation(this.sprites.obstructionBavel, 180, item.x1, item.y1, false);
        break;

      case 'bevel-vertical-bottom-right':
        this.drawingWithRotation(this.sprites.obstructionBavel, 90, item.x1, item.y1, true, true);
        break;

      case 'bevel-vertical-bottom-left':
        this.drawingWithRotation(this.sprites.obstructionBavel, 90, item.x1, item.y1, false);
        break;

      case 'bevel-vertical-top-right':
        this.drawingWithRotation(this.sprites.obstructionBavel, -90, item.x1, item.y1, false);
        break;

      case 'bevel-vertical-top-left':
        this.drawingWithRotation(this.sprites.obstructionBavel, -90, item.x1, item.y1, true, true);
        break;

      case 'snake':
        this.ctx.drawImage(this.sprites.snake, item.x1, item.y1, this.thickness, this.thickness);
        break;

      default:
        break;
    }
  };

  get state(): any {
    return this._state;
  }
}
