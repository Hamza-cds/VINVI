import {PERSONALCARDDATA, PERSONALCARDDATACOMPLETE} from './ActionType';

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
