import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Messages from './Messages';
import Chat from './Chat';
import {Image, Text, View} from 'react-native';
import LogoTitle from './LogoTitle';
import {IconButton} from 'react-native-paper';
import ViewProfile from './ViewProfile';
import {ChatContext} from './ChatContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

const MessageSectionStack = createNativeStackNavigator();

function MessageSection() {
  const [allChats, setAllChats] = React.useState({});
  const [verticalProfiles, setVerticalProfiles] = React.useState([]);
  // const MMKV = new MMKVStorage.Loader().initialize();

  // const removeItem = key => {
  //   MMKV.removeItem(key);
  //   MMKV.clearStore();
  //   MMKV.clearMemoryCache();
  // };

  // const storeData = (key, value) => {
  //   MMKV.setMap(key, value, (error, result) => {
  //     if (error) {
  //       console.log('STOREDATA: ', error);
  //       return;
  //     }

  //     console.log(result); // logs true;
  //   });
  // };

  // const getData = key => {
  //   MMKV.getMap(key, (error, result) => {
  //     if (error) {
  //       console.log('GETDATA: ', error);
  //       return;
  //     }

  //     return result;
  //     // console.log('Initialize empty allChats: ', result); // logs object
  //   });
  // };

  // const storeData = async value => {
  //   try {
  //     const jsonValue = JSON.stringify(value);
  //     await AsyncStorage.setItem('@Chats', jsonValue);
  //   } catch (e) {
  //     // saving error
  //   }
  // };
  // const getData = async () => {
  // const getMessageProfiles = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@Chats');
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  return (
    <ChatContext.Provider
      value={{
        // storeData,
        // getData,
        // removeItem,
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
