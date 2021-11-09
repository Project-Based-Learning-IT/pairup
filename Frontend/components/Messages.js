import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import {useTheme, Portal, ActivityIndicator} from 'react-native-paper';
// import {chats} from '../staticStore';
import {useAuth} from '../App';
import {ChatContext} from './ChatContext';
import {defaultProfilePic} from '../staticStore';

function Messages() {
  const {user, axiosInstance, verticalProfiles, setVerticalProfiles} =
    useAuth();
  // let {vProfilesInterval, setVProfilesInterval} = useAuth();
  const {vProfilesInterval, setVProfilesInterval} = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getMessageProfiles();
    await sleep(2000).then(() => setRefreshing(false));
  }, []);
  const {
    allChats,
    setAllChats,
    // verticalProfiles,
    // setVerticalProfiles,
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

      // let res = null;
      // while (res === null) {
      //   await axiosInstance
      //     .post('/get_last_msgs_with_count_name_photo', {
      //       //TODO set MinlastMessageTimestamp for DateTime
      //       // DateTime: '2021-10-26 13:10:38',
      //       DateTime: MinlastMessageTimestamp,
      //     })
      //     .then(response => {
      //       res = response.data;
      //     })
      //     .catch(err => {
      //       console.error('MessageProfiles Error : ' + err);
      //     });
      //   await sleep(2000);
      // }
      const response = await axiosInstance.post(
        '/get_last_msgs_with_count_name_photo',
        {
          // DateTime: '2021-10-26 13:10:38',
          DateTime: MinlastMessageTimestamp,
        },
      );
      const res = response.data;

      // let unreads = {};
      // res.map(profile => {
      //   unreads[profile.pid] = profile.newmsgs;
      // });
      // if (res.length > 0 && vProfilesInterval._idleTimeout !== -1) {
      if (res.length > 0) {
        await setVerticalProfiles(prevVProfiles => {
          let vPs = [],
            hPs = [];
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
            if (
              profile.text === `Right Swiped ${user.id}` &&
              profile.Sender_ID !== user.id
            ) {
              hPs.push(profile);
            } else if (!profile.text.startsWith('Right Swiped')) {
              vPs.push(profile);
            }
          });
          setHorizontalProfiles(hPs);
          return vPs;
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

  React.useEffect(() => {
    // setIsLoading(true);

    // console.log('Before append: ', allChats);
    const init = async () => {
      await getMessageProfiles();
    };

    init();

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

  // React.useEffect(() => {
  //   const init = async () => {
  //     console.log('messages vProfilesInterval', vProfilesInterval);
  //     if (!vProfilesInterval) {
  //       vProfilesInterval = setInterval(async () => {
  //         await getMessageProfiles();
  //       }, 15000);
  //       setVProfilesInterval(vProfilesInterval);
  //     }
  //     // else if (vProfilesInterval._idleTimeout === -1) {
  //     else if (vProfilesInterval._idleTimeout === -1) {
  //       await setVProfilesInterval(prevVProfilesInterval => {
  //         clearInterval(prevVProfilesInterval);
  //         return prevVProfilesInterval;
  //       });
  //     }
  //   };
  //   init();
  // }, [vProfilesInterval]);

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
              navigation.navigate('ViewProfileRightSwipedU', {
                card_user: {id: profile.pid, name: profile.Name},
                swiperRef: -2,
                setHorizontalProfiles: setHorizontalProfiles,
              });
            }}>
            <Image
              source={{
                uri:
                  profile.Image_URL && profile.Image_URL !== 'None'
                    ? profile.Image_URL
                    : defaultProfilePic,
              }}
              style={{
                width: 64,
                height: 64,
                marginBottom: 2,
                borderRadius: 50,
              }}
            />
            {/* {index < 2 && ( */}
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
            {/* )} */}
            <Text
              style={{
                textAlign: 'center',
                fontSize: 11,
                color: colors.textLightBlack,
              }}>
              {profile.Name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text
          style={{
            padding: 10,
            color: colors.primary,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Messages
        </Text>
        <Text
          style={{
            padding: 10,
            color: colors.textLightBlack,
            fontSize: 15,
            fontWeight: 'bold',
            alignSelf: 'flex-end',
            marginLeft: 130,
          }}>
          Pull to refresh
        </Text>
      </View>

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
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {verticalProfiles?.length === 0 && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginTop: 50,
                  fontSize: 20,
                  color: colors.textLightBlack,
                }}>
                No messages yet
              </Text>
            </View>
          )}
          {verticalProfiles?.map((profile, index) => (
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
                  uri:
                    profile.Image_URL && profile.Image_URL !== 'None'
                      ? profile.Image_URL
                      : defaultProfilePic,
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
