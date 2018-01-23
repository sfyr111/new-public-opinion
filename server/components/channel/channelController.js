const { ChannelModel } = require('./channelModel')

const getAllChannels = async function (req, res) {
  const channels = await ChannelModel.find({})
    .catch(e => {
      console.error('❌❌❌❌ error of getAllChannels ')
      throw new Error(e)
    })
  res.json({
    code: 0,
    data: {
      channels,
    },
  })
}

module.exports = {
  getAllChannels,
}
