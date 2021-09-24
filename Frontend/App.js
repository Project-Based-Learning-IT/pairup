/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Discover from './components/Discover';
import Messages from './components/Messages';
import Profile from './components/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#fff'}
      />
      <Tab.Navigator
        initialRouteName="Discover"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Discover') {
              return (
                <View style={focused ? styles.focussedTabButton : {}}>
                  <Feather
                    name={focused ? 'compass' : 'compass'}
                    size={size}
                    color={color}
                  />
                </View>
              );
            }
            if (route.name === 'Messages') {
              return (
                <View style={focused ? styles.focussedTabButton : {}}>
                  <Feather
                    name={focused ? 'message-circle' : 'message-circle'}
                    size={size}
                    color={color}
                  />
                </View>
              );
            }
            if (route.name === 'Profile') {
              return (
                <View style={focused ? styles.focussedTabButton : {}}>
                  <MaterialCommunityIcons
                    name={focused ? 'account-outline' : 'account-outline'}
                    size={size}
                    color={color}
                  />
                </View>
              );
            }
          },
          tabBarActiveTintColor: '#F65E7E',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
        })}>
        <Tab.Screen
          name="Discover"
          component={Discover}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Messages" component={Messages} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  focussedTabButton: {
    padding: 6,
    borderRadius: 50,
    backgroundColor: '#F4F4F4',
  },
});

export default App;
