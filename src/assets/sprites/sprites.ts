import obstructionLine from './obstruction-line.png';
import obstructionConnector from './obstruction-connector.png';
import obstructionBavel from './obstruction-bavel.png';
import snake from './snake.png';
import loot from './apple.png';

export interface SpritesInterface {
  obstructionLine: string | HTMLImageElement,
  obstructionConnector: string | HTMLImageElement,
  obstructionBavel: string | HTMLImageElement,
  snake: string | HTMLImageElement,
  loot: string | HTMLImageElement
}

interface Sprites {
  default: SpritesInterface
}

export const sprites: Sprites = {
  default: {
    obstructionLine,
    obstructionConnector,
    obstructionBavel,
    snake,
    loot
  }
};
