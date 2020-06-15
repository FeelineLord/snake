// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { LocationInterface, ObstructionInterface } from '@locations/locationsInterfaces';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SpritesInterface } from '@assets/sprites/sprites';
import AbstractElement from './Abstract';

interface CrashZoneInterface {
  x1: number,
  x2: number,
  y1: number,
  y2: number
}

export class Obstructions extends AbstractElement {
  readonly location: LocationInterface;
  protected _state = {};
  protected _crashZones: CrashZoneInterface[] = [];
  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    thickness: number,
    sprites: SpritesInterface,
    location: LocationInterface
  ) {
    super(ctx, width, height, thickness, sprites);

    this.location = location;
  }

  set crashZones(value: CrashZoneInterface[]) {
    this._crashZones = value;
  }

  get crashZones(): CrashZoneInterface[] {
    return this._crashZones;
  }

  private createObstructionsArray = (): ObstructionInterface[] => {
    const result: ObstructionInterface[] = [];

    for (const obstruction in this.location) {
      if (this.location.hasOwnProperty(obstruction)) {
        for (const item of this.location[obstruction]) {
          result.push(item);
        }
      }
    }

    return result;
  };

  protected init = (): void => {
    const obstructions: ObstructionInterface[] = [];
    const crashZones: CrashZoneInterface[] = [];

    for (const obstruction of this.createObstructionsArray()) {
      obstructions.push(obstruction);
      crashZones.push({
        x1: obstruction.x1,
        x2: obstruction.x2,
        y1: obstruction.y1,
        y2: obstruction.y2
      });
    }

    this.crashZones = crashZones;

    this.setState({
      obstructions,
    });
  };

  protected render = (): void => {
    for (const obstruction of this.state.obstructions) {
      this.renderItem(obstruction);
    }
  }
}
