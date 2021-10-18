const rowTemplate = require('./row')
const panelTemplate = require('./panel')

module.exports = ({repoName}) => ([
    rowTemplate({
      "title": "Downstreams",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 40
      },    
    }),
    panelTemplate({
      "targets": [
        {
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.downstream.*.*.count, 6, 7)`
        }
      ],
      "title": "Call Counts",
      "gridPos": {
        "h": 9,
        "w": 8,
        "x": 0,
        "y": 41
      },    
    }),
    panelTemplate({
      "targets": [
        {
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.downstream.*.*.status.*.count, 6, 7, 9)`,
          "textEditor": true
        }
      ],
      "title": "Response Codes",
      "gridPos": {
        "h": 9,
        "w": 8,
        "x": 8,
        "y": 41
      },    
    }),
    panelTemplate({
      "targets": [
        {
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.downstream.*.*.p95, 6, 7)`
        }
      ],
      "title": "Response Times P95",
      "gridPos": {
        "h": 9,
        "w": 8,
        "x": 16,
        "y": 41
      },    
    }),
  ])