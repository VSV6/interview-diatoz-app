import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/home'
import LoginScreen from '../screens/login'
import SignUpScreen from '../screens/signup'

const Stack = createNativeStackNavigator()

function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen component={HomeScreen} name='Home' options={{ headerShown: false }} />
                <Stack.Screen component={LoginScreen} name='Login' />
                <Stack.Screen component={SignUpScreen} name='SignUp' />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator