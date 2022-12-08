import React from 'react-native';
import {URL} from '../Constants/Constants';
import axios from 'axios';

export async function signUpApiCall(signUpRequest) {
  let route = URL.concat('/api/User/Register');
  console.log(`RegisterCustomer Request : ${route} REQUEST`, signUpRequest);
  let apiRes = null;

  return fetch(route, {
    method: 'POST',
    body: signUpRequest,
    headers: {'Content-Type': 'multipart/form-data', Accept: '*/*'},
  });
  // try {
  //   apiRes = await axios({
  //     method: 'POST',
  //     url: route,
  //     data: signUpRequest,
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       Accept: 'text/plain',
  //     },
  //   });
  // } catch (err) {
  //   apiRes = err;
  //   return apiRes;
  // } finally {
  //   return apiRes;
  // }
}

export async function verifyUserApiCall(verifyUserRequest) {
  let route = URL.concat('/api/User/VerifyUser');
  console.log(`VerifyUser Request : ${route} REQUEST`, verifyUserRequest);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'POST',
      url: route,
      data: verifyUserRequest,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function loginApiCall(loginRequest) {
  let route = URL.concat('/api/User/Login');
  console.log(`Login Request : ${route} REQUEST`, loginRequest);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'POST',
      url: route,
      data: loginRequest,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function personalCardApiCall(formdata) {
  let route = URL.concat('api/PersonalCard/Post');
  console.log(route, formdata);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  return fetch(
    'https://vinvi.dsmeglobal.com/api/PersonalCard/Post',
    requestOptions,
  );

  // return await fetch('https://vinvi.dsmeglobal.com/api/PersonalCard/Post', {
  //   method: 'POST',
  //   body: formdata,
  //   headers: {
  //     // 'Content-Type': 'multipart/form-data',
  //     // Accept: 'application/json',
  //     redirect: 'follow',
  //   },
  // });
}

export async function businessCardApiCall(formdata) {
  let route = URL.concat('/api/BusinessCard/Post');
  console.log(route, formdata);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
    Accept: '*/*',
  };

  return fetch(
    'https://vinvi.dsmeglobal.com/api/BusinessCard/Post',
    requestOptions,
  );
}

export async function editBusinessCardApiCall(formdata) {
  let route = URL.concat('api/BusinessCard/EditCategoryList');
  console.log(route, formdata);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
    // Accept: '*/*',
  };

  return fetch(
    'https://vinvi.dsmeglobal.com/api/BusinessCard/EditCategoryList',
    requestOptions,
  );
}

export async function storyPostApiCall(formdata) {
  let route = URL.concat('/api/UserStory/Post');
  console.log(route, formdata);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
    Accept: '*/*',
  };

  return fetch(
    'https://vinvi.dsmeglobal.com/api/UserStory/Post',
    requestOptions,
  );
}

