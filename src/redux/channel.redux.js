import api from '../common/api/service'

const GET_ALL_CHANNELS = 'GET_ALL_CHANNELS'

const initState = {
  channels: [],
}

// ⚠️reducer⚠️
export function channel(state = initState, action) {
  switch (action.type) {
    case GET_ALL_CHANNELS: {
      return { ...state, channels: [...action.payload] }
    }
    default: {
      return state
    }
  }
}

// ⚠️actionType⚠️
function getAllChannelsType(channels) {
  return { type: GET_ALL_CHANNELS, payload: channels }
}

// // ⚠️action⚠️
// /**
//  * @param state
//  * @returns {function(*)}
//  */
export function getAllChannels() {
  return (dispatch) => {
    api.get('/channel')
      .then(res => {
        if (res.code === 0) dispatch(getAllChannelsType(res.data.channels))
        else alert('获取所有频道出错')
      })
  }
}
