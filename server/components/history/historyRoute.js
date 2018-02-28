const router = require('express').Router()
const History = require('./historyController')

/**
 * @Route /history
 */
router.route('/')
  .put(History.addHistory)

router.route('/:userToken')
  .get(History.getHistoryTopicListByUserToken)

module.exports = router
