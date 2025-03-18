<template>
  <div :class="bemm()">
    <h3 :class="bemm('title')" v-if="title">{{ title }}</h3>
  <slot />
    </div>
</template>

<script lang="ts" setup>
import { useBemm } from 'bemm';
const bemm = useBemm('form-group');

defineProps<{
    title?: string;
}>();
</script>


<style lang="scss">
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--form-group-gap, var(--space));
}
</style>
