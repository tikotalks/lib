import mitt from 'mitt';

export type EventData = {
  action: string;
  data?: any;
};

export const EventChannel = {
  UI: 'ui',
  POPUP: 'popup',
  CONTEXT: 'context'
} as const;

export const EventAction = {
  KEY: 'key',
  OPEN: 'open',
  CLOSE: 'close',
  FORCE_CLOSE: 'force_close',
  TOGGLE: 'toggle',
} as const;

export const EventKeys = {
  ESCAPE: 'Escape'
} as const;

export const eventBus = mitt();
