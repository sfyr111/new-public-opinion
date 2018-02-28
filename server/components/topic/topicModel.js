const mongoose = require('mongoose')

const { Schema } = mongoose

const TopicSchema = new Schema({
  _class: String,
  articleId: String,
  title: String,
  content: String,
  url: String,
  author: String,
  poTime: String,
  addTime: String,
  webSiteType: Number,
  webSite: String,
  positiveOrNegative: Number,
  abroad: Number,
  spreadValue: Number,
  replay: Number,
  view: Number,
  transer: Number,
  praiseCount: Number,
  importanceDegree: Number,
  opinionValue: Number,
  sensitiveValue: Number,
  administrativeId: String,
  titlePrint: String,
  titleContentPrint: String,
  subimg: String,
  subpoTime: Number,
  subpraiseCount: Number,
  subreplay: Number,
  subtranser: Number,
  _score: Number,
  doc_count: Number,
  xname: String,
  ximg: String,
  xupdatetime: Date,
  active: Number,
  channelId: String,
  pushed: Boolean,
})

TopicSchema.index({ xname: 1 })

const TopicModel = mongoose.model('yq2_NamedOpinionBean', TopicSchema, 'yq2_NamedOpinionBean')

module.exports = {
  TopicModel,
  TopicSchema,
}
