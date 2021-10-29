import React from 'react';
import {Image, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';

function LogoTitle({userChatting, Routename, user}) {
  const {colors} = useTheme();
  // console.log(Routename);
  return (
    <View style={{flexDirection: 'row', marginLeft: -16}}>
      <Image
        style={{
          width: 42,
          height: 42,
          borderRadius: 21,
        }}
        source={{
          uri: userChatting?.Image_URL
            ? userChatting?.Image_URL
            : user?.photo
            ? user?.photo
            : 'https://www.xeus.com/wp-content/uploads/2014/09/One_User_Orange.png',
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
  );
}

export default LogoTitle;
