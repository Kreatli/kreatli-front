export namespace Tasks {
  type Type = 'platform' | 'content' | 'job' | 'engagement';

  export interface Task {
    type: Type;
    label: string;
    points: number;
    value: number;
    maxValue: number;
  }
}
