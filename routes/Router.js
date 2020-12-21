import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Materials from "@screens/Materials";
import Material from "@screens/Material";

const defaultNavigatorProps = {
  screenOptions: {
    cardOverlayEnabled: true,
    gestureEnabled: true,
    ...TransitionPresets.SlideFromRightIOS,
  },
  headerMode: 'none',
};

const RootStack = createStackNavigator();
const UserStack = createStackNavigator();

const UserRoutes = () => (
  <UserStack.Navigator initialRouteName={'Materials'}>
    <UserStack.Screen
      name={'Materials'}
      component={Materials}
      options={{
        title: 'Raw Materials'
      }}
    />
    <UserStack.Screen name={'Material'} component={Material}/>
  </UserStack.Navigator>
)

export default function Router() {
  // TODO add auth-routes flow here
  return (
    <RootStack.Navigator initialRouteName={'UserRoutes'} {...defaultNavigatorProps}>
      <RootStack.Screen name={'UserRoutes'} component={UserRoutes} />
    </RootStack.Navigator>
  );
}
