import {View, Image, StatusBar, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../App';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';

function GoogleLogin() {
  const {signInWithGoogle, setUser, setIsSignedIn} = useAuth();

  const navigation = useNavigation();

  const {colors} = useTheme();

  const signIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      // TODO: make an api request to the backend check if the user is already in the database
      // if the user exists then log in the user
      if (false) {
        setUser(user);
        setIsSignedIn(true);
      }

      // else navigate to the sign up page
      else {
        navigation.navigate('SignUp', {
          user: user.user,
        });
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          paddingTop: StatusBar.currentHeight,
        }}>
        <Image
          source={{
            uri: 'https://pbs.twimg.com/profile_images/549084012342296576/cafXBvpk.jpeg',
          }}
          style={{
            width: '50%',
            height: '60%',
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.primaryDark,
            marginBottom: 12,
            textAlign: 'center',
          }}>
          Connect your college's GSuite email account with CollegeSpace
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.dimText,
            textAlign: 'center',
          }}>
          We need to verify your email address before you can use CollegeSpace
        </Text>
      </View>
      <View
        style={{
          padding: 16,
          paddingBottom: 24,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            signIn();
          }}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 12,
            width: '100%',
            padding: 16,
            paddingEnd: 24,
            paddingStart: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: colors.primary,
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 8,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Login with Google
          </Text>
          <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* https://image.freepik.com/free-vector/group-college-university-students-hanging-out_74855-5251.jpg */}
      {/* 6D55F6 https://image.freepik.com/free-vector/happy-diverse-students-celebrating-graduation-from-school_74855-5853.jpg*/}
    </View>
  );
}

export default GoogleLogin;
