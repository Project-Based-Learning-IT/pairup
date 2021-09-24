import { View, Image, StatusBar, Text } from 'react-native';
import React from 'react';
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import {
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import { useAuth } from '../App';

function GoogleLogin() {
  const { signIn } = useAuth();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Fontawesome name={'graduation-cap'} size={100} color={'#484848'} />
        <Text style={{fontSize: 36, fontWeight: 'bold', color: '#484848'}}>CollegeSpace</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 22, color: '#383838', paddingStart: 12, paddingEnd: 12}}>Be around good energy</Text>
          <Text style={{fontSize: 22, color: '#383838', paddingStart: 12, paddingEnd: 12}}>Connect with people</Text>
          <Text style={{fontSize: 22, color: '#383838', paddingStart: 12, paddingEnd: 12}}>Learn new things</Text>
          <Text style={{fontWeight: 'bold', fontSize: 28, paddingStart: 12, paddingEnd: 12, color: '#383838'}}>Grow</Text>
        </View>
        <GoogleSigninButton
          style={{ width: 192, height: 48, zIndex: 1 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => signIn()}
        >
        </GoogleSigninButton>
      </View>
      {/* https://image.freepik.com/free-vector/group-college-university-students-hanging-out_74855-5251.jpg */}
      {/* 6D55F6 https://image.freepik.com/free-vector/happy-diverse-students-celebrating-graduation-from-school_74855-5853.jpg*/}
      <Image source={{uri: 'https://image.freepik.com/free-vector/happy-diverse-students-celebrating-graduation-from-school_74855-5853.jpg'}} style={{width: '100%', height: 200}} />
    </View>
  );
}

export default GoogleLogin;
