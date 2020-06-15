import { LocationInterface } from './locationsInterfaces';

const advancedLocation = (w: number, h: number, t:number): LocationInterface => {
  return {
    obstructionHorizontal: [
      {
        type: 'line-horizontal',
        y1: 0,
        y2: t,
        x1: t,
        x2: (w / 2) - (t * 9)
      },
      {
        type: 'line-horizontal',
        y1: 0,
        y2: t,
        x1: (w / 2) + (t * 9),
        x2: w - t
      },
      {
        type: 'line-horizontal',
        y1: h - t,
        y2: h,
        x1: t,
        x2: (w / 2) - (t * 9)
      },
      {
        type: 'line-horizontal',
        y1: h - t,
        y2: h,
        x1: (w / 2) + (t * 9),
        x2: w - t
      },
      {
        type: 'line-horizontal',
        y1: t * 15,
        y2: t * 16,
        x1: t * 15,
        x2: t * 45
      },
      {
        type: 'line-horizontal',
        y1: h - (t * 16),
        y2: h - (t * 15),
        x1: w - (t * 45),
        x2: w - (t * 15)
      }
    ],
    obstructionVertical: [
      {
        type: 'line-vertical',
        y1: t,
        y2: (h / 2) - (t * 9),
        x1: 0,
        x2: t
      },
      {
        type: 'line-vertical',
        y1: (h / 2) + (t * 9),
        y2: h - t,
        x1: 0,
        x2: t
      },
      {
        type: 'line-vertical',
        y1: t,
        y2: (h / 2) - (t * 9),
        x1: w - t,
        x2: w
      },
      {
        type: 'line-vertical',
        y1: (h / 2) + (t * 9),
        y2: h - t,
        x1: w - t,
        x2: w
      },
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
        x1: (w / 2) - (t * 9),
        x2: (w / 2) - (t * 8)
      },
      {
        type: 'bevel-horizontal-bottom-left',
        y1: 0,
        y2: t,
        x1: (w / 2) + (t * 8),
        x2: (w / 2) + (t * 9)
      },
      {
        type: 'bevel-horizontal-top-right',
        y1: h - t,
        y2: h,
        x1: (w / 2) - (t * 9),
        x2: (w / 2) - (t * 8)
      },
      {
        type: 'bevel-horizontal-top-left',
        y1: h - t,
        y2: h,
        x1: (w / 2) + (t * 8),
        x2: (w / 2) + (t * 9)
      },
    ],
    obstructionBevelVertical: [
      {
        type: 'bevel-vertical-bottom-right',
        y1: (h / 2) - (t * 9),
        y2: (h / 2) - (t * 8),
        x1: 0,
        x2: t
      },
      {
        type: 'bevel-vertical-bottom-left',
        y1: (h / 2) - (t * 9),
        y2: (h / 2) - (t * 8),
        x1: w - t,
        x2: t
      },
      {
        type: 'bevel-vertical-top-right',
        y1: (h / 2) + (t * 8),
        y2: (h / 2) + (t * 9),
        x1: 0,
        x2: t
      },
      {
        type: 'bevel-vertical-top-left',
        y1: (h / 2) + (t * 8),
        y2: (h / 2) + (t * 9),
        x1: w - t,
        x2: w
      }
    ]
  }
};

export default advancedLocation;
