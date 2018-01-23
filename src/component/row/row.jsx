import React from 'react'
import color from 'randomcolor'
import PropTypes from 'prop-types'
import dateFormat from '../../common/js/tools/date/format'
import './row.styl'

const onImgError = (e) => {
  const imgColor = color().slice(1)
  e.target.src = `http://dn-placeholder.qbox.me/110x110/${imgColor}/${imgColor}`
}

const Row = (props) => {
  const { rowData, handlerClick } = props

  return (
    <div
      className="row"
    >
      <section
        onClick={() => handlerClick(rowData)}
        onKeyPress={() => {}}
        role="presentation"
      >
        {rowData.img.length >= 3 ?
          <a className="row__cell--multi-img">
            <h3>{rowData.title}</h3>
            <ul className="img-list">
              {rowData.img.slice(0, 3).map((el, idx) => (<li key={el}><img src={rowData.img[idx]} onError={onImgError} alt="m" /></li>))}
            </ul>
          </a> :
          <a className="row__cell--signle-img">
            <h3>{rowData.title}</h3>
            <div className="img-block">
              <img src={rowData.img[0]} onError={onImgError} alt="s" />
            </div>
          </a>}
        <p
          className="row__info"
          style={{ marginTop: rowData.img.length !== 1 ? '0' : '-12px' }}
        >
          <span>{rowData.webSite}</span>
          <span>{dateFormat(new Date(rowData.xupdatetime), 'YYYY-MM-DD')}</span>
        </p>
      </section>
    </div>
  )
}

Row.propTypes = {
  rowData: PropTypes.object.isRequired,
  handlerClick: PropTypes.func,
}

Row.defaultProps = {
  handlerClick: () => {},
}

export default Row
