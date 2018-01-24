import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import '../../common/icon/iconfont.css'

const Icon = ({ type, color, style, onClick }) => {
  const classNames = classnames({
    [`icon-${type}`]: true,
  })
  return (
    <span onClick={onClick} className={`icon anticon ${classNames}`} color={color} style={style} />
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
}

Icon.defaultProps = {
  color: '#fff',
  style: {},
  onClick: () => {},
}

export default Icon
