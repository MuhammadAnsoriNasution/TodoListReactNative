import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import FormActivity from '../screen/FormActivity';
import HomeScreen from '../screen/HomeScreen';
import { blue, white } from '../utils/color';

const Stack = createNativeStackNavigator();
const options = {
    headerStyle: {
        backgroundColor: blue,
    },
    headerTintColor: white,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}
function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'To Do List App',
                        ...options
                    }} />
                <Stack.Screen
                    name="FormActivity"
                    component={FormActivity}
                    options={{
                        title: 'New Activity',
                        ...options
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;