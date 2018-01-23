import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import '../../common/icon/iconfont.css'

const Icon = ({ type, color }) => {
  const classNames = classnames({
    [`icon-${type}`]: true,
  })
  return (
    <span className={`icon anticon ${classNames}`} color={color} />
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string,
}

Icon.defaultProps = {
  color: '#fff',
}

export default Icon
