<template>
  <component :is="to ? 'router-link' : 'button'" :to="to" :class="[
    bemm(),
    bemm('', color),
    bemm('', status),
    bemm('', type),
    bemm('', size),
    icon && bemm('', 'with-icon'),
    isIconOnly && bemm('', 'icon-only'),
    isTextOnly && bemm('', 'text-only'),
    !isTextOnly && !isIconOnly && bemm('', 'text-icon'),
    isActive && bemm('', 'active')
  ]"
    :style="`--int-button-color: var(--color-${color ? color : Colors.Primary}); --int-button-text: var(--text-${color ? color : Colors.Primary}); `"
    :disabled="disabled || status === ButtonStatus.Loading" :type="htmlType" @pointerdown="handlePointerDown"
    @pointerup="handlePointerUp" @pointerleave="handlePointerLeave">
    <div :class="bemm('container')">
      <Icon v-if="icon" :name="icon" :class="bemm('icon',['','left'])" />
      <span :class="bemm('text')" v-if="hasSlot('default')">
        <slot></slot>
      </span>
      <Icon v-if="rightIcon" :name="rightIcon" :class="bemm('icon',['','right'])"></Icon>
    </div>
    <div v-if="status !== ButtonStatus.Idle" :class="bemm('status')">
      <span v-if="status === ButtonStatus.Loading">...</span>
      <Icon v-if="status === ButtonStatus.Success" :name="Icons.CHECK_M" />
      <Icon v-if="status === ButtonStatus.Error" :name="Icons.MULTIPLY_M" />
    </div>
  </component>
</template>

<script setup lang="ts">
import { ButtonSettings, ButtonStatus, ButtonType } from './Button.model';
import { useSlots, computed, ref } from 'vue'
import { useBemm } from 'bemm';
import { Icons } from "open-icon";
import { Colors, Size } from '@/types';
import Icon from '@/components/ui/Icon/Icon.vue';
import { useRoute } from 'vue-router';
import type { Slots } from 'vue'

const { bemm } = useBemm('button');

const slots: Slots = useSlots()
type SlotName = keyof typeof slots;

const hasSlot = (name: SlotName) => {
  return !!slots[name];
};

interface Props {
  action?: () => void;
  onLongPress?: () => void;
  longPressTime?: number;
  vibrate?: boolean;
  color?: Colors;
  icon?: Icons;
  rightIcon?: Icons;
  image?: string;
  size?: Size;
  status?: ButtonStatus,
  htmlType?: 'button' | 'submit',
  type?: ButtonType,
  disabled?: boolean
  to?: string;  // Add this new prop for router-link
}

const route = useRoute();
const isActive = computed(() => props.to && route.path === props.to);

const props = withDefaults(defineProps<Props>(), {
  color: Colors.Foreground,
  icon: undefined,
  image: undefined,
  size: Size.Medium,
  longPressTime: 750,
  vibrate: true,
  disabled: false,
  htmlType: 'button',
  type: ButtonSettings.Type.Default,
  status: ButtonSettings.Status.Idle,
});

const pressTimer = ref<number | null>(null);
const isLongPress = ref(false);

const handlePointerDown = (e: PointerEvent) => {
  if (props.disabled) return;
  e.preventDefault(); // Prevent any default behavior
  isLongPress.value = false;

  pressTimer.value = window.setTimeout(() => {
    if (props.vibrate && navigator.vibrate) {
      navigator.vibrate(50);
    }
    if (props.onLongPress) {
      props.onLongPress();
      isLongPress.value = true;
    }
  }, props.longPressTime);
};

