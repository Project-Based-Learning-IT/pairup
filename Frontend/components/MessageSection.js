import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Messages from './Messages';
import Chat from './Chat';
import {Image, Text, View} from 'react-native';
import LogoTitle from './LogoTitle';
import {IconButton} from 'react-native-paper';
import ViewProfile from './ViewProfile';
import {ChatContext} from './ChatContext';

const MessageSectionStack = createNativeStackNavigator();

function MessageSection() {
  const [allChats, setAllChats] = React.useState({});
  const [verticalProfiles, setVerticalProfiles] = React.useState([]);
  return (
    <ChatContext.Provider
      value={{
        allChats,
        setAllChats,
        verticalProfiles,
        setVerticalProfiles,
      }}>
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
              <LogoTitle
                userChatting={route?.params?.userChatting}
                Routename={route.name}
              />
            ),
            headerRight: () => <IconButton icon="dots-horizontal" />,
          })}></MessageSectionStack.Screen>
        <MessageSectionStack.Screen
          name="ViewProfileRightSwipedU"
          component={ViewProfile}
          options={({route}) => ({
            headerTitle: () => (
              <LogoTitle
                user={route?.params?.card_user}
                Routename={route.name}
              />
            ),
            headerRight: () => <IconButton icon="dots-horizontal" />,
          })}></MessageSectionStack.Screen>
      </MessageSectionStack.Navigator>
    </ChatContext.Provider>
  );
}

export default MessageSection;
