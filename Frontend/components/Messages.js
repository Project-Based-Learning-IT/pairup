import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import {useTheme} from 'react-native-paper';

// TODO: remove the mockdata
const chats = [
  'Hey',
  "I wasn't expecting that!",
  'Good bye',
  'Never say never',
  "I'm not sure",
  'Working on Chat App',
  'Come to bay area',
  'Visit once',
  'LOL!',
  'Will meet you soon!',
  "You're genius",
  "I'm impressed",
  '3000!',
];

function Messages() {
  const navigation = useNavigation();
  const {colors} = useTheme();

  const [horizontalProfiles, setHorizontalProfiles] = React.useState([]);
  const [verticalProfiles, setVerticalProfiles] = React.useState([]);

  React.useEffect(async () => {
    // Loop to fetch 8 horizontal profiles
    for (let i = 0; i < 8; i++) {
      const response = await fetch(
        'https://randomuser.me/api/?results=1&inc=name,picture,email,location,phone,cell,dob,login,registered,id,nat&noinfo',
      );
      const data = await response.json();
      setHorizontalProfiles(horizontalProfiles => [
        ...horizontalProfiles,
        data.results[0],
      ]);
    }

    // console.log(horizontalProfiles);

    // Loop for vertical profiles
    for (let i = 0; i < 8; i++) {
      const response = await fetch(
        'https://randomuser.me/api/?results=1&inc=name,picture,email,location,phone,cell,dob,login,registered,id,nat&noinfo',
      );
      const data = await response.json();
      setVerticalProfiles(verticalProfiles => [
        ...verticalProfiles,
        data.results[0],
      ]);
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
      }}>
      <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />

      <Text
        style={{
          padding: 10,
          color: colors.tinderRed,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        People who right swiped you
      </Text>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          // height: 100,
          flexGrow: 0.005,
        }}>
        {horizontalProfiles.map((profile, index) => (
          <TouchableOpacity
            key={index}
            style={{
              margin: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() =>
              navigation.navigate('Chat', {userChatting: profile})
            }>
            <Image
              source={{
                uri: profile.picture.large,
              }}
              style={{
                width: 64,
                height: 64,
                marginBottom: 2,
                borderRadius: 50,
              }}
            />
            {index < 2 && (
              <View
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 50,
                  backgroundColor: colors.tinderRed,
                  padding: 0,
                  borderWidth: 2,
                  borderColor: '#fff',
                  borderRadius: 10,
                  height: 12,
                  width: 12,
                }}></View>
            )}
            <Text
              style={{
                textAlign: 'center',
                fontSize: 11,
                color: colors.textLightBlack,
              }}>
              {profile.name.first}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text
        style={{
          padding: 10,
          color: colors.tinderRed,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        Messages
      </Text>

      <ScrollView
        style={{
          flex: 1,
          width: '100%',
        }}>
        {verticalProfiles.map((profile, index) => (
          <TouchableOpacity
            key={index}
            style={{
              padding: 10,
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onPress={() =>
              navigation.navigate('Chat', {userChatting: profile})
            }>
            <Image
              source={{
                uri: profile.picture.large,
              }}
              style={{
                width: 64,
                height: 64,
                marginBottom: 2,
                borderRadius: 50,
              }}
            />
            <View
              style={{
                paddingLeft: 12,
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flex: 1,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                {profile.name.first}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#9b9b9b',
                }}>
                {chats[Math.floor(Math.random() * 9)]}
              </Text>
            </View>
            {(index == 0 || index == 1 || index == 4) && (
              <View
                style={{
                  borderRadius: 50,
                  backgroundColor: colors.tinderRed,
                  height: 24,
                  width: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    zIndex: 1,
                  }}>
                  {Math.floor(Math.random() * 5) + 1}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default Messages;
