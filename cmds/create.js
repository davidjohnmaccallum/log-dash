exports.command = 'create'
exports.desc = 'Create a Grafana dashboard for a microservice.'
exports.builder = {}
exports.handler = main

const inquirer = require('inquirer')
const _ = require('underscore')
const fs = require('fs')

let id = 0

async function main() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        message: 'Microservice repository name',
        name: 'repoName'
      },
      {
        type: 'input',
        message: 'Dashboard description',
        name: 'description'
      },
      {
        type: 'checkbox',
        message: 'Dashboard sections to include',
        name: 'sections',
        choices: [
          {
            name: 'Upstreams',
            value: 'upstreams',            
          },
          {
            name: 'Database',
            value: 'database'
          },
          {
            name: 'Downstreams',
            value: 'downstreams'
          },
          {
            name: 'Kafka Consumer',
            value: 'kafkaConsumer'
          },
          {
            name: 'Kafka Producer',
            value: 'kafkaProducer'
          },
        ],
      },
    ])
  
    const dashboard = dashboardTemplate(answers)
    const panels = _.flatten(answers.sections.map(section => sectionTemplates[section](answers)))
    dashboard.panels = panels
  
    const outFileName = `${answers.repoName}-dashboard.json`
    fs.writeFileSync(outFileName, JSON.stringify(dashboard, null, 4))
    console.log(`Dashbaoard JSON written to ${outFileName}`)

  } catch(err) {
    console.error(err)
  }
}

const dashboardTemplate = ({repoName, description}) => ({
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

const sectionTemplates = {
  upstreams: ({repoName}) => ([
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
  ]),
  database: ({repoName}) => ([
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
  ]),
  kafkaProducer: ({repoName}) => ([
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
  ]),
  kafkaConsumer: ({repoName}) => ([
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
  ]),
  downstreams: ({repoName}) => ([
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
}

const panelTemplate = (props) => ({
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

const rowTemplate = (props) => ({
  "id": id++,
  "collapsed": false,
  "datasource": null,
  "gridPos": {
    "h": 9,
    "w": 24,
    "x": 0,
    "y": 0
  },
  "panels": [],
  "title": "Upstreams",
  "type": "row",
  ...props
})
