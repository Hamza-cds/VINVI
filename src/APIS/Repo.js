import React from 'react-native';
import { URL } from '../Constants/Constants';
import axios from 'axios'

export async function signUpApiCall(signUpRequest) {

    let route = URL.concat("/api/User/Register");
    console.log(`RegisterCustomer Request : ${route} REQUEST`, signUpRequest)
    let apiRes = null;
    try {
        apiRes = await axios({
            method: 'POST',
            url: route,
            data: signUpRequest
        });
    } catch (err) {
        apiRes = err;
        return apiRes;
    } finally {
        return apiRes;
    }
}

export async function verifyUserApiCall(verifyUserRequest) {

    let route = URL.concat("/api/User/VerifyUser");
    console.log(`VerifyUser Request : ${route} REQUEST`, verifyUserRequest)
    let apiRes = null;
    try {
        apiRes = await axios({
            method: 'POST',
            url: route,
            data: verifyUserRequest
        });
    } catch (err) {
        apiRes = err;
        return apiRes;
    } finally {
        return apiRes;
    }
}

export async function loginApiCall(loginRequest) {

    let route = URL.concat("/api/User/Login");
    console.log(`Login Request : ${route} REQUEST`, loginRequest)
    let apiRes = null;
    try {
        apiRes = await axios({
            method: 'POST',
            url: route,
            data: loginRequest
        });
    } catch (err) {
        apiRes = err;
        return apiRes;
    } finally {
        return apiRes;
    }
}

export async function businessInfoApiCall(businessInfoRequest) {

    let route = URL.concat("/api/BusinessCard/Post");
    console.log(`ResetPassword Request : ${route} REQUEST`, businessInfoRequest)
    let apiRes = null;
    try {
        apiRes = await axios({
            method: 'POST',
            url: route,
            data: businessInfoRequest
        });
    } catch (err) {
        apiRes = err;
        return apiRes;
    } finally {
        return apiRes;
    }
}
