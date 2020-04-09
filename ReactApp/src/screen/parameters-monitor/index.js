import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ParametersMonitorScreen from './parameters-monitor';

const Stack = createStackNavigator();

export function MonitorStack() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Parameters Monitor' component={ParametersMonitorScreen}/>
        </Stack.Navigator>
    );
}