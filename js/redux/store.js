import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = io('');
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

export default store;
