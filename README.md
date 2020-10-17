# Grafana Panel Plugin - Development workflow
#### FETCH https://developers.giphy.com/docs/api/endpoint/

-------------------


## Endpoints
- [Giphy Search Endpoint](https://developers.giphy.com/docs/api/endpoint)
- [API key](https://developers.giphy.com/dashboard/) => Create an App => ```GgaqOqSSgLYh784IbcmI9dJXqMKdUUUa```
- [GIPHY SDK for Web](https://developers.giphy.com/docs/sdk/#web)
``` 
    yarn add @giphy/react-components @giphy/js-fetch-api 
    npm i @giphy/react-components @giphy/js-fetch-api 
```
- [API Explorer](https://developers.giphy.com/explorer/)
- [Request URL](https://api.giphy.com/v1/gifs/search?api_key=GgaqOqSSgLYh784IbcmI9dJXqMKdUUUa&q=cat&limit=1&offset=0&rating=g&lang=en)

-------------------

## Prerequisites
- Grafana 7.0
- NodeJS 12.x
- yarn or npm

-------------------

## Development workflow

- Open Grafana in your browser
- Create a new dashboard
- Add a new panel
- Select your panel from the list of visualization types:
    (right sidebar => Panel => Visualization => my-plugin-giphy)
- Save the dashboard
- In ```App.tsx```, make changes
- Run ```yarn dev``` or ``` npm run watch``` to build the plugin
- In the browser [http://localhost:3000/](http://localhost:3000/), 
    reload Grafana with the new changes
- In ```types.ts```, add a ```CircleColor``` type to hold the colors the users can choose from
- In the ```SimpleOptions``` interface, add a new option called ```color```:

``` 
// types.ts

   type SeriesSize = 'sm' | 'md' | 'lg';
   type CircleColor = 'red' | 'green' | 'blue';
   
   export interface SimpleOptions {
     text: string;
     showSeriesCount: boolean;
     seriesCountSize: SeriesSize;
     color: CircleColor;
   }
```

- To change the option from the panel editor, you need to bind the color option to an option control
- In ```src/module.ts```, add the control at the end of the builder:

```
// src/module.ts

.addRadio({
  path: 'color',
  name: 'Circle color',
  defaultValue: 'red',
  settings: {
    options: [
      {
        value: 'red',
        label: 'Red',
      },
      {
        value: 'green',
        label: 'Green',
      },
      {
        value: 'blue',
        label: 'Blue',
      },
    ],
  }
});
```

- Grafana builds an options editor for you and displays it 
    in the panel editor sidebar in the Display section
- To convert option value to the colors used by the current theme, 
    add a switch statement right before the return statement in ```App.tsx```
    
``` 
//App.tsx

let color: string;
switch (options.color) {
  case 'red':
    color = theme.palette.redBase;
    break;
  case 'green':
    color = theme.palette.greenBase;
    break;
  case 'blue':
    color = theme.palette.blue95;
    break;
}
```

- Configure the circle to use the color:

``` 
//App.tsx

    <g>
      <circle style={{ fill: color }} r={100} />
    </g>

```

#### [Build a plugin](https://grafana.com/docs/grafana/latest/developers/plugins/)

[build a panel plugin](https://grafana.com/tutorials/build-a-panel-plugin/#6)

-------------------

- [Grafana TestData DB](https://grafana.com/docs/grafana/latest/datasources/testdata/) => 
    Configuration => Data Sources => Add data source => TestData DB => Save & Test 
- Create mock data => Data Sources / TestData DB => Dashboards => Simple Streaming Example => Import


-------------------
