exports.command = 'create'
exports.desc = 'Create a Grafana dashboard for a microservice.'
exports.builder = {}
exports.handler = main

const inquirer = require('inquirer')
const _ = require('underscore')
const fs = require('fs')
const dashboardTemplate = require('../templates/dashboard')
const sectionTemplates = {
  upstreams: require('../templates/upstreams'),
  database: require('../templates/database'),
  kafkaProducer: require('../templates/kafka-producer'),
  kafkaConsumer: require('../templates/kafka-consumer'),
  downstreams: require('../templates/downstreams')
}

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
    console.log(`Instructions:`)
    console.log(`  1. Open up Grafana (https://grafanalot.pre-prod.stagealot.com, https://grafanalot.takealot.com/)`)
    console.log(`  2. Open any dashboard`)
    console.log(`  3. Open the dashboard settings`)
    console.log(`  4. Open JSON Model`)
    console.log(`  5. Paste in the contents of ${outFileName}`)
    console.log(`  6. Press Save changes. This might seem a bit weird but this actually creates a new dashboard. It will not affect the dashboard whose settings you are on.`)
    console.log(`  7. Open your new dashboard here https://grafanalot.pre-prod.stagealot.com/d/${answers.repoName}/${answers.repoName} or https://grafanalot.takealot.com/d/${answers.repoName}/${answers.repoName}`)

  } catch(err) {
    console.error(err)
  }
}