export async function getPersonalCardByIdApiCall(id, userID) {
  let route = URL.concat(`/api/PersonalCard/GetById?id=${id}&userId=${userID}`);
  console.log('getPersonalCardById Request : ', route);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: route,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function getActivePersonalCardByUserIdApiCall(id) {
  let route = URL.concat(`/api/PersonalCard/GetActiveCardByUserId?id=${id}`);
  console.log('getPersonalCardById Request : ', route);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: route,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function getBusinessCardByIdApiCall(id, userID) {
  let route = URL.concat(`/api/BusinessCard/GetById?id=${id}&userId=${userID}`);
  console.log('getBusinessCardById Request : ', route);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: route,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function getMyPersonalCardByUserIdApiCall(id) {
  let route = URL.concat(`/api/PersonalCard/GetByUserId?id=${id}`);
  console.log('getPersonalCardByUserId Request : ', route);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: route,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function getPersonalCardByUserIdApiCall(id) {
  let route = URL.concat(`/api/PersonalCard/GetActiveCardByUserId?id=${id}`);
  console.log('getPersonalCardByUserId Request : ', route);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: route,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function getPersonalCardAllActiveApiCall(limit, page, userID) {
  let route = URL.concat(
    `/api/PersonalCard/GetAllActive?limit=${limit}&page=${page}&userId=${userID}`,
  );
  console.log('getPersonalCardById Request : ', route);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: route,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function getBusinessCardAllActiveApiCall(limit, page) {
  let route = URL.concat(
    `/api/BusinessCard/GetAllActive?limit=${limit}&page=${page}`,
  );
  console.log('getBusinessCardAllActive Request : ', route);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: route,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function getBusinessCardByUserIDApiCall(id) {
  let route = URL.concat(`/api/BusinessCard/GetByUserId?id=${id}`);
  console.log('getBusinessCardAllActive Request : ', route);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: route,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function searchIndividualApiCall(Limit, Page, search) {
  let route = `/api/PersonalCard/Search?limit=${Limit}&page=${Page}&name=${search}`;
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: URL + route,
    });
    console.log('searchIndividualApiCall Request : ', apiRes);
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}
export async function searchBusinessApiCall(Limit, Page, search) {
  let route = `/api/BusinessCard/Search?limit=${Limit}&page=${Page}&name=${search}`;
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: URL + route,
    });
    console.log('searchBusinessApiCall Request : ', apiRes);
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}
export async function LookupDetailApiCall(id) {
  let route = `/api/LookupDetail/GetByLookupId?id=${id}`;
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: URL + route,
    });
    console.log('LookupDetailApiCall Request : ', apiRes);
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function GetAllLookupDetailApiCall() {
  let route = `/api/LookupDetail/GetAll`;
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: URL + route,
    });
    console.log('GetAllLookupDetailApiCall Request : ', apiRes);
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function PersonalCardEditApiCall(obj) {
  let route = URL.concat('/api/PersonalCard/PersonalCardMetaPost');
  console.log(`personal card Edit Request : ${route} REQUEST`, obj);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'POST',
      url: route,
      data: obj,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function BusinessDeleteProductApiCall(obj) {
  let route = URL.concat(`api/BusinessCard/DeleteCategoryProduct`);
  console.log(`businessCardProduct delete Request : ${route} REQUEST`, obj);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'POST',
      url: route,
      data: obj,
      headers: {
        'Content-Type ': 'application/json-patch+json',
        accept: 'text/plain',
      },
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function saveCardAPiCall(obj) {
  let route = URL.concat(`/api/SavedCard/AddOrEdit`);
  console.log(`save card Request : ${route} REQUEST`, obj);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'POST',
      url: route,
      data: obj,
      headers: {
        'Content-Type ': 'application/json-patch+json',
        accept: 'text/plain',
      },
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function BusinessDeleteCategoryApiCall(obj) {
  let route = URL.concat('/api/BusinessCard/DeleteCategory');
  console.log(`delete category Request : ${route} REQUEST`, obj);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'POST',
      url: route,
      data: obj,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function BusinessCategoryAddEditApiCall(obj) {
  let route = URL.concat('/api/BusinessCard/CategoryPost');
  console.log(`Add and Edit category Request : ${route} REQUEST`, obj);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'POST',
      url: route,
      data: obj,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function DashboardStoriesApiCall(obj) {
  let route = URL.concat('/api/UserStory/GetByUserId');
  console.log(`dashboard Stories Request : ${route} REQUEST :`, obj);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: route,
      data: obj,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function GetSavedCardByIdApiCall(id, type) {
  let route = URL.concat(
    `/api/SavedCard/GetByUserId?userId=${id}&type=${type}`,
  );
  console.log('getBusinessCardAllActive Request  : ', route);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: route,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function ChangePasswordApiCall(obj) {
  let route = URL.concat('/api/User/ChangePassword');
  console.log(`change password Request : ${route} REQUEST`, obj);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'POST',
      url: route,
      data: obj,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function GenerateCodeApiCall(obj) {
  let route = URL.concat('/api/User/ForgotPassword');
  console.log(`generate code Request : ${route} REQUEST`, obj);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'POST',
      url: route,
      data: obj,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function GetDataVideoWallApi(page, limit) {
  let route = URL.concat(
    `/api/UserStory/GetVideoWall?PageNumber=${page}&Limit=${limit}`,
  );
  console.log('getVideoWall Data Request  : ', route);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: route,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function setOneActiveCard(cardID, userID) {
  let route = URL.concat(
    `/api/PersonalCard/SetCardStatusById?card_id=${cardID}&user_id=${userID}`,
  );
  console.log('getVideoWall Data Request  : ', route);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: route,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function OpenandCloseCardApiCall(obj) {
  let route = URL.concat('/api/PersonalCard/UpdateCloseStatus');
  console.log(`open and close card Request : ${route} REQUEST`, obj);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'POST',
      url: route,
      data: obj,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function deleteSavedCardApiCall(obj) {
  let route = URL.concat('/api/SavedCard/PostDelete');
  console.log(`unsave card Request : ${route} REQUEST`, obj);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'POST',
      url: route,
      data: obj,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function connectionRequestApiCall(obj) {
  let route = URL.concat('/api/UserConnection/AddOrEdit');
  console.log(`connection Request : ${route} REQUEST`, obj);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'POST',
      url: route,
      data: obj,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}

export async function getAllConnectionRequest(userID, status) {
  let route = URL.concat(
    `/api/UserConnection/GetByUserIdAndStatus?userId=${userID}&status=${status}`,
  );
  console.log('getBusinessCardAllActive Request  : ', route);
  let apiRes = null;
  try {
    apiRes = await axios({
      method: 'GET',
      url: route,
    });
  } catch (err) {
    apiRes = err;
    return apiRes;
  } finally {
    return apiRes;
  }
}
