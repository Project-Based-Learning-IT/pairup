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
import {chats} from '../staticStore';

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
          color: colors.primary,
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
            onPress={() => {
              card1 = {
                id: 1,
                name: 'Tanya Agrawal',
                email: 'abc@viit.ac.in',
                personalEmail: 'lol@lol.com',
                bio: 'Common man',
                photo:
                  'https://media-exp1.licdn.com/dms/image/C5103AQFKbyGxKxMYGA/profile-displayphoto-shrink_200_200/0/1539165110959?e=1638403200&v=beta&t=c93WpMen-FJ1jheRQ2DAhVzHWU06ocZHHvjp1BH2jSM',
                info: 'BTech | CS | A1',
                year: '2023',
                division: 'A',
                batch: 'A1',
                branch: 'Information Technology',
                headline:
                  'Student at VIIT | Passionate about NodeJS, Angular and iOS',
                requirements:
                  'Looking for a python developer who is comfortable with numpy and pandas. Need someone who is capable of extracting insights from the given data. Knowledge of iOS development or Web Development is a plus.',
                skills: [
                  'Web Development',
                  'iOS App Development',
                  'NodeJS',
                  'Angular',
                  'Swift',
                  'Objective-C',
                ],
                links: {
                  // https://www.linkedin.com/in/
                  linkedin: 'rohini-dutta-b9a8a817b',
                  // https://www.github.com/
                  github: 'siddheshkothadi',
                  // https://twitter.com/
                  twitter: 'siddheshkothadi',
                },
                languages: ['Marathi', 'English', 'Hindi'],
              };
              navigation.navigate('ViewProfileRightSwipedU', {user: card1});
            }}>
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
                  right: 3,
                  top: 50,
                  backgroundColor: colors.success,
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
          color: colors.primary,
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
                  backgroundColor: colors.secondary,
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
