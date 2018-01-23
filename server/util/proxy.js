const axios = require('./axios')
const qs = require('qs')

module.exports = function (req, res) {
  const path = req.path.replace('/api', '')
  const params = req.body
  if (req.method === 'GET') {
    axios.get(path)
      .then(resp => {
        if (resp.status === 200) res.send(resp.data)
        else res.status(resp.status).send(resp.data)
      })
  } else if (req.method === 'POST') {
    axios.post(path, qs.stringify(params))
      .then(resp => {
        if (resp.status === 200) res.send(resp.data)
        else res.status(resp.status).send(resp.data)
      })
  }
}
