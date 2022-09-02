import {
  PERSONALCARDDATA,
  PERSONALCARDDATACOMPLETE,
  USERDATA,
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

export const UserData = data => {
  debugger;
  return {
    type: USERDATA,
    payload: data,
  };
};
