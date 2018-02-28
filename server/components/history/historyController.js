const { HistoryModel } = require('./historyModel')

const addHistory = async function (req, res) {
  const { topicId, userToken } = req.body
  await HistoryModel.create({ topicId, userToken })
  res.json({ code: 0 })
}

const getHistoryTopicListByUserToken = async function (req, res) {
  const { userToken } = req.params
  const historyList = await HistoryModel.find({ userToken }).populate('topicId')

  res.json({
    code: 0,
    historyList,
  })
}

module.exports = {
  addHistory,
  getHistoryTopicListByUserToken
}
