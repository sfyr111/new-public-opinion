const mongoose = require('mongoose')
// const uri = 'mongodb://localhost:27017/new-public-opinion'
const uri = 'mongodb://bf:Vrv12345012345bf@61.147.125.59:30000,61.147.125.60:30000,61.147.125.61:30000/VRVWebMonitorBF'

mongoose.Promise = global.Promise

mongoose.connect(uri, { useMongoClient: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('mongo connect!')
})

module.exports = db
