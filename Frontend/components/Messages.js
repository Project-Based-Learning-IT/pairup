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
import {useTheme, Portal, ActivityIndicator} from 'react-native-paper';
// import {chats} from '../staticStore';
import {useAuth} from '../App';
import {ChatContext} from './ChatContext';

function Messages() {
  const {user, axiosInstance} = useAuth();
  let {vProfilesInterval, setVProfilesInterval} = useAuth();
  const {
    allChats,
    setAllChats,
    verticalProfiles,
    setVerticalProfiles,
    // storeData,
    // getData,
    // removeItem,
  } = React.useContext(ChatContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation();
  const {colors} = useTheme();

  // const [unreadCounts, setUnreadCounts] = React.useState({});

  const [horizontalProfiles, setHorizontalProfiles] = React.useState([]);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  // console.log('OusideEffect Messages', vProfilesInterval);

  const getMessageProfiles = async () => {
    try {
      let MinlastMessageTimestamp = '2021-10-23 13:59:13';
      if (Object.keys(allChats).length > 0) {
        let lastMsgTimestamps = [];
        Object.values(allChats).forEach(pChatArr => {
          lastMsgTimestamps.push(pChatArr[pChatArr.length - 1].timestamp);
        });
        lastMsgTimestamps.sort((a, b) => Date.parse(a) < Date.parse(b));
        MinlastMessageTimestamp = lastMsgTimestamps[0];
      }
      console.log('VPsTime: ', MinlastMessageTimestamp);

      let res = null;
      while (res === null) {
        await axiosInstance
          .post('/get_last_msgs_with_count_name_photo', {
            //TODO set MinlastMessageTimestamp for DateTime
            // DateTime: '2021-10-26 13:10:38',
            DateTime: MinlastMessageTimestamp,
          })
          .then(response => {
            res = response.data;
          })
          .catch(err => {
            console.error('MessageProfiles Error : ' + err);
          });
        await sleep(2000);
      }

      // let unreads = {};
      // res.map(profile => {
      //   unreads[profile.pid] = profile.newmsgs;
      // });
      if (res.length > 0 && vProfilesInterval._idleTimeout !== -1) {
        await setVerticalProfiles(prevVProfiles => {
          res.map(profile => {
            if (
              prevVProfiles.some(
                p =>
                  p.newmsgs == 0 &&
                  p.pid === profile.pid &&
                  p.Message_ID === profile.Message_ID,
              ) ||
              profile.Sender_ID === user.id
            ) {
              profile.newmsgs = 0;
            }
          });
          return res;
        });
      }
      // console.log('Res: ', res);
      // console.log('VPs: ', verticalProfiles);

      // await setUnreadCounts(unreads);
    } catch (error) {
      console.log(error);
    }
  };

  // let vProfilesInterval;

  React.useEffect(async () => {
    // setIsLoading(true);

    // async function getProfiles() {
    //   try {
    // Loop to fetch 8 horizontal profiles
    // for (let i = 0; i < 8; i++) {
    //   const response = await fetch(
    //     'https://randomuser.me/api/?results=1&inc=name,picture,email,location,phone,cell,dob,login,registered,id,nat&noinfo',
    //   );
    //   const data = await response.json();
    //   setHorizontalProfiles(horizontalProfiles => [
    //     ...horizontalProfiles,
    //     data.results[0],
    //   ]);
    // }

    // console.log(horizontalProfiles);
    // }
    // getProfiles();

    // console.log('Before append: ', allChats);
    await getMessageProfiles();

    // if (Object.keys(allChats).length === 0) {
    //   console.log('Stored chats', getData('chats'));
    //   setAllChats(getData('chats') ? getData('chats') : {});
    //   console.log('Retreved from storage', allChats);
    // }

    //TODO add this after signup and signin
    //Storage not working
    // removeItem('chats');
    // storeData('chats', {1: 2});
    // console.log('Stored chats', getData('chats'));
    // console.log('After append allChats: ', allChats);

    // setIsLoading(false);
  }, []);

  React.useEffect(() => {
    console.log('messages vProfilesInterval', vProfilesInterval);
    if (!vProfilesInterval) {
      vProfilesInterval = setInterval(async () => {
        await getMessageProfiles();
      }, 5000);
      setVProfilesInterval(vProfilesInterval);
    }
    // else if (vProfilesInterval._idleTimeout === -1) {
    else if (vProfilesInterval._idleTimeout === -1) {
      setVProfilesInterval(prevVProfilesInterval => {
        clearInterval(prevVProfilesInterval);
        return prevVProfilesInterval;
      });
    }
  }, [vProfilesInterval]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
      }}>
      {console.log('Messages Rerender')}
      <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      {/* <Text
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
              navigation.navigate('ViewProfileRightSwipedU', {
                card_user: card1,
              });
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
      </ScrollView> */}

      <Text
        style={{
          padding: 10,
          color: colors.primary,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        Messages
      </Text>

      {isLoading ? (
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
      ) : (
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
              onPress={async () => {
                // setUnreadCounts(prevUnreads => {
                //   return {
                //     ...prevUnreads,
                //     [profile.pid]: 0,
                //   };
                // });
                await setVerticalProfiles(prevVProfiles => {
                  prevVProfiles[index] = {
                    ...prevVProfiles[index],
                    newmsgs: 0,
                  };
                  return prevVProfiles;
                });
                navigation.navigate('Chat', {
                  userChatting: profile,
                });
              }}>
              <Image
                source={{
                  uri: profile.Image_URL
                    ? profile.Image_URL
                    : 'https://www.xeus.com/wp-content/uploads/2014/09/One_User_Orange.png',
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
                  {profile.Name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#9b9b9b',
                  }}>
                  {/* {chats[Math.floor(Math.random() * 9)]} */}
                  {profile.text}
                </Text>
              </View>
              {profile.newmsgs >= 1 && (
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
                    {/* {Math.floor(Math.random() * 5) + 1} */}
                    {/* {unreadCounts[profile.pid]} */}
                    {profile.newmsgs}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

export default Messages;
