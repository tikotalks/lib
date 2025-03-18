import { ref, markRaw } from 'vue';
import { type PopupInstance, type PopupOptions } from './Popup.model';

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
      const popup = popups.value.find((p:PopupInstance) => p.id === id);
      if (popup) {
        popup.onClose?.();
        popups.value = popups.value.filter((p:PopupInstance)  => p.id !== id);
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
    popups.value.forEach((popup:PopupInstance) => {
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
