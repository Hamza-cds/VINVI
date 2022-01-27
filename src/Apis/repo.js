import { URL } from "../Constants/Constants";
import axios from 'axios';


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

export async function signUpApiCall(signUpRequest) {

    let route = URL.concat("/api/User/Register");
    console.log(`SignUp Request : ${route} REQUEST`, signUpRequest)
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

    let route = URL.concat("api/User/VerifyUser");
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

export async function forgotPasswordApiCall(forgotPasswordRequest) {

    let route = URL.concat("api/User/ForgotPassword");
    console.log(`forgotPassword Request : ${route} REQUEST`, forgotPasswordRequest)
    let apiRes = null;
    try {
        apiRes = await axios({
            method: 'POST',
            url: route,
            data: forgotPasswordRequest
        });
    } catch (err) {
        apiRes = err;
        return apiRes;
    } finally {
        return apiRes;
    }
}

export async function changePasswordApiCall(changePasswordRequest) {

    let route = URL.concat("api/User/ForgotPassword");
    console.log(`ChangePassword Request : ${route} REQUEST`, changePasswordRequest)
    let apiRes = null;
    try {
        apiRes = await axios({
            method: 'POST',
            url: route,
            data: changePasswordRequest
        });
    } catch (err) {
        apiRes = err;
        return apiRes;
    } finally {
        return apiRes;
    }
}

export async function personalCardApiCall(personalcardRequest) {

    let route = URL.concat("/api/PersonalCard/Post");
    console.log(`Personal card Info Request : ${route} REQUEST`, personalcardRequest)
    let apiRes = null;
    try {
        apiRes = await axios({
            method: 'POST',
            url: route,
            data: personalcardRequest
        });
    } catch (err) {
        apiRes = err;
        return apiRes;
    } finally {
        return apiRes;
    }
}

export async function businessCardApiCall(businesscardRequest) {

    let route = URL.concat("/api/PersonalCard/Post");
    console.log(`Business card Info Request : ${route} REQUEST`, businesscardRequest)
    let apiRes = null;
    try {
        apiRes = await axios({
            method: 'POST',
            url: route,
            data: businesscardRequest
        });
    } catch (err) {
        apiRes = err;
        return apiRes;
    } finally {
        return apiRes;
    }
}


