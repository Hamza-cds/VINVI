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
  let route = URL.concat('/api/BusinessCard/EditCategoryList');
  console.log(route, formdata);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
    Accept: '*/*',
  };

  return fetch(
    'https://vinvi.dsmeglobal.com//api/BusinessCard/EditCategoryList',
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

export async function getPersonalCardByIdApiCall(id) {
  let route = URL.concat(`/api/PersonalCard/GetById?id=${id}`);
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

export async function getBusinessCardByIdApiCall(id) {
  let route = URL.concat(`/api/BusinessCard/GetById?id=${id}`);
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

export async function getPersonalCardByUserIdApiCall() {
  let route = URL.concat('/api/PersonalCard/GetByUserId');
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

export async function getPersonalCardAllActiveApiCall() {
  let route = URL.concat('/api/PersonalCard/GetAllActive');
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
export async function getBusinessCardAllActiveApiCall() {
  let route = URL.concat('/api/BusinessCard/GetAllActive');
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

export async function searchIndividualApiCall() {
  let route = '/api/PersonalCard/Search';
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

export async function GetDataVideoWallApi(UploadType, page, limit) {
  let route = URL.concat(
    `/api/UserStory/GetAll?UploadType=${UploadType}&PageNumber=${page}&Limit=${limit}`,
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
