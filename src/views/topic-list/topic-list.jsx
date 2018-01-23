import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon, Tabs, ListView, PullToRefresh } from 'antd-mobile'

import './topic-list.styl'
import Row from '../../component/row/row'
import NewIcon from '../../component/icon/icon'
import { getUserInfo } from '../../redux/user.redux'
import { getTopListWithRefresh, getTopListWithLoadMore, getTopListWithChange, setTopicDetail, saveScrollTopByTab } from '../../redux/topic.redux'
import { getParameterByName } from '../../common/js/util'

@withRouter
@connect(
  state => state,
  { getUserInfo, getTopListWithRefresh, getTopListWithLoadMore, getTopListWithChange, setTopicDetail, saveScrollTopByTab },
)
class TopicList extends React.Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      dataSource,
    }
    this.changeTab = this.changeTab.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.scrollList = this.scrollList.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
    this.fetchTopicList = this.fetchTopicList.bind(this)
    this.handlerRowClick = this.handlerRowClick.bind(this)
    this.handlerListScroll = this.handlerListScroll.bind(this)
    this.handleGetUserInfo = this.handleGetUserInfo.bind(this)
    this.handleNavBarLeftClick = this.handleNavBarLeftClick.bind(this)
  }

  componentWillMount() {
    this.handleGetUserInfo()
  }

  componentDidMount() {
    this.fetchTopicList(this.props.location)
  }

  componentWillReceiveProps(nextProps) {
    const { tab = '推荐' } = queryString.parse(this.props.location.search)
    if ((nextProps.location.search !== this.props.location.search)) {
      const { tab: nextTab } = queryString.parse(nextProps.location.search)
      if (!this.props.topic[nextTab]) this.fetchTopicList(nextProps.location)
      else this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps.topic[nextTab]) })
    }
    if (nextProps.topic[tab] !== this.props.topic[tab]) this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps.topic[tab]) })
  }

  onRefresh() {
    const { location } = this.props
    let query
    if (location) query = location.search ? queryString.parse(location.search) : { tab: '推荐' }
    this.props.getTopListWithRefresh(query)
  }

  onEndReached() {
    if (this.props.topic.isLoading) return

    const { location } = this.props
    let query
    if (location) query = location.search ? queryString.parse(location.search) : { tab: '推荐' }
    this.props.getTopListWithLoadMore(query)
  }

  handleNavBarLeftClick() {
    this.props.history.push({
      pathname: '/channel',
    })
  }

  handleGetUserInfo() {
    // this.props.getUserInfo({ userToken: getParameterByName('userToken', 'http://localhost:8888/#/index?userToken=000') })
    if (!this.props.user.userToken) this.props.getUserInfo({ userToken: getParameterByName('userToken', window.location.href) })
  }

  async fetchTopicList(location) {
    let query
    if (location) query = queryString.parse(location.search).tab ? queryString.parse(location.search) : { tab: '推荐' }
    const { tab } = query
    if (!this.props.topic[tab]) this.props.getTopListWithChange(query)
    else {
      this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.props.topic[tab]) })
      this.scrollList(tab)
    }
  }

  changeTab(tabData) {
    this.props.history.replace({
      pathname: '/index',
      search: `?tab=${tabData.decode}`,
    })
    this.scrollList(tabData.title)
  }

  scrollList(tab) {
    if (!this.lv) return
    const top = this.props.topic.scrollTop[tab]
    const hasTab = this.props.user.channels.find(el => el.channel.name === tab)
    if (!hasTab) this.props.history.replace({ pathname: '/index?tab=%E6%8E%A8%E8%8D%90' })
    if (!top || !hasTab) this.lv.scrollTo(0, 0)
    else setTimeout(() => this.lv.scrollTo(0, top), 100)
  }

  handlerListScroll(e) {
    const { tab } = queryString.parse(this.props.location.search)
    const top = e.target.scrollTop
    this.props.saveScrollTopByTab({ tab, top })
  }

  handlerRowClick(rowData) {
    this.props.setTopicDetail(rowData)
    this.props.history.push({
      pathname: `/detail/${rowData._id}`,
    })
  }

  _renderRow = (rowData) => <Row rowData={rowData} handlerClick={this.handlerRowClick} key={rowData._id} />

  render() {
    const tabs = this.props.user.channels.map((item) => ({
      title: item.channel.name,
      decode: encodeURIComponent(item.channel.name),
    }))
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: '1px',
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    )

    return (
      <div>
        <section
          className="header"
          style={{ position: 'fixed', width: '100%', top: 0 }}
        >
          <NavBar
            mode="dark"
            icon={<NewIcon type="setting" color="red" />}
            onLeftClick={this.handleNavBarLeftClick}
            rightContent={[
              <Icon key="0" type="search" style={{ marginRight: '0.426666667rem' }} />,
            ]}
          >
            舆情推荐
          </NavBar>
          {tabs.length !== 0 ?
            <Tabs
              tabs={tabs}
              onChange={this.changeTab}
              page={tabs.findIndex(el => el.title === queryString.parse(this.props.location.search).tab)}
            /> : null}
        </section>
        <ListView
          // className="needsclick"
          onScroll={this.handlerListScroll}
          scrollEventThrottle={50}
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (
            <div style={{ padding: '0.8rem', textAlign: 'center' }}>
              {this.props.topic.isLoading ? 'Loading...' : 'Loaded'}
            </div>
          )}
          renderRow={this._renderRow}
          renderSeparator={separator}
          style={{
            height: 'calc(100vh - 2.36rem)',
            margin: '0.13333rem 0',
            position: 'fixed',
            top: '2.36rem',
            width: '100%',
          }}
          pullToRefresh={<PullToRefresh
            refreshing={this.props.topic.refreshing}
            onRefresh={this.onRefresh}
          />}
          onEndReached={this.onEndReached}
          pageSize={1000}
          initialListSize={1000}
        />
      </div>
    )
  }
}

TopicList.propTypes = {
  getUserInfo: PropTypes.func,
  // getTopList: PropTypes.func,
  getTopListWithRefresh: PropTypes.func,
  getTopListWithLoadMore: PropTypes.func,
  getTopListWithChange: PropTypes.func,
  setTopicDetail: PropTypes.func,
  saveScrollTopByTab: PropTypes.func, // eslint-disable-line
  user: PropTypes.any,
  topic: PropTypes.object,
  dataSource: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

TopicList.defaultProps = {
  getUserInfo: () => {},
  // getTopList: () => {},
  getTopListWithRefresh: () => {},
  getTopListWithLoadMore: () => {},
  getTopListWithChange: () => {},
  setTopicDetail: () => {},
  saveScrollTopByTab: () => {},
  user: {},
  topic: {},
  dataSource: {},
}

export default TopicList
