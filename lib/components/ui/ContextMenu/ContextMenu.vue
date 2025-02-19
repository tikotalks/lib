<template>
  <div ref="menuRef" :class="bemm()" :style="`--click-x: ${clickX}px; --click-y: ${clickY}px`">
    <div :class="bemm('trigger')" @pointerdown="handlePointerDown" @pointerup="handlePointerUp"
      @pointerleave="handlePointerLeave" @contextmenu.prevent="handleRightClick">
      <slot name="default" />
    </div>
    <div :class="bemm('menu', ['', activeMenu ? 'active' : '', contextConfig.position])">
      <div :class="bemm('content')">
        <ul :class="bemm('list')">
          <li :class="bemm('item')" v-for="item in contextConfig.menu" :key="item.id + item.label">
            <Button :class="bemm('button')" :icon="item.icon" :size="ButtonSettings.Size.Small"
              :rightIcon="item.children ? Icons.CHEVRON_RIGHT : ''" :type="ButtonSettings.Type.Default"
              :color="ButtonSettings.Color.Foreground" @click="handleClick(item)">
              {{ item.label }}
            </Button>
            <ul :class="bemm('list')">
              <li :class="bemm('item')" v-for="subItem in item.children" :key="subItem.id + subItem.label">
                <Button :class="bemm('button')" :icon="subItem.icon" :size="ButtonSettings.Size.Small"
                  :type="ButtonSettings.Type.Default" :color="ButtonSettings.Color.Foreground"
                  @click="handleClick(subItem)">
                  {{ subItem.label }}
                </Button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBemm } from 'bemm';
import { defineProps, ref, onMounted, onUnmounted, type PropType } from 'vue';
import type { ContextMenuItem } from './ContextMenu.model';
import { type ContextMenuConfig, defaultConfig, ContextClickMode } from './ContextMenu.model';
import { type EventData, eventBus, EventAction, EventChannel } from '@/utils/eventBus';
import { ButtonSettings } from '@/components/ui/Button/Button.model';
import Button from '@/components/ui/Button/Button.vue';
import { useRouter } from "vue-router";
import { Icons } from 'open-icon';

const router = useRouter();

const bemm = useBemm('context-menu');
const activeMenu = ref(false);
const clickX = ref(0);
const clickY = ref(0);

const triggerMenu = (e: MouseEvent | PointerEvent, origin: string) => {
  console.log('hi triggrer menu triggered ', origin)
  if (e && contextConfig.position === 'click') {
    clickX.value = Math.round(e.clientX);
    clickY.value = Math.round(e.clientY);
  }
  activeMenu.value = !activeMenu.value;
};


const props = defineProps({
  config: {
    type: Object as PropType<Partial<ContextMenuConfig>>,
  }
});

const contextConfig = { ...defaultConfig, ...props.config };

const pressTimer = ref<number | null>(null);
const isLongPress = ref(false);

const isLongClickMode = contextConfig.clickMode === ContextClickMode.LONG;
const isRightClickMode = contextConfig.clickMode === ContextClickMode.RIGHT;
// const isShortClickMode = contextConfig.clickMode === ContextClickMode.SHORT;

const handlePointerDown = (e: PointerEvent) => {
  if (contextConfig.clickMode !== ContextClickMode.LONG) return;

  e.preventDefault();
  isLongPress.value = false;

  pressTimer.value = window.setTimeout(() => {
    if (contextConfig.vibrate && navigator.vibrate) {
      navigator.vibrate(50);
    }
    triggerMenu(e, 'handlePointerDown');
    isLongPress.value = true;
  }, contextConfig.pressTime);
};

const handleRightClick = (e: MouseEvent) => {
  if (isRightClickMode) {
    triggerMenu(e, 'handleRightClick');
  }
};

const handlePointerUp = (e: PointerEvent) => {
  e.preventDefault();
  if (!isLongClickMode && !isRightClickMode) {
    triggerMenu(e, 'handlePointerUp');
  }

  if (!isLongClickMode) {
    return;
  }

  if (pressTimer.value) {
    clearTimeout(pressTimer.value);
    pressTimer.value = null;
  }
  isLongPress.value = false;
};

const handlePointerLeave = (e: PointerEvent) => {
  e.preventDefault();
  if (pressTimer.value) {
    clearTimeout(pressTimer.value);
    pressTimer.value = null;
  }
};

const handleClick = (item: ContextMenuItem) => {
  if (isRightClickMode) return;

  console.log('this fired?');

  if (item.action) {
    item.action();
  }
  if (item.link) {
    router.push(item.link);
  }
  setTimeout(() => {
    activeMenu.value = false;
  }, 100);
};

const menuRef = ref<HTMLElement | null>(null);

