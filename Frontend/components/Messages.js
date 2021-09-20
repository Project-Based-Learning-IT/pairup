import { View, Text } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

function Messages() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Messages</Text>
    </View>
  );
}

export default Messages;
