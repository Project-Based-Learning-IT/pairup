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
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Tab = createBottomTabNavigator();

const App = () => {
  React.useEffect(async () => {
    try {
      GoogleSignin.configure({
        // scopes: [
          // 'https://www.googleapis.com/auth/userinfo.email',
          // 'https://www.googleapis.com/auth/userinfo.profile'
        // ], // what API you want to access on behalf of the user, default is email and profile
        // webClientId: '394579027980-pcr6jtjponhlh7spf5t04oaek4ht8e2s.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        // hostedDomain: '', // specifies a hosted domain restriction
        // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        // accountName: '', // [Android] specifies an account name on the device that should be used
        // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        // googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // this.setState({ userInfo });
      console.log('userInfo', userInfo);

      const isSignedIn = await GoogleSignin.isSignedIn();

      console.log(isSignedIn)
    } catch (error) {
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
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
