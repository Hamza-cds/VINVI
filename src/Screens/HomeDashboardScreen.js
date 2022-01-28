import React, { Component } from 'react';
import { View, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import Header from '../Components/Header';
import DashboardStories from '../Components/DashboardStories';
import UserCard from '../Components/UserCard';
import { Height, Width } from '../Constants/Constants';

export default function HomeDashboardScreen(props) {

  return (
    <SafeAreaView style={{ height: Height, width: Width }}>
      <ImageBackground
        source={require('../Assets/dashboardbg.png')}
        style={{ flex: 1, paddingBottom: 80 }}>
        <Header
          navigation={props.navigation}
          variant="drawer"
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: -65,
            marginBottom: 10,
          }}>
          <DashboardStories />
        </View>
        <ScrollView style={{ flex: 1 }}>
          <UserCard
            cta={true}
            variant="closed"
            navigation={props.navigation}
            navigationPath="Individual"
          />
          <UserCard
            cta={true}
            variant="broadcasted"
            navigation={props.navigation}
            navigationPath="Individual"
          />
          <UserCard
            cta={true}
            variant="open"
            navigation={props.navigation}
            navigationPath="Individual"
          />
          <UserCard
            cta={true}
            variant="open"
            navigation={props.navigation}
            navigationPath="Individual"
          />
          <UserCard
            cta={true}
            variant="open"
            navigation={props.navigation}
            navigationPath="Individual"
          />
          <UserCard
            cta={true}
            variant="open"
            navigation={props.navigation}
            navigationPath="Individual"
          />
          <UserCard
            cta={true}
            variant="open"
            navigation={props.avigation}
            navigationPath="Individual"
          />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );

}
