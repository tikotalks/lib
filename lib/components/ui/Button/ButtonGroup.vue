<template>
  <div :class="bemm('',['',props.align])">
    <slot></slot>
  </div>
</template>


<script lang="ts" setup>
import { useBemm } from "bemm";
import { ButtonSettings } from "./Button.model";


const bemm = useBemm("ButtonGroup");

const props = defineProps({
  align: {
    type: String,
    default: ButtonSettings.Align.Left,
  }
});
</script>

<style lang="scss">
.button-group {
  display: flex;
  gap: var(--space);

  &--start,
  &--left{
    justify-content: flex-start;
  }
  &--center{
    justify-content: center;
  }
  &--end,
  &--right{
    justify-content: flex-end;
  }

}
</style>
