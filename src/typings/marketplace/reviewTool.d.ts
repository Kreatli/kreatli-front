export namespace ReviewTool {
  export type ShapeType = 'line' | 'arrow';
  export type ToolType = ShapeType | 'eraser';

  export interface Line {
    type: 'line';
    color: Color;
    points: number[];
  }

  export interface Arrow {
    type: 'arrow';
    color: Color;
    points: number[];
  }

  export type Shape = Line | Arrow;

  export type Color = 'blue' | 'purple' | 'green' | 'red' | 'pink' | 'yellow' | 'cyan' | 'zinc' | 'black' | 'white';
}