const handlePointerUp = (e: PointerEvent) => {
  e.preventDefault(); // Prevent any default behavior
  // Only trigger click action if no longpress occurred
  if (!isLongPress.value && props.action) {
    props.action();
  }
  // Clear the timer
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


const isIconOnly = computed(() => {
  return !!(!hasSlot('default') && props.icon);
})

const isTextOnly = computed(() => {
  return !!(hasSlot('default') && !props.icon);
})



</script>

<style lang="scss">
.button {

  width: fit-content;
  font-size: 1em;
  border: none;
  box-shadow: 0 0 0em 0 var(--color-background), 0 0 0em 0 var(--color-background), 0 0 0em 0 var(--button-color);
  background-color: transparent;
  border-radius: var(--button-border-radius, calc(var(--border-radius) * 2));
  margin: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;



  &--small {
    font-size: .75em;
  }

  &--medium {
    font-size: 1em;
  }

  &--large {
    font-size: 1.25em;
  }

  &__container {
    display: inline-flex;
    align-items: center;
    justify-content: var(--button-align, center);
    width: 100%;
    background-color: var(--button-color, var(--int-button-color));
    color: var(--button-text, var(--int-button-text));
    border-radius: inherit;
    gap: 0.5em;
    padding: .75em 1.5em;
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--button-color-hover, var(--custom-button-color-hover, var(--button-color)));
    }
  }

  &:focus .button__container:hover {
    box-shadow: 0 .125em 0 0em color-mix(in srgb, var(--button-color), black 25%);
    transform: translateY(.125em);
  }

  &--default {
    &:hover {
      --custom-button-color-hover: color-mix(in srgb, var(--int-button-color), var(--color-background) 20%);
    }
  }

  &--fancy {
    &__text {
      text-shadow: 0 0 0em color-mix(in srgb, transparent, var(--color-dark) 50%);
      transition: all 0.3s ease;
    }

    &__icon {
      filter: drop-shadow(0 0 0 color-mix(in srgb, transparent, var(--color-dark) 50%));
      transition: all 0.3s ease;
    }

    &:hover {
      box-shadow: 0em .5em 0em 0em color-mix(in srgb, transparent, var(--color-background) 50%), 0em .5em .25em 0em color-mix(in srgb, transparent, var(--color-background) 50%), 0 .5em 2em 0 var(--button-color);

      .button__text {
        text-shadow: 0em .25em 0.1em color-mix(in srgb, transparent, var(--color-dark) 50%);
        transform: translateY(-.25em);
      }

      .button__icon {
        transform: translateY(-.25em) scale(1.1) rotate(-5deg);
        filter: drop-shadow(0 0 0.25em color-mix(in srgb, transparent, var(--color-dark) 50%));
      }
    }

    .button__container {
      box-shadow: 0 .25em 0 0em color-mix(in srgb, var(--button-color), black 25%);

      background-image: radial-gradient(circle, color-mix(in srgb, var(--color-foreground), var(--button-color) 50%), transparent 90%);

      &:hover {
        box-shadow: 0 .5em 0 0em color-mix(in srgb, var(--button-color), black 25%);
        transform: translateY(-.25em);
      }
    }
  }

  &--ghost {
    .button__container {
      background-color: transparent;
      color: var(--button-color);
    }
  }

  &__icon {
    font-size: 1.5em;
    flex-shrink: 0;
  }

  &__text {
    line-height: 1;
    text-align: var(--button-text-align, left);
    width: var(--button-text-width, fit-content);
  }

  &--icon-only .button__container {
    padding: .5em;
  }

  &--text-icon .button__container {
    padding-left: .75em;
    &:has(.button__icon--right){
      padding-right: .75em;
    }
  }


  &__status {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--button-text);
    font-size: 1.5em;
  }

  &--loading {
    .button__container {
      opacity: 0.5;
    }
  }

  &--success {
    --button-color: var(--color-success);
    --button-text: var(--text-success);
  }

  &--error {
    --button-color: var(--color-error);
    --button-text: var(--text-error);
  }

  &--idle {
    .button__container {
      opacity: 1;
      transition: .3s opacity var(--bezier);
    }
  }

  &--active {
    .button__container {
      background-color: color-mix(in srgb, var(--button-color), black 15%);
      transform: translateY(.125em);
      box-shadow: 0 .125em 0 0 color-mix(in srgb, var(--button-color), black 25%);
    }
  }

  &[disabled]:not([disabled='false']) {
    cursor: not-allowed;
    opacity: .5;
  }
}
</style>
