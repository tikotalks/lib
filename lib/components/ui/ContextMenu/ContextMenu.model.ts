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


export const createContextMenuItem = (item: Partial<ContextMenuItem>): ContextMenuItem => {
	return {
		...ContextMenuItemDefault,
		...item,
		items: item.items ? item.items.map(createContextMenuItem) : [],
	}
}

export class ContextMenuItemClass {
	id: string;
	disabled: boolean;
	active: boolean;
	icon: Icons;
	label: string;
	link: string;
	action: (() => void) | undefined;
	items: ContextMenuItemClass[];

	constructor(item: Partial<ContextMenuItem>) {
		this.id = item.id || '';
		this.disabled = item.disabled || false;
		this.active = item.active || true;
		this.icon = item.icon || '';
		this.label = item.label || '';
		this.link = item.link || '';
		this.action = item.action;
		this.items = item.items ? item.items.map(i => new ContextMenuItemClass(i)) : [];
	}
}
