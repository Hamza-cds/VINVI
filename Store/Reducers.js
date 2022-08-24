import {PERSONALCARDDATA, PERSONALCARDDATACOMPLETE} from './ActionType';

const initialState = {
  PCData: null,
};

export const mainreducer = (state = initialState, action) => {
  switch (action.type) {
    case PERSONALCARDDATA:
      return {...state, PCData: {...state.PCData, ...action.payload}};
    case PERSONALCARDDATACOMPLETE:
      return {...state, PCData: action.payload};

    default:
      return state;
  }
};
