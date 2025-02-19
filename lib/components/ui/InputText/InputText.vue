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
  padding: 0.75em;
  border: none;
  border-radius: 0.5em;
  background: transparent;
  border: 1px solid var(--color-foreground);
  color: var(--color-foreground);
  font-size: 1em;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
}
</style>