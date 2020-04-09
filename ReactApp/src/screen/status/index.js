import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StatusScreen from './status';

const Stack = createStackNavigator();

export function StatusStack() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name="Status" component={StatusScreen} />
        </Stack.Navigator>
    );
}