import {
  PERSONALCARDDATA,
  PERSONALCARDSCREEN2DATA,
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

export const PCScreen2Data = data => {
  return {
    type: PERSONALCARDSCREEN2DATA,
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
  return {
    type: USERCREDENTIAL,
    payload: data,
  };
};
