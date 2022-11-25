import {
  PERSONALCARDDATA,
  PERSONALCARDDATACOMPLETE,
  BUSINESSCARDDATA,
  BUSINESSCARDDATACOMPLTE,
  USERDATA,
  USERCREDENTIAL,
  PERSONALCARDSCREEN2DATA,
  CREATECONNECTIONSIGNALR,
  NEWMESSAGEACTION,
} from './ActionType';

const initialState = {
  PCData: null,
  BCData: null,
  UserData: null,
  USERCREDENTIAL: null,
  PCScreen2Data: null,
  connection: null,
  newMessageAction: null,
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
    case USERCREDENTIAL:
      return {...state, UserCredential: action.payload};
    case PERSONALCARDSCREEN2DATA:
      return {...state, PCScreen2Data: action.payload};
    case CREATECONNECTIONSIGNALR:
      return {...state, connection: action.payload};
    case NEWMESSAGEACTION:
      return {...state, newMessageAction: action.payload};
    default:
      return state;
  }
};
