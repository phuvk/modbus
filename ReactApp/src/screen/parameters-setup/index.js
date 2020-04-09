
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ParametersSetupScreen from './parameters-setup';
import DU200FOSettingScreen from './DU200FO-setting';

const Stack = createStackNavigator();

export function SetupStack() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Parameters Setup' component={ParametersSetupScreen} />
            <Stack.Screen name='DU200FO Settings' component={DU200FOSettingScreen} />
        </Stack.Navigator>
    );
}