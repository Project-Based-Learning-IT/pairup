import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  Image,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Ioncions from 'react-native-vector-icons/Ionicons';
import Hyperlink from 'react-native-hyperlink';
import {Linking} from 'react-native';
import {useAuth} from '../App';
import LinkPreview from './LinkPreview';
import {ChatContext} from './ChatContext';
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

  const {userChatting, pChats} = props.route.params;
  const {allChats, setAllChats, verticalProfiles, setVerticalProfiles} =
    React.useContext(ChatContext);

  // console.log(pChats);

  const {colors} = useTheme();

  const {user, axiosInstance} = useAuth();

  const [chatText, setChatText] = React.useState('');

  const [chats, setChats] = React.useState(pChats);

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

  React.useEffect(() => {
    console.log(chats);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ECE5DD',
      }}>
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
          }}>
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
            function sleep(ms) {
              return new Promise(resolve => setTimeout(resolve, ms));
            }
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
            userChatting.text = chatText;
            setVerticalProfiles(prevVerticalProfiles => {
              const newVProfiles = prevVerticalProfiles.filter(profile => {
                return profile.pid !== userChatting.pid;
              });
              return [...newVProfiles, userChatting];
            });
            setChatText('');
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
