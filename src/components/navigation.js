import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AvailableShiftsScreen from "../screens/availableShifts";
import LoginScreen from "../screens/login";
import MyShiftsScreen from "../screens/myShifts";
import SignUpScreen from "../screens/signup";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="myShifts"
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
          fontWeight: "700",
          fontSize: 15,
        },
        tabBarIconStyle: { display: "none" },
      }}
    >
      <Tab.Screen
        component={MyShiftsScreen}
        name="myShifts"
        options={{ tabBarLabel: "My Shifts" }}
      />
      <Tab.Screen
        component={AvailableShiftsScreen}
        name="availableShifts"
        options={{ tabBarLabel: "Available Shifts" }}
      />
    </Tab.Navigator>
  );
}

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          component={Home}
          name="Home"
          options={{ headerShown: false }}
        />
        <Stack.Screen component={LoginScreen} name="Login" />
        <Stack.Screen component={SignUpScreen} name="SignUp" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
