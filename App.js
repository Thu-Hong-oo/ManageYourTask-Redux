
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store/store'; // Import your store here
import Screen01 from './screen/Screen01';
import Screen02 from './screen/Screen02';
import Screen03 from './screen/Screen03';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>  {/* Wrap the app with Redux Provider */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Screen01">
          <Stack.Screen
            name="Screen01"
            component={Screen01}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Screen02"
            component={Screen02}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Screen03"
            component={Screen03}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
