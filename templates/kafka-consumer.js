const rowTemplate = require('./row')
const panelTemplate = require('./panel')

module.exports = ({repoName}) => ([
    rowTemplate({
      "title": "Kafka Consumer Metrics",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 31
      },    
    }),
    panelTemplate({
      "targets": [
        {
          "refCount": 0,
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.Kafka.Consumer.*.count, 4, 7)`
        }
      ],
      "title": "Kafka Consumer Event Count",
      "gridPos": {
        "h": 9,
        "w": 8,
        "x": 0,
        "y": 31
      },    
    }),
    panelTemplate({
      "targets": [
        {
          "refCount": 0,
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.Kafka.Consumer.*.mean, 8)`,
          "textEditor": false
        },
        {
          "hide": false,
          "refCount": 0,
          "refId": "B",
          "target": `aliasByNode(application.*.*.*.${repoName}.Kafka.Consumer.*.p95, 8)`,
          "textEditor": false
        },
        {
          "hide": false,
          "refCount": 0,
          "refId": "C",
          "target": `aliasByNode(application.*.*.*.${repoName}.Kafka.Consumer.*.p99, 8)`,
          "textEditor": false
        }
      ],
      "title": "Kafka Consumer Event Processing Time",
      "gridPos": {
        "h": 9,
        "w": 8,
        "x": 8,
        "y": 31
      },    
    }),
    panelTemplate({
      "targets": [
        {
          "refCount": 0,
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.Kafka.Consumer.*.Lag.mean, 9)`
        },
        {
          "hide": false,
          "refCount": 0,
          "refId": "B",
          "target": `aliasByNode(application.*.*.*.${repoName}.Kafka.Consumer.*.Lag.p95, 9)`
        },
        {
          "hide": false,
          "refCount": 0,
          "refId": "C",
          "target": `aliasByNode(application.*.*.*.${repoName}.Kafka.Consumer.*.Lag.p99, 9)`
        }
      ],
      "title": "Kafka Consumer Lag Time",
      "gridPos": {
        "h": 9,
        "w": 8,
        "x": 16,
        "y": 31
      },    
    }),
  ])