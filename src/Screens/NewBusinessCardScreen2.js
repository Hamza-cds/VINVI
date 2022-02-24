import React, { useState, useEffect } from 'react';
import { View, ImageBackground, ScrollView, Text } from 'react-native';
import BtnComponent from '../Components/BtnComponent';
import Header from '../Components/Header';
import OutlinedInputBox from '../Components/OutlinedInputBox';
import UploadBtn from '../Components/UploadBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { G, Path } from 'react-native-svg';
import { Height, Width } from '../Constants/Constants';
import { EMPTY_BUSINESS, EMPTY_HOURLY, EMPTY_INCORPORATION, EMPTY_PRODUCT, EMPTY_SERVICES, EMPTY_WEBSITE } from '../Constants/Strings';
import { businessCardApiCall } from '../Apis/Repo';
import LinkBtn from '../Components/LinkBtn';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isNullOrEmpty } from '../Constants/TextUtils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PRIMARY, WHITE } from '../Constants/Colors';

export default function NewBusinessCardScreen1(props) {

    console.log("BusinessCardScreen1Array", props)
    const onFinish = () => {
        // props.navigation.push("NewPersonalCard2")
        // if (isNullOrEmpty(productShelving)) {
        //   alert(EMPTY_PRODUCT)
        // }
        // else if (isNullOrEmpty(servicesOffered)) {
        //   alert(EMPTY_SERVICES)
        // }
        // else if (isNullOrEmpty(hourlyWage)) {
        //   alert(EMPTY_HOURLY)
        // }
        // else if (isNullOrEmpty(businessIndustry)) {
        //   alert(EMPTY_BUSINESS)
        // }
        // else if (isNullOrEmpty(dateofIncorporation)) {
        //   alert(EMPTY_INCORPORATION)
        // }
        // else if (isNullOrEmpty(companyWebsite)) {
        //   alert(EMPTY_WEBSITE)
        // }
        // else if (isNullOrEmpty(city)) {
        //   alert(EMPTY_CITY)
        // }

        //   else {
        //     let object = {
        //       "PhoneNo": userData.phoneno,
        //       "Logo": image,
        //       "UserId": userData.id,
        //       "PersonalCardMeta": [
        //         {
        //           "PersonalKey": "Product Shelving",
        //           "PersonalValue": productShelving,
        //           "Ishidden": true

        //         },
        //         {
        //           "PersonalKey": "Services Offered",
        //           "PersonalValue": servicesOffered,
        //           "Ishidden": true

        //         },
        //         {
        //           "PersonalKey": "Hourly Wage",
        //           "PersonalValue": hourlyWage,
        //           "Ishidden": true

        //         },
        //         {
        //           "PersonalKey": "Business Industry",
        //           "PersonalValue": businessIndustry,
        //           "Ishidden": true
        //         },
        //         {
        //           "PersonalKey": "Date of Incorporation",
        //           "PersonalValue": dateofIncorporation,
        //           "Ishidden": true
        //         },
        //         {
        //           "PersonalKey": "Company Website",
        //           "PersonalValue": companyWebsite,
        //           "Ishidden": true
        //         },
        //       ],
        //     }
        //     console.log("object", object)

        //     businessCardApiCall(object)
        //       .then((response) => {
        //         console.log("response", response)
        //         if (response.data.status == 200) {
        //           props.navigation.push("Buisness")
        //         }
        //         else {
        //           alert(CREDIANTIAL_ERROR)
        //         }
        //       })
        //       .catch((err) => {
        //         console.log("err", err)
        //       })

        //   }
    }

    return (
        <SafeAreaView style={{ height: Height, width: Width }}>
            <Header
                navigation={props.navigation}
                variant="white"
                headerName="Add Card"
                onPress={() => {
                    props.navigation.push('NewBuisnessCard1');
                }}
            />
            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{
                        width: '100%',
                        padding: 20,
                        backgroundColor: WHITE
                    }}>
                    <View
                        style={{ flexDirection: "row" }}>
                        <OutlinedInputBox
                            placeholder="Name of Category"
                            inputType="text"
                        // onChange={(value) => {
                        //   setProductShelving(value);
                        // }}
                        />
                        <TouchableOpacity
                            style={{ backgroundColor: PRIMARY, width: 80, height: 50, borderRadius: 9, marginLeft: -70, marginRight: 10, marginVertical: 15 }}>
                            <Text style={{ color: WHITE, alignSelf: 'center', marginVertical: 15 }}>
                                +Add
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text
                            style={{ marginLeft: 10, color: PRIMARY, fontSize: 18, fontWeight: '600' }}>
                            Category name here
                        </Text>
                        <TouchableOpacity
                            style={{ height: 25, width: 125, alignItems: 'center', backgroundColor: '#B2B2B2', borderRadius: 9, marginLeft: 30 }}>
                            <Text style={{ fontSize: 12, color: WHITE, marginVertical: 3 }}>
                                +Add sub-category
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text
                            style={{ marginLeft: 10, color: PRIMARY, fontSize: 18, fontWeight: '600', marginBottom: 10 }}>
                            Category name here
                        </Text>
                        <TouchableOpacity
                            style={{ height: 25, width: 125, alignItems: 'center', backgroundColor: '#B2B2B2', borderRadius: 9, marginLeft: 30 }}>
                            <Text style={{ fontSize: 12, color: WHITE, marginVertical: 3 }}>
                                +Add sub-category
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            width: '50%', height: 50, alignSelf: 'center', backgroundColor: PRIMARY,
                            borderRadius: 9, marginVertical: 10
                        }}>
                        <Text style={{ alignSelf: 'center', color: WHITE, marginVertical: 15 }}>
                            +Add Product
                        </Text>
                    </TouchableOpacity>
                    <OutlinedInputBox
                        placeholder="Name of Product"
                        inputType="text"
                    // onChange={(value) => {
                    //   setDateOfIncorporation(value);
                    // }}
                    />
                    <OutlinedInputBox
                        placeholder="Description of Product"
                        inputType="text"
                    // onChange={(value) => {
                    //   setCompanyWebsite(value);
                    // }}
                    />
                    <UploadBtn
                        svg={
                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={42.736}
                                height={51.223}
                                viewBox="0 0 42.736 51.223">
                                <G data-name="user (2)" fill="#fff">
                                    <Path
                                        data-name="Path 2128"
                                        d="M33.382 12.337a11.939 11.939 0 01-3.61 8.723 11.938 11.938 0 01-8.724 3.614h-.006a11.94 11.94 0 01-8.717-3.614 11.937 11.937 0 01-3.614-8.724 11.936 11.936 0 013.614-8.722A11.935 11.935 0 0121.039 0h.006a11.942 11.942 0 018.727 3.615 11.937 11.937 0 013.614 8.722zm0 0"
                                    />
                                    <Path
                                        data-name="Path 2129"
                                        d="M42.737 42.414a8.5 8.5 0 01-2.527 6.435 9.093 9.093 0 01-6.51 2.374H9.036a9.089 9.089 0 01-6.509-2.375A8.5 8.5 0 010 42.414c0-1.029.034-2.046.1-3.025a30.282 30.282 0 01.415-3.238 25.55 25.55 0 01.8-3.253 16.135 16.135 0 011.338-3.036 11.489 11.489 0 012.017-2.629 8.9 8.9 0 012.9-1.821 10.019 10.019 0 013.7-.669 3.749 3.749 0 012 .849c.61.4 1.314.852 2.09 1.348a11.933 11.933 0 002.7 1.191 10.769 10.769 0 002.978.528q.164.006.327.006a10.745 10.745 0 003.306-.534 11.933 11.933 0 002.7-1.191c.785-.5 1.488-.954 2.09-1.347a3.745 3.745 0 012.005-.85 10.025 10.025 0 013.7.669 8.9 8.9 0 012.9 1.821 11.449 11.449 0 012.017 2.629 16.082 16.082 0 011.338 3.035 25.528 25.528 0 01.8 3.255 30.567 30.567 0 01.414 3.236c.069.975.1 1.993.1 3.026zm0 0"
                                    />
                                    <Path
                                        data-name="Path 2130"
                                        d="M21.046 24.674h-.006V0h.006a11.942 11.942 0 018.724 3.614 11.937 11.937 0 013.614 8.722 11.939 11.939 0 01-3.614 8.724 11.938 11.938 0 01-8.724 3.614zm0 0"
                                    />
                                    <Path
                                        data-name="Path 2131"
                                        d="M42.736 42.414a8.5 8.5 0 01-2.527 6.435 9.093 9.093 0 01-6.51 2.375h-12.66V28.659q.164.006.327.006a10.745 10.745 0 003.306-.534 11.933 11.933 0 002.7-1.191c.785-.5 1.488-.954 2.09-1.347a3.745 3.745 0 012.005-.85 10.026 10.026 0 013.7.669 8.9 8.9 0 012.9 1.821 11.448 11.448 0 012.017 2.629 16.083 16.083 0 011.338 3.035 25.536 25.536 0 01.8 3.255 30.57 30.57 0 01.414 3.236c.069.975.1 1.993.1 3.026zm0 0"
                                    />
                                </G>
                            </Svg>
                        }
                        placeholder="Add Photo of Product"
                    // onCallBack={getBase64}
                    />
                    <OutlinedInputBox
                        placeholder="Any Other Information"
                        inputType="text"
                    // onChange={(value) => {
                    //   setDateOfIncorporation(value);
                    // }}
                    />
                    <OutlinedInputBox
                        placeholder="Category"
                        inputType="text"
                    // onChange={(value) => {
                    //   setDateOfIncorporation(value);
                    // }}
                    />
                    <OutlinedInputBox
                        placeholder="Tagline"
                        inputType="text"
                    // onChange={(value) => {
                    //   setDateOfIncorporation(value);
                    // }}
                    />
                    <View
                        style={{
                            width: '100%',
                        }}>

                        <BtnComponent
                            placeholder="Finish"
                            onPress={() => {
                                //       debugger;
                                props.navigation.push('Dashboard',
                                    //  {
                                    //   paramKey: props.route.params.paramkey,

                                    // }
                                );
                                // console.log("page 2 data", props.route.params.paramkey)
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );

}
