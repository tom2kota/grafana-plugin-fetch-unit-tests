# Grafana Panel Plugin - Giphy Images 

Giphy images Fetched from endpoint: https://developers.giphy.com/docs/api/endpoint/

-------------------

## Prerequisites
- Grafana 7.0
- NodeJS 12.x
- yarn or npm

Copy this plugin to Directory where grafana will automatically scan and look for plugins:
``` plugins = data/plugins ``` 

Restart the Grafana server for Grafana to discover your plugin.

Open Grafana and go to Configuration -> Plugins. Make sure that your plugin is there.

-------------------

In console run:
``` 
    npm i
    npm audit fix
    npm run jest
    npm run watch
```

Go to web-browser [localhost](http://localhost:3000/)

-------------------
