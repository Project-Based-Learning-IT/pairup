import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Messages from './Messages';
import Chat from './Chat';
import {Image, Text, View} from 'react-native';
import LogoTitle from './LogoTitle';
import {IconButton} from 'react-native-paper';

const MessageSectionStack = createNativeStackNavigator();

function MessageSection() {
  return (
    <MessageSectionStack.Navigator>
      <MessageSectionStack.Screen
        name="Messages"
        component={Messages}
        options={{headerShown: false}}></MessageSectionStack.Screen>
      <MessageSectionStack.Screen
        name="Chat"
        component={Chat}
        options={({route}) => ({
          headerTitle: () => (
            <LogoTitle userChatting={route?.params?.userChatting} />
          ),
          headerRight: () => <IconButton icon="dots-horizontal" />,
        })}></MessageSectionStack.Screen>
    </MessageSectionStack.Navigator>
  );
}

export default MessageSection;
