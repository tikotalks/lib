<template>
  <Teleport to="body">
    <template v-for="popup, index in popups" :key="popup.id">
      <div :class="[bemm(), bemm('', popup.config.position), bemm('', `layer-${index}`)]" :style="`--popup-layer: ${index}`">
        <div v-if="popup.config.hasBackground && index === 0" :class="bemm('background')" @click="closePopup(popup.id)" />
        <div :class="bemm('container')">
          <div :class="bemm('header')">

            <h2 :class="bemm('header-title')">
              {{  popup.title }}
              <component v-if="popup.slots?.headerTitle"  :is="popup.slots.headerTitle" />
            </h2>
            <div :class="bemm('header-actions')">
              <component v-if="popup.slots?.headerActions" :is="popup.slots.headerActions" />
              <Button v-if="popup.config.canClose" :class="bemm('close')" :action="() => closePopup(popup.id)"
                :icon="Icons.MULTIPLY_M" :size="Size.Small" :color="Colors.Tertiary" />
            </div>

          </div>
          <component :is="popup.component" v-bind="popup.props" @close="closePopup(popup.id)" />
          <div v-if="popup.slots?.footer" :class="bemm('footer')">
            <component :is="popup.slots.footer" />
          </div>
        </div>
      </div>
    </template>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useBemm } from 'bemm';
import { popupService } from './Popup.service';
import { Colors, Size } from '@/types';
import { Icons } from 'open-icon';
import Button from '@/components/ui/Button/Button.vue';

const { bemm } = useBemm('popup');
const popups = computed(() => popupService.popups.value);
const closePopup = popupService.closePopup;

onMounted(() => {
  console.log('popups', popups.value)
});
</script>

<style lang="scss">
.popup {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  &__background {
    position: absolute;
    inset: 0;
    background-color: color-mix(in srgb, var(--color-dark), black 50%);
    backdrop-filter: blur(5px);
  }

  &__container {
    position: relative;
    background: var(--color-background);
    border-radius: 1rem;
    padding: 1rem;
    max-width: 90vw;
    max-height: 90vh;
    transform: translateY(calc(var(--popup-layer) * 3em));
    box-shadow: 0 0 3em 0 rgba(0,0,0,1);
  }

  &__header {
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  &__header-actions{
    display: flex;
    align-items: center;
    gap: 1em;
  }

  &__header-title{
    color: var(--color-secondary);
  }

  &__close {
  }

  &--bottom {
    align-items: flex-end;

    .popup__container {
      width: 100%;
      border-radius: 1rem 1rem 0 0;
    }
  }
}
</style>
