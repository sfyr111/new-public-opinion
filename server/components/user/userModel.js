const mongoose = require('mongoose')
const { ChannelSchema } = require('../channel/channelModel')

const { Schema } = mongoose

const defaultChannels = [
  {
    channel: '5a547f253d1481106d67d8cb',
  },
  {
    channel: '5a547f253d1481106d67d8cc',
  },
  {
    channel: '5a547f253d1481106d67d8cd',
  },
  {
    channel: '5a547f253d1481106d67d8ce',
  },
  // {
  //   channel: '5a547f253d1481106d67d8cf',
  // },
  // {
  //   channel: '5a547f253d1481106d67d8d0',
  // },
]

const UserChannelSchema = new Schema({
  channel: { type: String, ref: 'new-public-channel' },
})

const UserSchema = new Schema({
  userToken: { type: String, required: true },
  channels: { type: [UserChannelSchema], default: defaultChannels },
  historyIds: [String],
})

UserSchema.index({ userToken: 1 }, { unique: true })

const UserModel = mongoose.model('new-public-user', UserSchema, 'new-public-user')
mongoose.model('new-public-channel', ChannelSchema, 'new-public-channel')

module.exports = {
  UserModel,
  UserSchema,
}
