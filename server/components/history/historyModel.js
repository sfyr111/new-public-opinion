const mongoose = require('mongoose')

const { Schema } = mongoose

const HistorySchema = new Schema({
  topicId: { type: String, ref: 'yq2_NamedOpinionBean' },
  userToken: String,
  createTime: { type: Date, default: new Date() },
})

HistorySchema.index({ userToken: 1 })

const HistoryModel = mongoose.model('new-public-history', HistorySchema, 'new-public-history')

module.exports = {
  HistoryModel,
  HistorySchema,
}
