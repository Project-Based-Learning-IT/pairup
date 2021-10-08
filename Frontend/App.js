import React, {useContext} from 'react';
import {StatusBar, StyleSheet, View, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Discover from './components/Discover';
import MyProfile from './components/MyProfile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import SplashScreen from './components/SplashScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GoogleLogin from './components/GoogleLogin';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LinkedinLogin from './components/LinkedinLogin';
import GetStarted from './components/GetStarted';
import SignUp from './components/SignUp';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import * as Keychain from 'react-native-keychain';
import MessageSection from './components/MessageSection';

const AuthContext = React.createContext();

function useAuth() {
  return useContext(AuthContext);
}

const theme = {
  ...DefaultTheme,
  roundness: 6,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    // Tinder color: #F65E7E (when bottom tab bar focussed)
    // primary: '#F65E7E',
    // Discover background: #C30F31
    // primary: '#C30F31',
    // Red from figma
    // tinderRed: '#EB5757',

    primary: '#0a243f',
    primaryDark: '#05051b',
    secondary: '#077f7f',
    secondaryDark: '#0D4F4F',

    gray: '#343A40',
    lightGray: '#6C757D',

    warning: '#F88634',
    info: '#17A2B8',
    danger: '#FF5A5F',
    success: '#30D158',

    textHeadBlack: '#0a243f', // Same as primary
    textDarkBlack: '#131313',
    placeholderText: '#495057',
    textLightBlack: '#6b7b8a',
    textWhite: '#F8F9FA',

    github: '#333',
    linkedin: '#0077B5',
    twitter: '#1DA1F2',
  },
};

const Tab = createBottomTabNavigator();
const LoggedOutStack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [user, setUser] = React.useState({});

  const signInWithGoogle = async () => {
    try {
      if (GoogleSignin.isSignedIn()) {
        GoogleSignin.signOut();
      }
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.user.email.split('@')[1] === 'viit.ac.in') {
        return userInfo;
      } else {
        await GoogleSignin.revokeAccess();
        Alert.alert('Sign In Failed', 'You are not a student of VIIT');
      }
      return undefined;
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setIsSignedIn(false);
      await Keychain.resetGenericPassword();
      setUser({});
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(async () => {
    try {
      setIsLoading(true);

      GoogleSignin.configure({});
      await GoogleSignin.hasPlayServices();

      // TODO: store user in storage
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        setUser(JSON.parse(credentials.password));
        setIsSignedIn(true);
      }

      // TODO: Remove this fake splash screen
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('SIGN_IN_CANCELLED');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        // some other error happened
        console.log('some other error happened');
      }
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    console.log('Loading');
    return <SplashScreen></SplashScreen>;
  }

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <PaperProvider theme={theme}>
        <AuthContext.Provider
          value={{
            isSignedIn,
            setIsSignedIn,
            isLoading,
            signInWithGoogle,
            user,
            setUser,
            signOut,
          }}>
          <NavigationContainer>
            <StatusBar
              barStyle={'dark-content'}
              backgroundColor="transparent"
              translucent={true}
            />
            {!isSignedIn && (
              <LoggedOutStack.Navigator>
                <LoggedOutStack.Screen
                  name="GetStarted"
                  component={GetStarted}
                  options={{headerShown: false}}></LoggedOutStack.Screen>
                <LoggedOutStack.Screen
                  name="GoogleLogin"
                  component={GoogleLogin}
                  options={{headerShown: false}}></LoggedOutStack.Screen>
                <LoggedOutStack.Screen
                  name="SignUp"
                  component={SignUp}></LoggedOutStack.Screen>
                <LoggedOutStack.Screen
                  name="LinkedinLogin"
                  component={LinkedinLogin}
                  options={{headerShown: false}}></LoggedOutStack.Screen>
              </LoggedOutStack.Navigator>
            )}
            {isSignedIn && (
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
                    if (route.name === 'MessageSection') {
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
                    if (route.name === 'MyProfile') {
                      return (
                        <View style={focused ? styles.focussedTabButton : {}}>
                          <MaterialCommunityIcons
                            name={
                              focused ? 'account-outline' : 'account-outline'
                            }
                            size={size}
                            color={color}
                          />
                        </View>
                      );
                    }
                  },
                  tabBarActiveTintColor: theme.colors.primary,
                  tabBarInactiveTintColor: 'gray',
                  tabBarShowLabel: false,
                })}>
                <Tab.Screen
                  name="Discover"
                  component={Discover}
                  options={{
                    headerShown: false,
                  }}
                />
                <Tab.Screen
                  name="MessageSection"
                  component={MessageSection}
                  options={{
                    headerShown: false,
                  }}
                />
                <Tab.Screen
                  name="MyProfile"
                  component={MyProfile}
                  options={{
                    headerShown: false,
                  }}
                />
              </Tab.Navigator>
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  focussedTabButton: {
    padding: 6,
    borderRadius: 50,
    backgroundColor: '#F4F4F4',
  },
});

export {App, useAuth};
