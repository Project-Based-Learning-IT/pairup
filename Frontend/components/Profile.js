import { View, Text } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

function Profile() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile</Text>
    </View>
  );
}

export default Profile;
