import {
  PERSONALCARDDATA,
  PERSONALCARDDATACOMPLETE,
  USERDATA,
  BUSINESSCARDDATA,
  BUSINESSCARDDATACOMPLTE,
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
  debugger;
  return {
    type: USERDATA,
    payload: data,
  };
};
