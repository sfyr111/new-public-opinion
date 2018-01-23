const router = require('express').Router()
const User = require('./userController')

/**
 * @Route /user
 */
router.route('/')
// .get(User.getUsers)

router.route('/:id')
// .get(User.getUserById)

router.route('/userToken/:userToken')
  .get(User.getUserByUserToken)
  .post(User.loginUserByUserToken)

router.route('/userToken/:userToken/channelId/:channelId')
  .post(User.addChannel)
  .delete(User.delChannel)

module.exports = router
