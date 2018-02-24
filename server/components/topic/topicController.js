const { TopicModel } = require('./topicModel')

const getTopicByXName = async function (req, res) {
  if (!req.query.xname) throw new Error('❌xname is empty!!❌')
  const { xname, limitSize = 2, userToken } = req.query
  const reg = new RegExp(xname, 'i')

  let flow
  let total = 0
  if (xname === '推荐') {
    total = await TopicModel.count({ xname: reg, channelId: userToken, img: { $exists: true } })
    flow = TopicModel.find({ xname: reg, channelId: userToken, img: { $exists: true } })
  }
  if (xname !== '推荐' || total < 250) {
    total = await TopicModel.count({ xname: reg, img: { $exists: true } })
    flow = TopicModel.find({ xname: reg, img: { $exists: true } })
  }
  const skip = Math.round(Math.random() * total)
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
