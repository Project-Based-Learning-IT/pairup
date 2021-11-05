import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import {defaultProfilePic} from '../staticStore';
import {useNavigation} from '@react-navigation/native';

function LogoTitle({userChatting, Routename, user}) {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        if (Routename == 'Chat') {
          // console.log('header pressed');
          navigation.navigate('ChatViewProfile', {
            card_user: {id: userChatting.pid, name: userChatting.Name},
            swiperRef: -1,
          });
        }
      }}>
      <View style={{flexDirection: 'row', marginLeft: -16}}>
        <Image
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
          }}
          source={{
            uri:
              userChatting?.Image_URL && userChatting?.Image_URL !== 'None'
                ? userChatting?.Image_URL
                : user?.photo
                ? user?.photo
                : defaultProfilePic,
          }}
        />
        {Routename == 'Chat' && (
          <View
            style={{
              position: 'absolute',
              left: 30,
              top: 0,
              justifyContent: 'center',
              backgroundColor: 'green',
              height: 12,
              width: 12,
              borderRadius: 6,
              borderWidth: 2,
              borderColor: 'white',
            }}></View>
        )}
        <View
          style={{
            marginLeft: 10,
            justifyContent:
              Routename === 'ViewProfile' ? 'center' : 'space-between',
          }}>
          <Text
            style={{
              fontSize: Routename === 'ViewProfile' ? 22 : 18,
              fontWeight: 'bold',
            }}>
            {userChatting?.Name ? userChatting?.Name : user.name}
          </Text>
          {Routename == 'Chat' && (
            <Text
              style={{
                fontSize: 12,
                color: colors.placeholderText,
              }}>
              online
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default LogoTitle;
