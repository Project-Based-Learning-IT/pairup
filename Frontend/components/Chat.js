import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  Image,
  RefreshControl,
} from 'react-native';
import {useTheme, Portal, ActivityIndicator} from 'react-native-paper';
import Ioncions from 'react-native-vector-icons/Ionicons';
import Hyperlink from 'react-native-hyperlink';
import {Linking} from 'react-native';
import {useAuth} from '../App';
import LinkPreview from './LinkPreview';
import {ChatContext} from './ChatContext';
import {useRoute} from '@react-navigation/native';
// import {getBoilerplateChats} from '../staticStore';

function extractURL(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;

  const res = urlRegex.exec(text);

  if (res) {
    return res[0];
  }

  return null;
}

function Chat(props) {
  const scrollViewRef = React.useRef();

  const {userChatting} = props.route.params;
  const {
    allChats,
    setAllChats,
    verticalProfiles,
    // setVerticalProfiles,
    // getData,
    // storeData,
  } = React.useContext(ChatContext);

  const {colors} = useTheme();
  const route = useRoute();

  const {user, axiosInstance} = useAuth();

  const [chatText, setChatText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  let updatingState;
  const [chats, setChats] = React.useState(
    allChats[userChatting.pid] ? allChats[userChatting.pid] : [],
  );

  function getMarginBottom(index) {
    if (index === chats.length - 1) {
      return 0;
    }

    if (chats[index + 1].Sender_ID === chats[index].Sender_ID) {
      return 2;
    }

    return 10;
  }

  function getBorderRadius(index) {
    if (index === 0) {
      return 4;
    }

    if (chats[index - 1].Sender_ID === chats[index].Sender_ID) {
      return 14;
    }

    return 4;
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  let currChatInterval;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getNewlyReceived();
    await sleep(2000).then(() => setRefreshing(false));
  }, []);

  const getNewlyReceived = async () => {
    updatingState = true;
    try {
      let lastMessageTimestamp =
        chats.length > 0
          ? chats[chats.length - 1].timestamp
          : '26 Oct 2021 13:10:30 GMT';

      // console.log('Chats length: ', chats.length, 'content', chats);

      console.log('ChatsTime: ', lastMessageTimestamp);
      let res = null;
      while (res === null) {
        await axiosInstance
          .post('/get_chats_after_last_cached', {
            pid: userChatting.pid,
            //TODO set lastMessageTimestamp for DateTime
            // DateTime: '2021-10-23 13:59:13',
            DateTime: lastMessageTimestamp,
          })
          .then(response => {
            res = response.data;
          })
          .catch(err => {
            console.error('NewlyReceived Error : ' + err);
          });
        await sleep(2000);
      }

      let new_chats = [];
      if (res.length > 0) {
        if (updatingState === true) {
          await setAllChats(prevAllChats => {
            res.map(msg => {
              if (!prevAllChats[userChatting.pid]) {
                prevAllChats[userChatting.pid] = [];
              }
              new_chats.push(msg);
              prevAllChats[userChatting.pid].push(msg);
            });
            return prevAllChats;
          });

          // storeData('chats', allChats);
          // console.log('Stored updated chats', getData('chats'));

          if (chats.length > 0) {
            await setChats(prevChats => {
              new_chats.map(msg => {
                if (msg.Sender_ID !== user.id) {
                  if (prevChats[prevChats.length - 1].text !== msg.text) {
                    prevChats.push(msg);
                  }
                }
              });
              return prevChats;
            });
          } else {
            await setChats([...chats, ...new_chats]);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(async () => {
    // setIsLoading(true);
    await sleep(2000);
    await getNewlyReceived();
    await sleep(2000);
    // currChatInterval = setInterval(async () => {
    //   await getNewlyReceived();
    // }, 5000);
    // setIsLoading(false);
    return () => {
      updatingState = false;
      //To prevent state update on unmount
      // clearInterval(currChatInterval);
    };
  }, [verticalProfiles]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ECE5DD',
      }}>
      {console.log('Chats Rerender', chats.length)}
      <ImageBackground
        source={
          {
            // uri: 'https://i.redd.it/qwd83nc4xxf41.jpg',
          }
        }
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
          width: '100%',
        }}>
        {/* {isLoading ? (
          <Portal>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#000',
                opacity: 0.5,
                zIndex: 1000,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          </Portal>
        ) : ( */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            paddingTop: 12,
            paddingBottom: 75,
            paddingLeft: '4%',
            paddingRight: '4%',
          }}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }
          style={{
            flex: 1,
            width: '100%',
          }}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        >
          {chats.map((chat, index) => {
            return (
              <View
                key={index}
                style={{
                  padding: 6,
                  maxWidth: '70%',
                  borderRadius: 14,
                  borderTopRightRadius:
                    chat.Sender_ID === user.id ? getBorderRadius(index) : 14,
                  borderTopLeftRadius:
                    chat.Sender_ID === user.id ? 14 : getBorderRadius(index),
                  marginBottom: getMarginBottom(index),
                  backgroundColor:
                    chat.Sender_ID === user.id ? colors.primary : '#fff',
                  alignSelf:
                    chat.Sender_ID === user.id ? 'flex-end' : 'flex-start',
                  elevation: 2,
                }}>
                <Hyperlink
                  linkStyle={{
                    color: chat.Sender_ID === user.id ? '#d3ffff' : '#007bff',
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                  }}
                  onPress={(url, text) => {
                    Linking.openURL(url).catch(error =>
                      console.warn('An error occurred: ', error),
                    );
                  }}>
                  {extractURL(chat.text) && (
                    <LinkPreview
                      link={extractURL(chat.text)}
                      isSent={chat.Sender_ID !== user.id}
                    />
                  )}
                  <Text
                    selectable={true}
                    style={{
                      padding: 6,
                      color:
                        chat.Sender_ID === user.id ? '#fff' : colors.primary,
                    }}>
                    {chat.text}
                  </Text>
                </Hyperlink>
              </View>
            );
          })}
        </ScrollView>
        {/* )} */}
      </ImageBackground>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '95%',
          margin: 10,
          // marginBottom: 0,
          borderRadius: 12,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 4,
          padding: 6,
        }}>
        <TextInput
          placeholderTextColor={colors.textLightBlack}
          placeholder="Type something..."
          multiline={true}
          value={chatText}
          onChangeText={text => setChatText(text)}
          style={{
            color: colors.primary,
            fontSize: 16,
            flex: 1,
            paddingLeft: 10,
          }}
          onFocus={() => scrollViewRef.current.scrollToEnd()}></TextInput>
        <TouchableHighlight
          style={{
            backgroundColor: colors.primary,
            borderRadius: 8,
            padding: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={async () => {
            let Newmsg = {};
            while (Object.keys(Newmsg).length === 0) {
              await axiosInstance
                .post('/message', {
                  Receiver_ID: userChatting.pid,
                  text: chatText,
                })
                .then(response => {
                  // console.log(JSON.stringify(response.data));
                  Newmsg = response.data;
                })
                .catch(err => {
                  console.error('NewMessage Error : ' + err);
                });
              await sleep(2000);
            }
            setChats([...chats, Newmsg]);
            // await getNewlyReceived();
            setChatText('');
            // userChatting.text = chatText;
            // await setVerticalProfiles(prevVerticalProfiles => {
            //   const newVProfiles = prevVerticalProfiles.filter(profile => {
            //     return profile.pid !== userChatting.pid;
            //   });
            //   return [...newVProfiles, userChatting];
            // });

            // await setAllChats(prevAllChats => {
            //   const newAllChats = {...prevAllChats};
            //   newAllChats[userChatting.pid] = [
            //     ...prevAllChats[userChatting.pid],
            //     Newmsg,
            //   ];
            //   return newAllChats;
            // });
            // await chatData(allChats);
          }}>
          <Ioncions
            name="ios-send"
            size={20}
            color={'#fff'}
            style={{
              transform: [{rotate: '-45deg'}],
              marginBottom: 2,
              marginLeft: 2,
            }}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default Chat;
