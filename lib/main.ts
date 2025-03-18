import type { App } from 'vue';
import { Popup, popupService } from './components/ui/Popup';
import { Button, ButtonGroup } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { ContextMenu } from "./components/ui/ContextMenu";
import { InputText } from "./components/ui/InputText";

// Export components
export { Popup, popupService, Button, ButtonGroup, Card, ContextMenu, InputText };

// Export types
export * from './types';

// Vue plugin installation
export default {
  install: (app: App): void => {
    app.component('TikoPopup', Popup);
  }
};
