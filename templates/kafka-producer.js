const rowTemplate = require('./row')
const panelTemplate = require('./panel')

module.exports = ({repoName}) => ([
    // Title
    rowTemplate({
      "title": "Kafka Producer Metrics",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 21
      },    
    }),
    // Row 1
    panelTemplate({
      "targets": [
        {
          "refCount": 0,
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.Kafka.Producer.*.*.Send.mean, 7, 10)`,
          "textEditor": true
        },
        {
          "hide": false,
          "refCount": 0,
          "refId": "B",
          "target": `aliasByNode(application.*.*.*.${repoName}.Kafka.Producer.*.*.Send.p95, 7, 10)`,
          "textEditor": true
        },
        {
          "hide": false,
          "refCount": 0,
          "refId": "C",
          "target": `aliasByNode(application.*.*.*.${repoName}.Kafka.Producer.*.*.Send.p99, 7, 10)`,
          "textEditor": true
        }
      ],
      "title": "Kafka Send Times",
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 0,
        "y": 22
      },    
    }),
    panelTemplate({
      "targets": [
        {
          "refCount": 0,
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.Kafka.Producer.*.*.Failure.count, 7)`,
          "textEditor": true
        }
      ],
      "title": "Kafka Send Failures",
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 12,
        "y": 22
      },    
    }),
  ])