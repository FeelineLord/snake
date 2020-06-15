export interface ObstructionInterface {
  type?: string,
  y1: number,
  y2: number,
  x1: number,
  x2: number,
  moveTo?: ObstructionInterface
}

export interface LocationInterface {
  obstructionHorizontal: ObstructionInterface[];
  obstructionVertical: ObstructionInterface[];
  obstructionConnector: ObstructionInterface[];
  obstructionBevelHorizontal: ObstructionInterface[];
  obstructionBevelVertical: ObstructionInterface[];
}
