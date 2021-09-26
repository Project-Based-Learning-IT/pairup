import React, {useContext} from 'react';
import {StatusBar, StyleSheet, View, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Discover from './components/Discover';
import Messages from './components/Messages';
import Profile from './components/Profile';
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
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LinkedinLogin from './components/LinkedinLogin';

const AuthContext = React.createContext();

function useAuth() {
  return useContext(AuthContext);
}

const CLIENT_ID = '78mt8ifqn5yg9n';
const urlEncoded = 'https%3A%2F%2Fwww.google.com';
const redirectUrl = 'https://www.google.com';
const CLIENT_SECRET = 'qp0rG6VQXZyB1ZoN'

const Tab = createBottomTabNavigator();
const LoggedOutStack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [user, setUser] = React.useState({});

  const signInWithGoogle = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();

      if(userInfo.user.email.split('@')[1] === 'viit.ac.in'){
        return userInfo;
      }
      else {
        GoogleSignin.revokeAccess();
        Alert.alert(
          'Sign In failed',
          'You are not a student of VIIT'
        );
      }
      return undefined;
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithLinkedin = async (access_token) => {
    try {
    }
    catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setIsSignedIn(false);
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

      const loggedInState = await GoogleSignin.isSignedIn();
      console.log('loggedInState', loggedInState)

      if(loggedInState) {
        const userInfo = await GoogleSignin.signInSilently();
        setUser(userInfo);
        setIsSignedIn(loggedInState);
      }

      // TODO: Remove this fake splash screen
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
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

  // if(true) {
  //   return <LinkedinLogin />
  // }

  if(isLoading) {
    console.log('Loading')
    return (
      <SplashScreen></SplashScreen>
    )
  }

  return (
    <SafeAreaProvider style={{ flex: 1}}>
    <AuthContext.Provider
      value={{
        isSignedIn,
        isLoading,
        signInWithGoogle,
        user,
        setUser,
        signOut,
      }}
    >
      <NavigationContainer>
        <StatusBar barStyle={'dark-content'} backgroundColor='transparent' translucent={true}/>
        {!isSignedIn && (
          <LoggedOutStack.Navigator>
            <LoggedOutStack.Screen
              name="GoogleLogin"
              component={GoogleLogin}
              options={{headerShown: false}}
            >
            </LoggedOutStack.Screen>
            <LoggedOutStack.Screen
              name="LinkedinLogin"
              component={LinkedinLogin}
              options={{headerShown: false}}
            >
            </LoggedOutStack.Screen>
          </LoggedOutStack.Navigator>
        )}
        {isSignedIn && (
          <Tab.Navigator
            initialRouteName="Profile"
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
              options={{
                headerShown: false
              }}
            />
            <Tab.Screen 
              name="Messages"
              component={Messages} 
            />
            <Tab.Screen 
              name="Profile"
              component={Profile}
              options={{
                headerShown: false
              }}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
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
