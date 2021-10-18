module.exports = ({repoName, description}) => ({
    "annotations": {
      "list": [
        {
          "builtIn": 1,
          "datasource": "-- Grafana --",
          "enable": true,
          "hide": true,
          "iconColor": "rgba(0, 211, 255, 1)",
          "name": "Annotations & Alerts",
          "target": {
            "limit": 100,
            "matchAny": false,
            "tags": [],
            "type": "dashboard"
          },
          "type": "dashboard"
        },
        {
          "enable": false,
          "hide": false,
          "iconColor": "rgba(255, 96, 96, 1)",
          "limit": 100,
          "name": "notes",
          "showIn": 0,
          "tags": "note",
          "type": "tags"
        }
      ]
    },
    "description": description,
    "editable": true,
    "gnetId": null,
    "graphTooltip": 0,
    "links": [],
    "panels": [],
    "refresh": false,
    "schemaVersion": 30,
    "style": "dark",
    "tags": [
      "lft"
    ],
    "templating": {
      "list": []
    },
    "time": {
      "from": "now-15m",
      "to": "now"
    },
    "timepicker": {
      "refresh_intervals": [
        "5s",
        "10s",
        "30s",
        "1m",
        "5m",
        "15m",
        "30m",
        "1h",
        "2h",
        "1d"
      ],
      "time_options": [
        "5m",
        "15m",
        "1h",
        "6h",
        "12h",
        "24h",
        "2d",
        "7d",
        "30d"
      ]
    },
    "timezone": "",
    "title": repoName,
    "uid": repoName  
  })