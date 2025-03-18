<template>
	<ul :class="bemm('list')">
		<li v-for="item in items" :key="item.id + item.label" :class="bemm('list-item')">
			<Button :icon="item.icon" :size="ButtonSettings.Size.Small"
				:class="bemm('item', ['', item.items?.length ? 'has-submenu' : ''])" :type="ButtonSettings.Type.Ghost"
				@click="handleClick(item)">
				{{ item.label }}
				<Icon v-if="item.items?.length" :name="Icons.CHEVRON_RIGHT" />
			</Button>
			<div v-if="item.items?.length" :class="['panel', bemm('submenu')]">
				<ContextMenuItems :items="processMenuItems(item.items)" :context-menu="contextMenu" />
			</div>
		</li>
	</ul>
</template>

<script lang="ts" setup>
import { useBemm } from 'bemm';
import { defineProps, type PropType } from 'vue';
import { Icons } from 'open-icon';
import { useRouter } from "vue-router"

import type ContextPanel from '../ContextPanel/ContextPanel.vue';
import Icon from '../../ui/Icon/Icon.vue';
import type { ContextMenuItem } from './ContextMenu.model';
import { processMenuItems } from './ContextMenu.utils';
import { ButtonSettings, Button } from '../../ui/Button';

const bemm = useBemm('context-menu-items');
const router = useRouter();

const props = defineProps({
	items: {
		type: Array as PropType<Required<ContextMenuItem>[]>,
		required: true,
	},
	contextMenu: {
		type: Object as PropType<InstanceType<typeof ContextPanel>>,
		required: true,
	},
});

const handleClick = (item: ContextMenuItem) => {
	if (item.items?.length) {
		return;
	}

	if (item.action) {
		item.action();
	}
	if (item.link) {
		router.push(item.link);
	}
	setTimeout(() => {
		props.contextMenu?.close();
	}, 100);
};
</script>

<style lang="scss">
.context-menu-items {
	&__list-item {

		--button-width: 100%;
		--button-container-justify: flex-start;
		--button-border-radius: 4px;
		--button-background-color: red;
		--button-background-color--hover: blue;

		position: relative;

		&:hover {
			>.context-menu-items__submenu {
				transform: scale(1);
				pointer-events: all;
				opacity: 1;
			}
		}
	}

	&__submenu {
		display: block;
		opacity: 0;
		pointer-events: none;
		transform: scale(0.75);
		position: absolute;
		left: 100%;
		top: 0;
		transform-origin: left top;
		transition: all 0.1s;
	}
}
</style>
