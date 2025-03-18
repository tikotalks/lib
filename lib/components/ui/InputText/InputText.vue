<script setup lang="ts">
import { useBemm } from 'bemm';

const { bemm } = useBemm('input-text');

defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :placeholder="placeholder"
    :class="bemm()"
  />
</template>

<style lang="scss">
.input-text {
  width: 100%;
  padding: var(--input-padding,0.75em);
  border: none;
  border-radius: var(--input-border-radius, 0.5em);
  background: var(--input-background, transparent);
  border: var(--input-border-width, 1px) solid var(--input-border-color, var(--color-foreground));
  color: var(--input-color, var(--color-foreground));
  font-size: var(--input-font-size,1em);

  &:focus {
    outline: none;
    border-color: var(--input-border-color--focus, var(--color-primary));
  }
}
</style>
