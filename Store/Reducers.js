import {
  PERSONALCARDDATA,
  PERSONALCARDDATACOMPLETE,
  BUSINESSCARDDATA,
  BUSINESSCARDDATACOMPLTE,
  USERDATA,
} from './ActionType';

const initialState = {
  PCData: null,
  BCData: null,
  UserData: null,
};

export const mainreducer = (state = initialState, action) => {
  switch (action.type) {
    case PERSONALCARDDATA:
      return {...state, PCData: {...state.PCData, ...action.payload}};
    case PERSONALCARDDATACOMPLETE:
      return {...state, PCData: action.payload};
    case BUSINESSCARDDATA:
      return {...state, BCData: {...state.BCData, ...action.payload}};
    case BUSINESSCARDDATACOMPLTE:
      return {...state, BCData: action.payload};
    case USERDATA:
      return {...state, UserData: action.payload};

    default:
      return state;
  }
};
