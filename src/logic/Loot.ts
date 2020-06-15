// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SpritesInterface } from '@assets/sprites/sprites';
import AbstractElement from './Abstract';

class Loot extends AbstractElement {
  protected _state;
  private size: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    thickness: number,
    sprites: SpritesInterface,
    size: number,
  ) {
    super(ctx, width, height, thickness, sprites);
    this.size = size;
  }

  randomInteger = (min: number, max: number): number => {
    const random = min + Math.random() * (max + 1 - min);

    return Math.floor(random);
  }

  public createNewLoot = (crashZones, snakeBody): void => {
    const allowableX = this.canvasWidth - this.size;
    const allowableY = this.canvasHeight - this.size;

    const randomX = this.randomInteger(this.size, allowableX);
    const randomY = this.randomInteger(this.size, allowableY);

    if (
      crashZones.some(z => {
      return z.x1 <= randomX + this.size &&
        z.x2 >= randomX &&
        z.y1 <= randomY + this.size &&
        z.y2 >= randomY
    })
    ) {
      this.createNewLoot(crashZones, snakeBody);
    } else if (
      snakeBody.some(b => {
        return b.x1 <= randomX + this.size &&
          b.x2 >= randomX &&
          b.y1 <= randomY + this.size &&
          b.y2 >= randomY
      })
    ) {
      this.createNewLoot(crashZones, snakeBody);
    } else {
      this.setState({
        x1: randomX,
        x2: randomX + this.size,
        y1: randomY,
        y2: randomY + this.size
      });
    }
  };

  public removeApple = (coordinates, callback: () => void): void => {
    this.ctx.clearRect(coordinates.x1, coordinates.y1, this.size, this.size);
    callback();
  };

  public render = (): void => {
    const {
      x1,
      y1
    } = this.state;
    this.ctx.drawImage(this.sprites.loot, x1, y1, this.size, this.size);
  }
}

export default Loot;
