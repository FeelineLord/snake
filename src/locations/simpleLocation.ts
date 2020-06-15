import { LocationInterface } from './locationsInterfaces';

//Создаём объектную модель адаптивной карты игровых препятствий (стены, углы), об которые наша змейка сломает шею
const simpleLocation = (w: number, h: number, t:number): LocationInterface => {
  return {
    obstructionHorizontal: [
      {
        type: 'line-horizontal',
        y1: 0,
        y2: t,
        x1: t,
        x2: t * 7
      },
      {
        type: 'line-horizontal',
        y1: 0,
        y2: t,
        x1: w - (t * 7),
        x2: w - t
      },
      {
        type: 'line-horizontal',
        y1: h - t,
        y2: h,
        x1: t,
        x2: t * 7
      },
      {
        type: 'line-horizontal',
        y1: h - t,
        y2: h,
        x1: w - (t * 7),
        x2: w - t
      }
    ],
    obstructionVertical: [
      {
        type: 'line-vertical',
        y1: t,
        y2: t * 7,
        x1: 0,
        x2: t
      },
      {
        type: 'line-vertical',
        y1: t,
        y2: t * 7,
        x1: w - t,
        x2: w
      },
      {
        type: 'line-vertical',
        y1: h - (t * 7),
        y2: h - t,
        x1: 0,
        x2: t
      },
      {
        type: 'line-vertical',
        y1: h - (t * 7),
        y2: h - t,
        x1: w - t,
        x2: w
      }
    ],
    obstructionConnector: [
      {
        type: 'connector-top-left',
        y1: 0,
        y2: t,
        x1: 0,
        x2: t
      },
      {
        type: 'connector-top-right',
        y1: 0,
        y2: t,
        x1: w - t,
        x2: w
      },
      {
        type: 'connector-bottom-left',
        y1: h - t,
        y2: h,
        x1: 0,
        x2: t
      },
      {
        type: 'connector-bottom-right',
        y1: h - t,
        y2: h,
        x1: w - t,
        x2: w
      }
    ],
    obstructionBevelHorizontal: [
      {
        type: 'bevel-horizontal-bottom-right',
        y1: 0,
        y2: t,
        x1: t * 7,
        x2: (t * 7) + t
      },
      {
        type: 'bevel-horizontal-bottom-left',
        y1: 0,
        y2: t,
        x1: w - (t * 7 + t),
        x2: w - t * 7
      },
      {
        type: 'bevel-horizontal-top-right',
        y1: h - t,
        y2: h,
        x1: t * 7,
        x2: t * 7 + t
      },
      {
        type: 'bevel-horizontal-top-left',
        y1: h - t,
        y2: h,
        x1: w - (t * 7 + t),
        x2: w - t * 7
      }
    ],
    obstructionBevelVertical: [
      {
        type: 'bevel-vertical-bottom-right',
        y1: t * 7,
        y2: (t * 7) + t,
        x1: 0,
        x2: t
      },
      {
        type: 'bevel-vertical-bottom-left',
        y1: t * 7,
        y2: (t * 7) + t,
        x1: w - t,
        x2: w
      },
      {
        type: 'bevel-vertical-top-right',
        y1: h - (t * 7 + t),
        y2: h - (t * 7),
        x1: 0,
        x2: t
      },
      {
        type: 'bevel-vertical-top-left',
        y1: h - (t * 7 + t),
        y2: h - (t * 7),
        x1: w - t,
        x2: w
      }
    ]
  }
};

export default simpleLocation;
