import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import TopicList from './views/topic-list/topic-list'
import TopicDetail from './views/topic-detail/topic-detail'
import Channel from './views/channel/channel'
import Test from './views/test/test'

import './App.styl'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  componentDidCatch(err, info) {
    console.error(err, info)
    this.setState({
      hasError: true,
    })
  }

  render() {
    // const style = {
    //   position: 'fixed',
    //   width: '100%',
    //   top: 0,
    //   height: '100vh',
    //   overflow: 'auto',
    //   zIndex: '100',
    // }
    return this.state.hasError
      ? <h2>页面出错了</h2>
      : (
        <div>
          <Route path="/" render={() => <Redirect to="/index?tab=%E6%8E%A8%E8%8D%90" />} exact key="/" />
          {/* <Route path="/" render={() => <Redirect to={`/index/?tab=${decodeURIComponent('推荐')}`} />} exact key="/" /> */}
          <Route path="/index" component={TopicList} key="index" />
          <Route path="/detail/:id" component={TopicDetail} key="detail" />
          <Route path="/channel" component={Channel} key="channel" />
          <Route path="/test" component={Test} key="test" />
        </div>
      )
  }
}
export default App
