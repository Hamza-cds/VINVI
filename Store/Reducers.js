import {
  PERSONALCARDDATA,
  PERSONALCARDDATACOMPLETE,
  USERDATA,
} from './ActionType';

const initialState = {
  PCData: null,
  UserData: null,
};

export const mainreducer = (state = initialState, action) => {
  switch (action.type) {
    case PERSONALCARDDATA:
      return {...state, PCData: {...state.PCData, ...action.payload}};
    case PERSONALCARDDATACOMPLETE:
      return {...state, PCData: action.payload};
    case USERDATA:
      debugger;
      return {...state, UserData: action.payload};

    default:
      return state;
  }
};
