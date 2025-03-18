<template>
	<ContextPanel
		ref="contextMenuRef"
		:config="config"
	>
		<template #default>
			<slot />
		</template>
		<template #content>
			<ContextMenuItems
				:items="menuItems"
				:context-menu="contextMenuRef"
			/>
		</template>
	</ContextPanel>
</template>

<script lang="ts" setup>
// import { useBemm } from 'bemm';
import { defineProps, ref, type PropType } from 'vue';
import { type ContextMenuConfig, ContextMenuConfigDefault } from './ContextMenu.model';
import ContextMenuItems from './ContextMenuItems.vue';
import { processMenuItems } from './ContextMenu.utils';
import ContextPanel from '../ContextPanel/ContextPanel.vue';

// const bemm = useBemm('context-menu');
const contextMenuRef = ref();

const props = defineProps({
	config: {
		type: Object as PropType<Partial<ContextMenuConfig>>,
		default: () => {},
	},
});

const { menu } = {
	...ContextMenuConfigDefault,
	...props.config,
};

const menuItems = ref(processMenuItems(menu));

defineExpose({
	close: () => contextMenuRef.value?.close(),
	open: () => contextMenuRef.value?.open(),
	toggle: () => contextMenuRef.value?.toggle(),
});
</script>

<style lang="scss">
.context-menu {
	// &__list {
	// 	list-style: none;
	// 	padding: 0;
	// 	margin: 0;
	// 	display: flex;
	// 	flex-direction: column;
	// 	gap: var(--space-xs);
	// }

	// &__list-item {
	// 	position: relative;
	// }

	// &__item {
	// 	width: 100%;
	// 	justify-content: flex-start;
	// 	text-align: left;
	// 	white-space: nowrap;

	// 	&--has-submenu {
	// 		&::after {
	// 			content: '>';
	// 			position: absolute;
	// 			right: 0.5rem;
	// 			top: 50%;
	// 			transform: translateY(-50%);
	// 		}
	// 	}
	// }

	// &__submenu {
	// 	position: absolute;
	// 	left: 100%;
	// 	top: 0;
	// 	// background: var(--background);
	// 	// padding: var(--space-xs);
	// 	// border-radius: var(--radius);
	// 	// box-shadow: var(--shadow);
	// 	// z-index: 1;
	// 	// min-width: 150px;
	// }
}
</style>
