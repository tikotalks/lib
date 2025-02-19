import { Icons } from 'open-icon';
import { Colors, Size, Status } from '@/types';

export const ButtonStatus = Status;
export type ButtonStatus = typeof ButtonStatus[keyof typeof ButtonStatus];

export interface ButtonProps {
  action?: () => void;
  onLongPress?: () => void;
  longPressTime?: number;
  vibrate?: boolean;
  color: ButtonColor;
  type?: ButtonType;
  icon?: Icons;
  size?: ButtonSize;
  status?: ButtonStatus;
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

export const ButtonType = {
  Default: 'default',
  Ghost: 'ghost',
  Fancy: 'fancy'
}
export type ButtonType = typeof ButtonType[keyof typeof ButtonType];

export const ButtonSize = Size;
export type ButtonSize = typeof ButtonSize[keyof typeof ButtonSize];

export const ButtonColor = Colors;
export type ButtonColor = typeof ButtonColor[keyof typeof ButtonColor];

export const ButtonAlign = {
  Left: 'left',
  Center: 'center',
  Right: 'right',
  Start: 'start',
  End: 'end',
}
export type ButtonAlign = typeof ButtonAlign[keyof typeof ButtonAlign];

export const ButtonSettings = {
  Size: ButtonSize,
  Color: ButtonColor,
  Type: ButtonType,
  Status: ButtonStatus,
  Align: ButtonAlign,
  Icon: Icons
}
export type ButtonSettings = typeof ButtonSettings[keyof typeof ButtonSettings];
