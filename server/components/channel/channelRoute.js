const router = require('express').Router()
const Channel = require('./channelController')
/**
 * @Route /channel
 */
router.route('/')
  .get(Channel.getAllChannels)

module.exports = router
