const mongoose = require('mongoose')
const { UserSchema } = require('./userModel')
const UserModel = mongoose.model('new-public-user', UserSchema, 'new-public-user')

// const getUsers = async function() {
//
// }
//
// const getUserById = async function() {
//
// }
//
const getUserByUserToken = async function (req, res) {
  const user = await UserModel.findOne({ userToken: req.params.userToken }).populate({
    path: 'channels.channel',
  })
    .catch(e => {
      console.error('❌❌❌❌ error of getUserByUserToken ')
      throw new Error(e)
    })
  res.json({
    code: 0,
    data: {
      user,
    },
  })
}

const loginUserByUserToken = async function (req, res) {
  try {
    let user = await UserModel.findOne({ userToken: req.params.userToken }).populate({
      path: 'channels.channel',
    })
    if (!user) {
      await UserModel.create({ userToken: req.params.userToken })
      user = await UserModel.findOne({ userToken: req.params.userToken }).populate({
        path: 'channels.channel',
      })
    }
    req.session.user = user
    console.log(req.session)
    res.json({
      code: 0,
      data: {
        user,
      },
    })
  } catch (e) {
    console.error('❌❌❌❌ error of loginUserByUserToken ')
    throw new Error(e)
  }

}

const addChannel = async function (req, res) {
  let user
  user = await UserModel.findOne({ userToken: req.params.userToken }).populate({
    path: 'channels.channel',
  })
    .catch(e => {
      console.error('❌❌❌❌ error of addChannel')
      throw new Error(e)
    })
  const channel = user.channels.find(el => el.channel._id.toString() === req.params.channelId)
  if (!channel) {
    user = await UserModel.findOneAndUpdate({ userToken: req.params.userToken }, { $push: { channels: { channel: req.params.channelId } } }, { new: true }).populate({
      path: 'channels.channel',
    })
      .catch(e => {
        console.error('❌❌❌❌ error of addChannel')
        throw new Error(e)
      })
  }

  req.session.user = user
  console.log(req.session)
  res.json({
    code: 0,
    data: {
      user,
    },
  })
}

const delChannel = async function (req, res) {
  const user = await UserModel.findOneAndUpdate({ userToken: req.params.userToken }, { $pull: { channels: { channel: req.params.channelId } } }, { new: true }).populate({
    path: 'channels.channel',
  })
    .catch(e => {
      console.error('❌❌❌❌ error of delChannel')
      throw new Error(e)
    })
  req.session.user = user
  console.log(req.session)
  res.json({
    code: 0,
    data: {
      user,
    },
  })
}

module.exports = {
  addChannel,
  delChannel,
  getUserByUserToken,
  loginUserByUserToken,
}
