import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import actions from './redux/actions';
import store from './redux/store';
import routes from './routes';

document.addEventListener('DOMContentLoaded', () => {
  //dispatch action onLoad to set initial state for userName
  store.dispatch(actions.onLoad());
    ReactDOM.render(
        <Provider store={store}>
          {routes}
        </Provider>,
        document.getElementById('app'));
});
