import { ref, markRaw, type Component } from 'vue';

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

const usePopupService = () => {
  const popups = ref<PopupInstance[]>([]);

  const showPopup = (options: PopupOptions) => {
    const id = crypto.randomUUID();
    const newPopup: PopupInstance = {
      id,
      component: markRaw(options.component),
      title: options.title,
      props: options.props || {},
      slots: options.slots,
      config: {
        hasBackground: options.config?.background ?? true,
        position: options.config?.position || 'center',
        canClose: options.config?.canClose ?? true,
      },
      onClose: options.onClose,
    };

    popups.value.push(newPopup);
    return id;
  };

  const closePopup = (id?: string) => {
    if (id) {
      const popup = popups.value.find(p => p.id === id);
      if (popup) {
        popup.onClose?.();
        popups.value = popups.value.filter(p => p.id !== id);
      }
    } else {
      const popup = popups.value[popups.value.length - 1];
      if (popup) {
        popup.onClose?.();
        popups.value.pop();
      }
    }
  };

  const closeAllPopups = () => {
    popups.value.forEach(popup => {
      popup.onClose?.();
    });
    popups.value = [];
  };

  return {
    popups,
    showPopup,
    closePopup,
    closeAllPopups
  };
};

export const popupService = usePopupService();
