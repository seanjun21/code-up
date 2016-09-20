import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import routes from './routes';

document.addEventListener('DOMContentLoaded', () => {
  store.dispatch({
    type: 'server/getQuestions',
    data: {}
  });
    ReactDOM.render(
        <Provider store={store}>
          {routes}
        </Provider>,
        document.getElementById('app'));
});
