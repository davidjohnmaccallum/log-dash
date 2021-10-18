const rowTemplate = require('./row')
const panelTemplate = require('./panel')

module.exports = ({repoName}) => ([
    // Title
    rowTemplate({
      "title": "Database",
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 11
      },    
    }),
    // Row 1
    panelTemplate({
      "targets": [
        {
          "refCount": 0,
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.Database.*.*.count, 6, 7)`,
          "textEditor": false
        }
      ],
      "title": "Parcel DB: Request count",
      "gridPos": {
        "h": 9,
        "w": 8,
        "x": 0,
        "y": 12
      },    
    }),
    panelTemplate({
      "targets": [
        {
          "refCount": 0,
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.Database.*.*.p99, 6, 7)`,
          "textEditor": false
        }
      ],
      "title": "Parcel DB: Response Time (P99)",
      "gridPos": {
        "h": 9,
        "w": 8,
        "x": 8,
        "y": 12
      },    
    }),
    panelTemplate({
      "targets": [
        {
          "refCount": 0,
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.Database.*.*.p95, 6, 7)`,
          "textEditor": false
        }
      ],
      "title": "Parcel DB: Response Time (P95)",
      "gridPos": {
        "h": 9,
        "w": 8,
        "x": 16,
        "y": 12
      },    
    }),
  ])