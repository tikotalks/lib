<template>
  <div
    :class="bemm('', [isGroup ? 'is-group' : '', '', size ? size : 'medium'])"
    :data-images="props.image && toArray(props.image).length"
    :style="backgroundStyle">
    <div :class="bemm('container')">



    <div :class="bemm('category-icon')" v-if="isGroup">
      <Icon :name="Icons.FILE_ARCHIVE"></Icon>
    </div>

    <div :class="bemm('content')">
      <span v-if="emoji && !image" :class="bemm('emoji')">{{ emoji }}</span>
      <span v-if="icon && !image" :class="bemm('icon')" v-html="icon"></span>
      <span :class="bemm('text')" :style="{ color: textColor }">{{ text }}</span>
    </div>
  </div>

  <template v-if="actionItems.length">
    <Button
       v-if="actionItems.length == 1"
      :class="bemm('actions')"
      :size="size"
      :color="ButtonSettings.Color.Primary"
      :icon="actionItems[0].icon"
      @click="actionItems[0].action ? actionItems[0].action() : ()=>{}"></Button>

    <ContextMenu v-else :class="bemm('actions')"  :config="{
      items: actionItems,
      position: 'bottom'
    }">
      <Button :class="bemm('action-button')" :size="size" :color="ButtonSettings.Color.Primary" :icon="ButtonSettings.Icon.THREE_DOTS_HORIZONTAL" />
    </ContextMenu>
  </template>

  </div>
</template>

<script lang="ts" setup>
import { useBemm } from "bemm";
import { Icons } from "open-icon";
import { computed, ref, onMounted, watch } from 'vue';
import { useImages } from "@tikotalks/media";
import Icon from "../Icon/Icon.vue";
import { useColor } from "../../../composables/useColor";
import { toArray } from "../../../utils";
import ContextMenu from "../ContextMenu/ContextMenu.vue";
import { Button, ButtonSettings } from "../Button";
import { createContextMenuItem, type ContextMenuItem } from "../ContextMenu";
import type { Size } from "@/types";

const { getImageUrl } = useImages();

const { getAverageColor } = useColor();

const bemm = useBemm('card');

const props = defineProps<{
  text?: string;
  emoji?: string;
  image?: string | string[];
  icon?: string;
  isGroup?: boolean;
  actions?: Partial<ContextMenuItem>[];
  size?: Size;
}>();

const actionItems = computed(()=>{
  return props.actions?.map((a)=>createContextMenuItem(a)).filter((a)=>a.active) || [];
})

const backgroundColor = ref('#ffffff');
const textColor = ref('#000000');

const backgroundStyle = computed(() => {

  let bgImage: string[] = []

  toArray(props.image).forEach((image) => {
    if (image) bgImage.push(`url(${getImageUrl(image, 'thumbnail')})`)
  })


  return {
    backgroundColor: backgroundColor.value,
    backgroundImage: bgImage.join(','),
    '--color': `${backgroundColor.value}`,
    '--text-color': `${textColor.value}`,
  };
});


const setBackgroundColor = async () => {
  const imageUrl = getImageUrl(toArray(props.image)[0] || '', 'thumbnail');
  if (!imageUrl) return;

  const colorData = await getAverageColor(imageUrl);

  backgroundColor.value = colorData.color;
  textColor.value = colorData.text;
};

onMounted(() => {
  if (props.image) setBackgroundColor();
});

watch(() => props.image, () => {
  setBackgroundColor();
});
</script>


<style lang="scss">
.card {
  width: 10em;
  padding: .5em;
  border-radius: 2em;
  background-color: var(--color, var(--color-background-alt, #f5f5f5));
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  &--small{
    width: 7.5em;
  }
  &--medium{
    width: 10em;
  }
  &--large{
    width: 15em;
  }

  &[data-images="1"] {
    background-size: 100%;
    background-position: 0 0;
    background-position: center;
    background-repeat: no-repeat;

    &:has(.card__container:hover){
      background-size: 110%;
      transform:scale(.95);
    }
  }

  &[data-images="2"] {
    background-size: 50% 100%;
    background-position: 0 0, 50% 0;
  }

  &[data-images="3"] {
    background-size: 25% 25%;
    background-position: 0 0, 25% 0, 50% 0;
  }

  &[data-images="3"],
  &[data-images="4"] {
    background-size: 50% 50%,  50% 50%, 50% 50%, 50% 50%;
    background-position:0 0, 100% 0, 0 100%, 100% 100%;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  }
  &[data-images="5"],
  &[data-images="6"],
  &[data-images="7"],
  &[data-images="8"],
  &[data-images="9"] {
    background-size: 33.33% 33.33%;
    background-position:0 0, 0 50%, 0 100%, 50% 0, 50% 50%, 50% 100%, 100% 0, 100% 50%, 100% 100%;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  }

  .talk__cards--sentence & {
    width: 10em;
    aspect-ratio: 4/3;

    &:not(:first-child):not(:last-child) {
      border-radius: 0;
    }

    &:first-child:not(:last-child) {
      border-radius: 2em 0 0 2em;
    }

    &:last-child:not(:first-child) {
      border-radius: 0 2em 2em 0;
    }

    &:first-child:last-child {
      border-radius: 2em;
    }

    .card__emoji,
    .card__icon {
      font-size: 3.5em;
      transform: translateY(.4em);
    }

    .card__text {
      transform: translateY(calc(100% + var(--space)));
    }
  }


  &__category-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1.5em;
    height: 1.5em;
    border-radius: .25em;
    background-color: var(--color);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
  }



  // Background image handling
  &[style*="background-image"] {
  //   background-size: 100%;
  //   background-position: center;
  //   background-repeat: no-repeat;
    transition: all .3s ease-in-out;
  }

  &:hover {
    // background-size: 110%;
    // transform: scale(.95);
    // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .card__emoji {
      transform: scale(1.05);
    }

    .card__text {
      color: var(--color-primary);
    }
  }

  &--is-group {
    background-color: var(--color-tertiary);
    &::before{
      content: "";
      width: 100%; height: 100%; background-color: var(--color);
      position: absolute;top: 0;
      border-radius: inherit;
      mix-blend-mode: normal;
      opacity: .5;
      transition: opacity .2s ease-in-out;
    }
    &:hover{
      background-color: var(--color-primary);
      &::before{
        opacity: 0;
      }
    }
    // background-blend-mode:multiply
  }


  &__text {
    background-color: color-mix(in srgb, var(--color, var(--color-foreground)), transparent 50%);
    color: var(--text-color, var(--color-background));
    height: fit-content;
    font-weight: bold;
    min-width: 1.75em;
    inset: 0;
    padding: .5em .5em;
    border-radius: 1.5em;
    width: fit-content;
    max-width: 100%;
    white-space: wrap;
    font-size: 1.25em;
    line-height: 1;
    backdrop-filter: blur(4px);

    .card--small &{
      font-size: .75em;
    }

  }


  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
    text-align: center;
    width: 100%;
  }

  &__emoji {
    font-size: 3em;
    line-height: 1;
    transform: scale(1);
    transition: all 0.3s ease;
  }

  &__icon {
    width: 32px;
    height: 32px;
  }

  &__actions{
    position: absolute;
    top: var(--space-s);
    right: var(--space-s);
  }

  &__text {}
}
</style>
