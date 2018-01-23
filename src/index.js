import React from 'react';
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { HashRouter } from 'react-router-dom'

import App from './App'

import reducers from './reducer'
import './common/js/flexible'
import './index.styl'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f,
))

const root = document.getElementById('root')
root.style.position = 'relative'
root.style.height = '100%'
// root.style.display = 'flex'
// root.style.flexDirection = 'column'

ReactDOM.render(
  (
    <Provider store={store}>
      <HashRouter hashType="noslash">
        <App />
      </HashRouter>
    </Provider>
  ),
  root,
)
