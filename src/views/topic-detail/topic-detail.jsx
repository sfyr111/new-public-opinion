import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavBar, WhiteSpace, WingBlank } from 'antd-mobile'
import dateFormat from '../../common/js/tools/date/format'
import './topic-detail.styl'


@connect(
  state => state,
  {},
)
class TopicDetail extends React.Component {
  componentDidMount() {
    // do something here
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
}

TopicDetail.defaultProps = {
  topic: '',
}

export default TopicDetail
