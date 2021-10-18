# Dash

Helps to create Grafana dashboards for our microservices.

```shell
# Install

$ npm i -g https://github.com/davidjohnmaccallum/log-dash

# Use

$ log-dash
log-dash <command>

Commands:
  log-dash create  Create a Grafana dashboard for a microservice.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]

Please choose a command
$ log-dash create
? Microservice repository name log-david-svc
? Dashboard description This is David's service
? Dashboard sections to include Upstreams, Database
Dashbaoard JSON written to log-david-svc-dashboard.json

# Update 

$ npm up log-dash
```

## Dashboard Layout

One of the tricky things to get right is positioning dashboard elements. The dashboard is divided into a grid (a bit like Bootstrap) and elements are positioned on a dashboard according to their `gridPos`. The grid is divided into 24 columns, so an element with width of 24 takes up the full width whereas an element with width of 8 takes up one third of the width.

Here is an example:

![](layout.png)

```javascript
[
  panelTemplate({
    "title": "Panel 1",
    "gridPos": {
      "h": 9,
      "w": 12,
      "x": 0,
      "y": 0
    }  
  }),
  panelTemplate({
    "title": "Panel 1",
    "gridPos": {
      "h": 9,
      "w": 12,
      "x": 12,
      "y": 0
    }  
  }),
  panelTemplate({
    "title": "Panel 1",
    "gridPos": {
      "h": 9,
      "w": 24,
      "x": 0,
      "y": 9
    }  
  }),
]
```