/* eslint-disable @typescript-eslint/indent */
export const enum Key {
  ESCAPE = 'Escape',
  TAB = 'Tab',
  ENTER = 'Enter',
  NUMPADENTER = 'NumpadEnter',
  LEFT = 'ArrowLeft',
  UP = 'ArrowUp',
  RIGHT = 'ArrowRight',
  SPACE = 'Space',
  DOWN = 'ArrowDown',
  DELETE = 'Delete',
  BACKSPACE = 'Backspace',
  HOME = 'Home',
  END = 'End',
  COMMA = ',',
}

const createKeyHandler =
  (keys: Key[]) =>
  (handler?: React.KeyboardEventHandler) =>
  (event: React.KeyboardEvent): void => {
    if ((Object.values(keys) as string[]).includes(event.code)) {
      event.preventDefault();

      return handler?.(event);
    }
  };

export const handleSpaceAndEnter =
  (handler?: React.KeyboardEventHandler) =>
  (event: React.KeyboardEvent): void => {
    return createKeyHandler([Key.SPACE, Key.ENTER])(handler)(event);
  };