// Add ref to the root element
const handleClickOutside = (event: MouseEvent) => {
  if (activeMenu.value && menuRef.value && !menuRef.value.contains(event.target as Node)) {
    activeMenu.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);

  eventBus.on(EventChannel.CONTEXT, (p) => {
    const payload = p as EventData;

    if (contextConfig.id !== payload.data.id) return;

    if (payload.action == EventAction.CLOSE) {
      activeMenu.value = false;
    }
    if (payload.action == EventAction.OPEN) {
      activeMenu.value = true;
    }
    if (payload.action == EventAction.TOGGLE) {
      activeMenu.value = !activeMenu.value;
    }
  });
});
// Clean up the event listener
onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="scss">
.context-menu {
  $b: &;
  position: relative;
  display: inline-block;
  height: fit-content;

  &--fixed {
    position: fixed;
  }


  &__trigger {
    cursor: pointer;
    z-index: 0;
    position: relative;
  }



  &__menu {
    position: relative;
    width: fit-content;
    top: calc(var(--context-menu-y));
    left: calc(var(--context-menu-x));
    transform: translateX(-50%) translateY(0em) scale(0.75);
    z-index: 2;
    transition: transform 0.2s var(--bezier);
    opacity: 0;

    background-color: var(--color-foreground);
    color: var(--color-primary);

    border-radius: var(--space);



    &--active {
      opacity: 1;
      transform: translateX(-50%) translateY(var(--context-menu-y-offset)) scale(1);
    }

    &--click {
      position: fixed;
      top: 0;
      left: 0;
      transform: translate(var(--click-x), var(--click-y)) scale(0.75);

      &.context-menu__menu--active {
        transform: translate(var(--click-x), var(--click-y)) scale(1);
      }
    }

    &--bottom-center {
      --context-menu-x: 50%;
      --context-menu-y: 100%;
      --context-menu-y-offset: 0em;
      --context-menu-pointer-y: 0%;
    }

    &--bottom-left {
      --context-menu-x: var(--space);
      --context-menu-y: 100%;
      --context-menu-y-offset: 0em;
      --context-menu-pointer-y: 0%;
    }

    &--bottom-right {
      --context-menu-x: calc(100% - var(--space));
      --context-menu-y: 100%;
      --context-menu-y-offset: 0em;
      --context-menu-pointer-y: 0%;
    }

    &--top-left {
      --context-menu-x: var(--space);
      --context-menu-y: -100%;
      --context-menu-y-offset: 0em;
      --context-menu-pointer-y: 100%;
      --context-menu-pointer-rotation: 225deg
    }

    &--top-center {
      --context-menu-x: 50%;
      --context-menu-y: -100%;
      --context-menu-y-offset: 0em;
      --context-menu-pointer-y: 100%;
      --context-menu-pointer-rotation: 225deg
    }

    &--top-right {
      --context-menu-x: calc(100% - var(--space));
      --context-menu-y: -100%;
      --context-menu-y-offset: 0em;
      --context-menu-pointer-y: 100%;
      --context-menu-pointer-rotation: 225deg
    }
  }

  &__content {}

  &__list {
    box-shadow: .125em .125em 1.5em 0 color-mix(in srgb, var(--dark) 10%, transparent);
    padding: var(--space-xs);
    background-color: var(--color-foreground);
    color: var(--color-background);
    border-radius: calc(var(--border-radius) * 1);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    position: relative;
    z-index: 1;

    &::before {
      content: "";
      width: .66em;
      height: .66em;
      position: absolute;
      top: var(--context-menu-pointer-y);
      left: 50%;
      transform: translate(-50%, -50%) rotate(var(--context-menu-pointer-rotation, 45deg));
      background-color: var(--background);
      border-radius: .25em 0 0 0;
      border-bottom-color: transparent;
      border-right-color: transparent;
    }
  }

  &__button {
    --button-align: space-between;
    --button-text-width: 100%;
    --button-color-hover: color-mix(in srgb, var(--color-background), transparent 90%);

    width: 100%;

    .button__container {
      white-space: nowrap;
    }
  }

  &__item {
    position: relative;
    border-radius: var(--border-radius);

    >#{$b}__list {
      display: none;
      position: absolute;
      left: calc(100% - var(--space-xs));
      top: var(--space-xs);


      &:hover {
        display: block;
        opacity: 1;
      }
    }

    &:hover {
      --button-color-hover: var(--color-primary);
    }

    &:hover>#{$b}__list {
      display: block;
    }

    &:has(> #{$b}__list:hover) > #{$b}__button {

      --button-color: color-mix(in srgb, var(--color-background), transparent 90%);

    }
  }
}
</style>
