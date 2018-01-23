const router = require('express').Router()
const Topic = require('./topicController')

/**
 * @Route /topic
 */
router.route('/')
/**
 * @query {String} xname
 * @query {String} limitState 1 || 2
 */
  .get(Topic.getTopicByXName)

module.exports = router
