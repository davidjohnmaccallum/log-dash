let id = 50

module.exports = (props) => ({
    "id": id++,
    "aliasColors": {},
    "bars": false,
    "dashLength": 10,
    "dashes": false,
    "datasource": null,
    "fieldConfig": {
      "defaults": {
        "links": []
      },
      "overrides": []
    },
    "fill": 1,
    "fillGradient": 0,
    "gridPos": {
      "h": 9,
      "w": 12,
      "x": 0,
      "y": 0
    },
    "hiddenSeries": false,
    "legend": {
      "avg": false,
      "current": false,
      "hideEmpty": true,
      "hideZero": true,
      "max": false,
      "min": false,
      "show": true,
      "total": false,
      "values": false
    },
    "lines": true,
    "linewidth": 1,
    "links": [],
    "nullPointMode": "null as zero",
    "options": {
      "alertThreshold": true
    },
    "percentage": false,
    "pluginVersion": "8.1.5",
    "pointradius": 2,
    "points": false,
    "renderer": "flot",
    "seriesOverrides": [],
    "spaceLength": 10,
    "stack": false,
    "steppedLine": false,
    "thresholds": [],
    "timeFrom": null,
    "timeRegions": [],
    "timeShift": null,
    "tooltip": {
      "shared": true,
      "sort": 0,
      "value_type": "individual"
    },
    "type": "graph",
    "xaxis": {
      "buckets": null,
      "mode": "time",
      "name": null,
      "show": true,
      "values": []
    },
    "yaxes": [
      {
        "$$hashKey": "object:96",
        "format": "short",
        "label": null,
        "logBase": 1,
        "max": null,
        "min": null,
        "show": true
      },
      {
        "$$hashKey": "object:97",
        "format": "short",
        "label": null,
        "logBase": 1,
        "max": null,
        "min": null,
        "show": true
      }
    ],
    "yaxis": {
      "align": false,
      "alignLevel": null
    },
    ...props
  })