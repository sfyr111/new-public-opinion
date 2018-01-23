import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { topic } from './redux/topic.redux'
import { channel } from './redux/channel.redux'

export default combineReducers({ user, topic, channel })
