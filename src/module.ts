import {PanelPlugin} from '@grafana/data';
import {SimpleOptions} from './types';
import {App} from './App';

export const plugin = new PanelPlugin<SimpleOptions>(App).setPanelOptions(builder => {
  return builder
    .addRadio({
      path: 'results',
      name: 'Search results (Change limit to):',
      defaultValue: 10,
      settings: {
        options: [
          {
            value: 5,
            label: '5',
          },
          {
            value: 10,
            label: '10',
          },
          {
            value: 15,
            label: '15',
          },
          {
            value: 20,
            label: '20',
          },
          {
            value: 25,
            label: '25',
          },
          {
            value: 30,
            label: '30',
          },
          {
            value: 40,
            label: '40',
          },
          {
            value: 50,
            label: '50',
          },
          {
            value: 100,
            label: '100',
          },
        ],
      }
    });
});
