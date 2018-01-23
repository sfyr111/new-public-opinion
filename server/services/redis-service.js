const Redis = require('ioredis')

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
})

// const redis = new Redis.Cluster([
//   { port: 7000, host: '61.147.124.83' },
//   { port: 7001, host: '61.147.124.67' },
//   { port: 7002, host: '61.147.124.73' },
//   { port: 7003, host: '61.147.124.74' },
//   { port: 7004, host: '61.147.124.76' },
// ])

module.exports = redis
