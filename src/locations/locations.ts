import { LocationInterface } from './locationsInterfaces';
import simpleLocation from './simpleLocation';
import advancedLocation from './advancedLocations';

//Инициируем функцию, которая вернёт нам разметку адаптивной карты игровых препятствий в соответствии с заданными при
//иницииации игры размерами поля в условных еденицах измерений canvas.
export const locationsMaker = (
  w: number,
  h: number,
  t: number,
  location: (width: number, height: number, thickness: number) => LocationInterface
  ): LocationInterface => {

  return location(w, h, t);
};

export const locations = {
  simpleLocation,
  advancedLocation
};
