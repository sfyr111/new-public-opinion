const router = require('express').Router()

/**
 * @Route /
 */
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router
