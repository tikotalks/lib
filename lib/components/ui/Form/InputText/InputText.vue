<script setup lang="ts">
import { useBemm } from 'bemm';

const { bemm } = useBemm('input-text');

defineProps<{
  modelValue: string;
  placeholder?: string;
  label?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <div :class="bemm()">
    <label :class="bemm('label')" v-if="label">
      {{ label }}
      </label>
      <div :class="bemm('control-container')">
        <input
    :class="bemm('control')"
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :placeholder="placeholder"
  />

      </div>

  </div>
</template>

<style lang="scss">
.input-text {
  width: 100%;
  border: none;
  display: flex;
  flex-direction: var(--input-flex-direction, column);
  gap: var(--input-gap, var(--space-s));

  &__control-container{
    border-radius: var(--input-border-radius, 0.5em);
    background: var(--input-background, transparent);
    border: var(--input-border-width, 1px) solid var(--input-border-color, color-mix(in srgb, var(--color-foreground), transparent 50%));
    color: var(--input-color, var(--color-foreground));
    font-size: var(--input-font-size,1em);
    transition: border-color 0.2s ease-in-out;
    &:focus-within{
      border: var(--input-border-width--focus, var(--input-border-width,1px)) solid var(--input-border-color--focus,var(--input-border-color, var(--color-foreground)));
    }
  }

  &__control{
    width: 100%;
    border: none;
    font-size: inherit;
    padding: var(--input-padding, 0.75em);
    background-color: transparent;
    color: inherit;
    &:focus{
      outline: none;
    }
  }

  &:has(:focus) {
    border-color: var(--input-border-color--focus, var(--color-primary));
  }
}
</style>
