export namespace Tasks {
  type TaskType = 'engage' | 'write' | 'like' | 'send' | 'grow';

  export interface Task {
    type: TaskType;
    label: string;
    points: number;
    value: number;
    maxValue: number;
  }
}
