import type { Icons } from 'open-icon';
import { ContextPanelPosition, type ContextPanelConfig, ContextPanelConfigDefault } from '../ContextPanel/ContextPanel.model';

export interface ContextMenuItem {
	id: string;
	disabled: boolean;
	active: boolean;
	icon: Icons;
	label: string;
	link: string;
	action: (() => void) | undefined;
	items: Partial<ContextMenuItem>[];
}

export const ContextMenuItemDefault: Required<ContextMenuItem> = {
	id: '',
	disabled: false,
	active: true,
	icon: '',
	label: '',
	link: '',
	action: undefined,
	items: [] as Required<ContextMenuItem>[],
};

export const ContextMenuPosition = ContextPanelPosition;
export type ContextMenuPosition = typeof ContextMenuPosition[keyof typeof ContextMenuPosition];
export type ContextMenuConfig = ContextPanelConfig;
export const ContextMenuConfigDefault = ContextPanelConfigDefault;
