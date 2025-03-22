// import type { App } from 'vue';
import { Popup, popupService } from './components/ui/Popup';
import { Button, ButtonGroup } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { ContextMenu } from "./components/ui/ContextMenu";
import { InputText, FormGroup } from "./components/ui/Form";
import { Icon } from './components/ui/Icon';
import './style/global.scss';

// Export components
export {
  Popup,
  popupService,
  Button,
  ButtonGroup,
  Card,
  ContextMenu,
  InputText,
  Icon,
  FormGroup
};

export { useSpeech, useColor } from "./composables";
export * from "./utils";
export * from "./components/ui/Popup/Popup.model";
export * from "./components/ui/ContextMenu/ContextMenu.model";
export * from "./components/ui/Button/Button.model";


// Export types
export * from './types';
