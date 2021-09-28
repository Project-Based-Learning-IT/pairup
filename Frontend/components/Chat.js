import React from 'react';
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Ioncions from 'react-native-vector-icons/Ionicons';

function Chat(props) {
  const {userChatting} = props.route.params;

  const {colors} = useTheme();

  React.useEffect(() => {
    console.log(userChatting);
  }, [userChatting]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
        }}></ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '90%',
          margin: 10,
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
          placeholder="Type a message"
          multiline={true}
          style={{
            color: colors.textHeadBlack,
            fontSize: 16,
            flex: 1,
            paddingLeft: 10,
          }}></TextInput>
        <TouchableHighlight
          style={{
            backgroundColor: colors.primary,
            borderRadius: 8,
            padding: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ioncions
            name="ios-send"
            size={24}
            color={'#fff'}
            style={{
              transform: [{rotate: '-30deg'}],
              marginBottom: 2,
            }}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default Chat;
