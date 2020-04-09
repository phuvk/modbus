import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeDrawer from './src/screen/router';

export default function App() {
    return (
        <NavigationContainer>
            <HomeDrawer />
        </NavigationContainer>
    );
};