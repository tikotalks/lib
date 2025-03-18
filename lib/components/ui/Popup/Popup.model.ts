import { type Component } from 'vue';

export interface PopupOptions {
  component: Component;
  props?: Record<string, any>;
  title: string;
  slots?: Record<string, () => Component | string>;
  onClose?: () => void;
  config?: {
    background?: boolean;
    position?: 'center' | 'bottom' | 'top';
    canClose?: boolean;
  };
}

export interface PopupInstance {
  id: string;
  component: Component;
  title: string;
  props: Record<string, any>;
  slots?: Record<string, () => Component | string>;
  onClose?: () => void;
  config: {
    hasBackground: boolean;
    position: string;
    canClose: boolean;
  };
}
