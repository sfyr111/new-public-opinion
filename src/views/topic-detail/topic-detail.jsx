import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavBar, WhiteSpace, WingBlank } from 'antd-mobile'
import dateFormat from '../../common/js/tools/date/format'
import api from '../../common/api/service'
import './topic-detail.styl'


@connect(
  state => state,
  {},
)
class TopicDetail extends React.Component {
  componentDidMount() {
    // do something here
    console.log(this.props.match.params.id)
    api.put('/history', { userToken: this.props.user.userToken, topicId: this.props.topic.topicDetail._id })
  }

  render() {
    const { topicDetail } = this.props.topic

    return (
      <div>
        <NavBar
          mode="dark"
        >
          文章详情
        </NavBar>
        <WhiteSpace />
        <WingBlank>
          <article className="article">
            <div className="article__header">
              <h1 className="article__title">{topicDetail.title}</h1>
              <WhiteSpace />
              <div className="article__source">
                <span>{topicDetail.webSite}</span>
                <span>{dateFormat(new Date(topicDetail.xupdatetime), 'YYYY-MM-DD')}</span>
              </div>
            </div>
            <WhiteSpace />
            <div className="article__content" dangerouslySetInnerHTML={{ __html: topicDetail.content }} />
          </article>
        </WingBlank>
      </div>
    )
  }
}

TopicDetail.propTypes = {
  topic: PropTypes.any,
  user: PropTypes.any,
  match: PropTypes.any,
}

TopicDetail.defaultProps = {
  topic: '',
  user: '',
  match: '',
}

export default TopicDetail
