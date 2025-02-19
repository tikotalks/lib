export const Colors = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Background: 'background',
  Foreground: 'foreground',
  Error: 'error',
  Warning: 'warning',
  Info: 'info',
  Success: 'success',
}

export type Colors = typeof Colors[keyof typeof Colors];
