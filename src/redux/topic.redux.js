import { ListView } from 'antd-mobile'
import api from '../common/api/service'
import { getParameterByName } from '../common/js/util'
// import { Dispatch } from 'redux'

const PULL_DOWN_GET_TOPIC_LIST = 'PULL_DOWN_GET_TOPIC_LIST'
const PULL_UP_GET_TOPIC_LIST = 'PULL_UP_GET_TOPIC_LIST'
const GET_TOPIC_LIST_BY_TAB_CHANGE = 'GET_TOPIC_LIST_BY_TAB_CHANGE'
const TOGGLE_REFRESH = 'TOGGLE_REFRESH'
const TOGGLE_LOADING = 'TOGGLE_LOADING'
const SET_TOPIC_DETAIL = 'SET_TOPIC_DETAIL'
const REFRESH_BY_XNAME = 'REFRESH_BY_XNAME'
const LOADMORE_BY_XNAME = 'LOADMORE_BY_XNAME'
const CHANNGE_TAB_BY_XNAME = 'CHANNGE_TAB_BY_XNAME'
const SAVE_SCROLL_TOP = 'SAVE_SCROLL_TOP'
// const ERROR_MSG = 'ERROR_MSG'

const initState = {
  topicList: [],
  dataSource: new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  }),
  scrollTop: {},
  topicDetail: {},
  refreshing: true,
  isLoading: true,
}

// ⚠️reducer⚠️
export function topic(state = initState, action) {
  switch (action.type) {
    case PULL_DOWN_GET_TOPIC_LIST: {
      return { ...state, topicList: [...action.payload, ...state.topicList] }
    }
    case REFRESH_BY_XNAME: {
      return { ...state, [action.payload.xname]: [...action.payload.list, ...state[action.payload.xname]] }
    }
    case PULL_UP_GET_TOPIC_LIST: {
      return { ...state, topicList: [...state.topicList, ...action.payload] }
    }
    case LOADMORE_BY_XNAME: {
      return { ...state, [action.payload.xname]: [...state[action.payload.xname], ...action.payload.list] }
    }
    case GET_TOPIC_LIST_BY_TAB_CHANGE: {
      return { ...state, topicList: [...action.payload] }
    }
    case CHANNGE_TAB_BY_XNAME: {
      return { ...state, [action.payload.xname]: [...action.payload.list] }
    }
    case TOGGLE_REFRESH: {
      return { ...state, refreshing: action.payload }
    }
    case TOGGLE_LOADING: {
      return { ...state, isLoading: action.payload }
    }
    case SET_TOPIC_DETAIL: {
      return { ...state, topicDetail: action.payload }
    }
    case SAVE_SCROLL_TOP: {
      return { ...state, scrollTop: { ...state.scrollTop, ...{ [action.payload.tab]: action.payload.top } } }
    }
    default: {
      return state
    }
  }
}

// ⚠️actionType⚠️
function toggleRefresh(boolean) {
  return { type: TOGGLE_REFRESH, payload: boolean }
}

function toggleLoading(boolean) {
  return { type: TOGGLE_LOADING, payload: boolean }
}

function tabChange(list) {
  return { type: GET_TOPIC_LIST_BY_TAB_CHANGE, payload: list }
}

function refresh(list) {
  return { type: PULL_DOWN_GET_TOPIC_LIST, payload: list }
}

function loadMore(list) {
  return { type: PULL_UP_GET_TOPIC_LIST, payload: list }
}

function tabChanngeByXname(data) {
  return { type: CHANNGE_TAB_BY_XNAME, payload: data }
}

function refreshByXname(data) {
  return { type: REFRESH_BY_XNAME, payload: data }
}

function loadMoreByXname(data) {
  return { type: LOADMORE_BY_XNAME, payload: data }
}

// ⚠️action⚠️
/**
 * @param state { tab: string, pullState: down || up || undefined }
 * @returns {function(*)}
 */
export function getTopList(state) {
  const { tab, pullState } = state
  return (dispatch) => {
    // eslint-disable-next-line
    pullState === 'down' ? dispatch(toggleRefresh(false)) : dispatch(toggleLoading(false))

    api.get(`/topic/?xname=${tab}&limitSize=${pullState === 'down' ? 1 : 2}`)
      .then(res => {
        if (res.code === 0) {
          res.data.list.forEach(el => el.img = el.img.split(';'))

          pullState // eslint-disable-line
            ? dispatch({
              type: pullState === 'down'
                ? PULL_DOWN_GET_TOPIC_LIST
                : PULL_UP_GET_TOPIC_LIST,
              payload: res.data.list,
            })
            : dispatch({ type: GET_TOPIC_LIST_BY_TAB_CHANGE, payload: res.data.list })

          // eslint-disable-next-line
          pullState === 'down' ? dispatch(toggleRefresh(true)) : dispatch(toggleLoading(true))
        } else alert('获取文章列表出错')
      }).catch(e => console.error(e))
  }
}

export function getTopListWithChange(state) {
  const { tab } = state
  return (dispatch, getState) => {
    dispatch(toggleRefresh(true))
    dispatch(toggleLoading(true))
    const { userToken } = getState().user
    api.get(`/topic/?xname=${tab}&limitSize=2&userToken=${!userToken ? getParameterByName('userToken', window.location.href) : userToken}`)
      .then(res => {
        if (res.code === 0) {
          res.data.list.forEach(el => el.img = el.img.split(';'))
          dispatch(tabChange(res.data.list))
          dispatch(tabChanngeByXname(res.data))
          dispatch(toggleRefresh(false))
          dispatch(toggleLoading(false))
        }
      }).catch(e => console.error(e))
  }
}
export function getTopListWithRefresh(state) {
  const { tab } = state
  return (dispatch, getState) => {
    dispatch(toggleRefresh(true))
    dispatch(toggleLoading(true))
    const { userToken } = getState().user
    api.get(`/topic/?xname=${tab}&limitSize=1&userToken=${!userToken ? getParameterByName('userToken', window.location.href) : userToken}`)
      .then(res => {
        if (res.code === 0) {
          res.data.list.forEach(el => el.img = el.img.split(';'))
          dispatch(refresh(res.data.list))
          dispatch(refreshByXname(res.data))
          dispatch(toggleRefresh(false))
          dispatch(toggleLoading(false))
        }
      }).catch(e => console.error(e))
  }
}

export function getTopListWithLoadMore(state) {
  const { tab } = state
  return (dispatch, getState) => {
    dispatch(toggleLoading(true))
    const { userToken } = getState().user
    api.get(`/topic/?xname=${tab}&limitSize=2&userToken=${!userToken ? getParameterByName('userToken', window.location.href) : userToken}`)
      .then(res => {
        if (res.code === 0) {
          res.data.list.forEach(el => el.img = el.img.split(';'))
          dispatch(loadMore(res.data.list))
          dispatch(loadMoreByXname(res.data))
          dispatch(toggleLoading(false))
        }
      }).catch(e => console.error(e))
  }
}

export function setTopicDetail(detail) {
  for (let i = 0; i < detail.img.length; i++) {
    detail.content = detail.content.replace('<vrv-img>', `<img src="${detail.img[i]}" alt="">`)
  }
  return (dispatch) => {
    dispatch({ type: SET_TOPIC_DETAIL, payload: detail })
  }
}

/**
 *
 * @param state { tab: string, top: number }
 * @returns {function(*)}
 */
export function saveScrollTopByTab(state) {
  return (dispatch) => dispatch({ type: SAVE_SCROLL_TOP, payload: state })
}
