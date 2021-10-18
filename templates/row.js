let id = 0

module.exports = (props) => ({
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
  