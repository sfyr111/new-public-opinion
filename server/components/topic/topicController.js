const { TopicModel } = require('./topicModel')

const getTopicByXName = async function (req, res) {
  if (!req.query.xname) throw new Error('❌xname is empty!!❌')
  const { xname, limitSize = 2 } = req.query

  const reg = new RegExp(xname, 'i')

  const total = await TopicModel.count({ xname: reg, img: { $exists: true } })

  const skip = Math.round(Math.random() * total)
  const flow = TopicModel.find({ xname: reg, img: { $exists: true } })
  flow.skip(skip)
  flow.limit(8 * limitSize)
  const topicList = await flow

  res.json({
    code: 0,
    data: {
      xname,
      list: topicList,
    },
  })
}

module.exports = {
  getTopicByXName,
}
