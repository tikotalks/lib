import type { Icons } from 'open-icon';

export interface ContextMenuItem {
  id?: string;
  disabled?: boolean;
  icon?: Icons;
  link?: string;
  label: string;
  action?: () => void;
  children?: ContextMenuItem[];
}

export const ContextMenuPosition = {
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
  TOP_CENTER: 'top-center',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  CLICK: 'click'
} as const;

export type ContextMenuPosition = typeof ContextMenuPosition[keyof typeof ContextMenuPosition];

export const ContextClickMode = {
  LONG: 'long',
  SHORT: 'short',
  RIGHT: 'right'
}
export type ContextClickMode = typeof ContextClickMode[keyof typeof ContextClickMode];


export interface ContextMenuConfig {
  id: string;
  menu: ContextMenuItem[];
  clickMode: ContextClickMode;
  vibrate: boolean;
  pressTime: number;
  position: ContextMenuPosition;
}

export const defaultConfig: ContextMenuConfig = {
  id: '',
  menu: [],
  clickMode: ContextClickMode.SHORT,
  vibrate: true,
  pressTime: 750,
  position: ContextMenuPosition.BOTTOM_CENTER
}
