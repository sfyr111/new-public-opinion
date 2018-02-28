const mongoose = require('mongoose')

const { Schema } = mongoose

const ChannelSchema = new Schema({
  name: { type: String, require: true },
  sort: { type: Number, default: 999 },
})

const ChannelModel = mongoose.model('new-public-channel', ChannelSchema, 'new-public-channel')

module.exports = {
  ChannelModel,
  ChannelSchema,
}
