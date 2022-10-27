import {
  PERSONALCARDDATA,
  PERSONALCARDDATACOMPLETE,
  USERDATA,
  BUSINESSCARDDATA,
  BUSINESSCARDDATACOMPLTE,
  USERCREDENTIAL,
} from './ActionType';

export const PCData = data => {
  return {
    type: PERSONALCARDDATA,
    payload: data,
  };
};

export const PCDComplete = data => {
  return {
    type: PERSONALCARDDATACOMPLETE,
    payload: data,
  };
};

export const BCData = data => {
  return {
    type: BUSINESSCARDDATA,
    payload: data,
  };
};

export const BCDComplete = data => {
  return {
    type: BUSINESSCARDDATACOMPLTE,
    payload: data,
  };
};

export const UserData = data => {
  return {
    type: USERDATA,
    payload: data,
  };
};
export const UserCredential = data => {
  debugger;
  return {
    type: USERCREDENTIAL,
    payload: data,
  };
};
