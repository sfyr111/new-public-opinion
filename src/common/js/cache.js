import storage from 'good-storage'

const USER_TOKEN = '__userToken__'
const USER_ID = '__userId__'

const VISITED_LIST = '__visitedList__'
const VISITED_MAX_LEN = 200

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const insertArray = function (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

const deleteFromArray = function (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export const saveUserToken = function (userToken) {
  storage.session.set(USER_TOKEN, userToken)
  return userToken
}

export const loadUserToken = function () {
  return storage.session.get(USER_TOKEN, '')
}

export const clearUserToken = function () {
  storage.session.remove(USER_TOKEN)
  return ''
}

export const saveUserId = function (userId) {
  storage.session.set(USER_ID, userId)
  return userId
}

export const loadUserId = function () {
  return storage.session.get(USER_ID, '')
}

export const clearUserId = function () {
  storage.session.remove(USER_ID)
  return ''
}

export const saveVisited = function (visited) {
  let visitedList = storage.get(VISITED_LIST, [])
  insertArray(visitedList, visited, item => {
    return item.id === visited.id
  }, VISITED_MAX_LEN)
  storage.set(VISITED_LIST, visitedList)
  return visitedList
}

export const loadVisited = function () {
  return storage.get(VISITED_LIST, [])
}

export const clearVisited = function () {
  return storage.remove(VISITED_LIST)
}

export const loadSearch = function () {
  return storage.get(SEARCH_KEY, [])
}

export const clearSearch = function () {
  storage.remove(SEARCH_KEY)
  return []
}

export const saveSearch = function (query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export const deleteSearch = function (query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}
