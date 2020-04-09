import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {StatusStack} from './status';
import {MonitorStack} from './parameters-monitor';
import {SetupStack} from './parameters-setup';

import SideBar from './sidebar';

const Drawer = createDrawerNavigator();

function HomeDrawer() {
    return (
        <Drawer.Navigator
            drawerStyle={{
                backgroundColor: '#fff',
                width: 240,
            }}

            drawerContent={
                props => <SideBar {...props} />
            }
        >
            <Drawer.Screen name="Status" component={StatusStack} />
            <Drawer.Screen name="Parameters Monitor" component={MonitorStack} />
            <Drawer.Screen name="Parameters Setup" component={SetupStack} />
        </Drawer.Navigator>
    );
}

export default HomeDrawer;