import React from 'react'
import PropTypes from 'prop-types'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getAllChannels } from '../../redux/channel.redux'
import { addUserChannel, delUserChannel } from '../../redux/user.redux'
import './channel.styl'

@connect(
  state => state,
  { getAllChannels, addUserChannel, delUserChannel },
)
class Channel extends React.Component {
  componentDidMount() {
    // do something here
    this.props.getAllChannels()
  }

  render() {
    const userChannels = this.props.user.channels.map(el => el.channel)
    const systemChannels = this.props.channel.channels
    const xorChannels = _.xorBy(systemChannels, userChannels, 'name')
    return (
      <div className="channel">
        <NavBar
          mode="dark"
        >
          频道设置
        </NavBar>
        <section className="channelBlock">
          <header>点击删除以下频道</header>
          <ul className="channelList">
            {userChannels.map(el => (<li key={el._id}><a style={{ backgroundColor: el.name !== '推荐' ? '' : '#f0f0f0' }} role="presentation" onClick={() => this.props.delUserChannel({ channelId: el._id })} onKeyPress={() => {}} >{el.name}</a></li>))}
          </ul>
        </section>
        <section className="channelBlock">
          <header>点击添加以下频道</header>
          <ul className="channelList">
            {systemChannels.length === 0 ? null : xorChannels.map(el => (<li key={el._id}><a role="presentation" onClick={() => this.props.addUserChannel({ channelId: el._id })} onKeyPress={() => {}}>{el.name}</a></li>))}
          </ul>
        </section>
      </div>
    )
  }
}

Channel.propTypes = {
  user: PropTypes.any,
  channel: PropTypes.any,
  getAllChannels: PropTypes.func,
  delUserChannel: PropTypes.func,
  addUserChannel: PropTypes.func,
}

Channel.defaultProps = {
  user: '',
  channel: '',
  getAllChannels: () => {},
  addUserChannel: () => {},
  delUserChannel: () => {},
}

export default Channel
