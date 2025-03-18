import { ContextMenuItemDefault, type ContextMenuItem } from './ContextMenu.model';

export const processMenuItems = (items: Partial<ContextMenuItem>[]): ContextMenuItem[] => {
	return items
		.map((item) => {
			const newItem = { ...ContextMenuItemDefault, ...item } as ContextMenuItem;
			if (newItem.items && newItem.items.length > 0) {
				newItem.items = processMenuItems(newItem.items);
			}
			return newItem;
		})
		.filter(item => !item.disabled && item.active);
};
