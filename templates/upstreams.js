const rowTemplate = require('./row')
const panelTemplate = require('./panel')

module.exports = ({repoName}) => ([
    // Title
    rowTemplate({
      "title": "Upstreams",
      "gridPos": {
        "h": 9,
        "w": 24,
        "x": 0,
        "y": 0
      },    
    }),
    // Row 1
    panelTemplate({
      "description": "Number of times each endpoint has been hit",
      "targets": [
        {
          "refCount": 0,
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.controller.*.*.*.*.count, 8, 9)`,
          "textEditor": false
        }
      ],
      "title": "Call Count",
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 0,
        "y": 1
      },    
    }),
    panelTemplate({
      "description": "Response code for each endpoint (400s & 500s)",
      "targets": [
        {
          "refCount": 0,
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.controller.*.*.*.*.{4xx,5xx}.count, 8, 9, 10)`,
          "textEditor": false
        }
      ],
      "title": "Response Code (400s & 500s)",
      "gridPos": {
        "h": 9,
        "w": 6,
        "x": 12,
        "y": 1
      },    
    }),
    panelTemplate({
      "description": "Response code for each endpoint",
      "targets": [
        {
          "refCount": 0,
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.controller.*.*.*.*.*.count, 8, 9, 10)`,
          "textEditor": false
        }
      ],
      "title": "Response Code",
      "gridPos": {
        "h": 9,
        "w": 6,
        "x": 18,
        "y": 1
      },    
    }),
    // Row 2
    panelTemplate({
      "description": "Response Times Across All Endpoints",
      "targets": [
        {
          "refCount": 0,
          "refId": "A",
          "target": `alias(avg(application.*.*.*.${repoName}.controller.*.*.*.*.mean), 'Mean')`,
          "textEditor": false
        },
        {
          "refCount": 0,
          "refId": "B",
          "target": `alias(avg(application.*.*.*.${repoName}.controller.*.*.*.*.p95), ' P95')`,
          "textEditor": false
        },
        {
          "refCount": 0,
          "refId": "C",
          "target": `alias(avg(application.*.*.*.${repoName}.controller.*.*.*.*.p99), 'P99')`,
          "textEditor": false
        }
      ],
      "title": "Response Times",
      "gridPos": {
        "h": 9,
        "w": 6,
        "x": 0,
        "y": 10
      },    
    }),
    panelTemplate({
      "description": "Mean Response Times Across All Endpoints",
      "targets": [
        {
          "refCount": 0,
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.controller.*.*.*.*.mean, 8, 9)`,
          "textEditor": false
        }
      ],
      "title": "Mean Response Times Per Handler",
      "gridPos": {
        "h": 9,
        "w": 6,
        "x": 6,
        "y": 10
      },    
    }),
    panelTemplate({
      "description": "P95 Response Times Across All Endpoints",
      "targets": [
        {
          "refCount": 0,
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.controller.*.*.*.*.p95, 8, 9)`,
          "textEditor": false
        }
      ],
      "title": "P95 Response Times Per Handler",
      "gridPos": {
        "h": 9,
        "w": 6,
        "x": 12,
        "y": 10
      },    
    }),
    panelTemplate({
      "description": "P99 Response Times Across All Endpoints",
      "targets": [
        {
          "refCount": 0,
          "refId": "A",
          "target": `aliasByNode(application.*.*.*.${repoName}.controller.*.*.*.*.p99, 8, 9)`,
          "textEditor": false
        }
      ],
      "title": "P99 Response Times Per Handler",
      "gridPos": {
        "h": 9,
        "w": 6,
        "x": 18,
        "y": 10
      },    
    }),
  ])