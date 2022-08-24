import {createStore} from 'redux';
import {mainreducer} from './Reducers';

export const store = createStore(mainreducer);
