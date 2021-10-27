import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import {useAuth} from '../App';
import {
  Button,
  TextInput,
  useTheme,
  Portal,
  ActivityIndicator,
  Title,
  IconButton,
  Chip,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownMenu from './DropdownMenu';
import SocialURL from './SocialURL';
import NewSection from './NewSection';

function ViewProfile({route}) {
  const {card_user} = route.params;

  const {axiosInstance} = useAuth();
  const {colors} = useTheme();

  const [cardUserData, setcardUserData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  let bottomOptionLeft = {
    backgroundColor: '#fc454e',
    width: 55,
    height: 55,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 90,
    borderColor: '#efebe9',
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: '#fff',
    padding: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 4,
  };
  const styles = StyleSheet.create({
    bottomOptionLeft: bottomOptionLeft,
    bottomOptionRight: {
      ...bottomOptionLeft,
      left: 90,
    },
  });

  React.useEffect(async () => {
    setIsLoading(true);

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    // console.log(user);
    async function getCardUser() {
      let studData = {};
      while (Object.keys(studData).length === 0) {
        await axiosInstance
          .get('/get_student_profile', {
            //TODO Handle params in API
            params: {
              id: card_user.id,
            },
          })
          .then(response => {
            // console.log(JSON.stringify(response.data));
            studData = response.data;
          })
          .catch(err => {
            console.error('Card_user_profile Error : ' + err);
          });
        await sleep(2000);
      }

      let languagesData;
      while (!languagesData) {
        await axiosInstance
          .get('/get_student_languages', {
            //TODO Handle params in API
            params: {
              id: card_user.id,
            },
          })
          .then(response => {
            // console.log(JSON.stringify(response.data));
            languagesData = response.data;
          })
          .catch(err => {
            console.error('Card_user_languages Error : ' + err);
          });
        await sleep(2000);
      }

      let SocialsData = {};
      while (Object.keys(SocialsData).length === 0) {
        await axiosInstance
          .get('/get_student_profile', {
            //TODO Handle params in API
            params: {
              id: card_user.id,
            },
          })
          .then(response => {
            // console.log(JSON.stringify(response.data));
            SocialsData = response.data;
          })
          .catch(err => {
            console.error('Card_user_profile Error : ' + err);
          });
        await sleep(2000);
      }

      let cardUserData = {
        ...card_user,
        email: studData.Email,
        personalEmail: 'NotinDB',
        bio: studData.Bio,
        SocialURL_ID: studData.SocialURL_ID,
        division: card_user.batch !== '' ? card_user.batch[0] : '',
        twitterUrl: SocialsData.twitter,
        githubUrl: SocialsData.github,
        linkedinUrl: SocialsData.linkedin,
        languages: languagesData.map(lang => {
          return lang.Language_name;
        }),
      };

      //TODO Fetch remaining data for navigations coming from messages with id only
      // if (!cardUserData.skills)
      // Fetch skills and all from get_student_profile route

      setcardUserData(cardUserData);
    }

    // console.log(axiosInstance.defaults.headers['Authorization']);
    await getCardUser();

    setIsLoading(false);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
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
        <>
          <ScrollView
            style={{
              paddingTop: StatusBar.currentHeight,
              width: '100%',
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 36,
                color: colors.primary,
                fontWeight: 'bold',
              }}>
              Profile
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 4,
              }}>
              <View
                style={{
                  backgroundColor: '#F4F4F4',
                  borderRadius: 500,
                  padding: 8,
                }}>
                <Image
                  style={{width: 120, height: 120, borderRadius: 70}}
                  source={{
                    uri: cardUserData.photo
                      ? cardUserData.photo
                      : 'https://www.xeus.com/wp-content/uploads/2014/09/One_User_Orange.png',
                  }}></Image>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 8,
                    padding: 8,
                    backgroundColor: `${colors.secondary}99`,
                    borderRadius: 500,
                  }}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={20}
                    color="#fff"
                  />
                </View>
              </View>
            </View>
            <TextInput
              mode="outlined"
              label="College Email"
              value={cardUserData.email}
              disabled={true}
              style={{
                paddingTop: 16,
                paddingBottom: 20,
              }}
            />
            <TextInput
              mode="outlined"
              label="First Name"
              placeholder="Type your first name"
              value={cardUserData.name}
              style={{
                paddingBottom: 20,
              }}
              disabled={true}
            />
            <TextInput
              mode="outlined"
              label="Branch"
              placeholder="Branch"
              value={cardUserData.branch}
              style={{
                paddingBottom: 20,
              }}
              disabled={true}
            />
            <TextInput
              mode="outlined"
              label="Year"
              placeholder="Year"
              value={cardUserData.year.toString()}
              style={{
                paddingBottom: 20,
              }}
              disabled={true}
            />
            <TextInput
              mode="outlined"
              label="Division"
              placeholder="Division"
              value={cardUserData.division}
              style={{
                paddingBottom: 20,
              }}
              disabled={true}
            />
            <TextInput
              mode="outlined"
              label="Batch"
              placeholder="Batch"
              value={cardUserData.batch}
              style={{
                paddingBottom: 20,
              }}
              disabled={true}
            />
            <TextInput
              mode="outlined"
              label="Personal Email (Optional)"
              placeholder="Type your personal email"
              value={cardUserData.personalEmail}
              onChangeText={text => setPersonalEmail(text)}
              style={{
                paddingBottom: 20,
              }}
              disabled={true}
            />
            <TextInput
              mode="outlined"
              label="Headline"
              placeholder="Type your headline"
              value={cardUserData.headline}
              onChangeText={text => setHeadline(text)}
              style={{
                paddingBottom: 20,
              }}
              multiline={true}
              disabled={true}
            />
            <TextInput
              mode="outlined"
              label="Bio"
              placeholder="Type your bio"
              value={cardUserData.bio}
              onChangeText={text => setBio(text)}
              style={{
                paddingBottom: 20,
              }}
              multiline={true}
              disabled={true}
            />

            <TextInput
              mode="outlined"
              label="Requirements"
              placeholder="Type your Requirements"
              value={cardUserData.requirements}
              onChangeText={text => setRequirements(text)}
              style={{
                paddingBottom: 20,
              }}
              multiline={true}
              disabled={true}
            />

            {/* // NOTE Skills */}
            <NewSection name="Skills" />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                paddingStart: 4,
                paddingBottom: 12,
                alignItems: 'center',
              }}>
              {cardUserData.skills.map((skill, index) => (
                <Chip
                  key={index}
                  style={{
                    marginEnd: 8,
                    marginBottom: 8,
                    borderWidth: index < 3 ? 2 : 0,
                    borderColor: colors.primary,
                  }}>
                  {skill.skill_name}
                </Chip>
              ))}
            </View>
            <NewSection name="Languages" />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                paddingStart: 4,
                paddingBottom: 12,
                alignItems: 'center',
              }}>
              {cardUserData.languages.map((language, index) => (
                <Chip
                  key={index}
                  style={{
                    marginEnd: 8,
                    marginBottom: 8,
                    borderWidth: index < 3 ? 2 : 0,
                    borderColor: colors.primary,
                  }}>
                  {language}
                </Chip>
              ))}
            </View>

            {/* // NOTE Social URLs */}
            <NewSection name="Social URLs" />
            <SocialURL
              label="Linkedin"
              value={cardUserData.linkedin}
              onChangeText={text => setLinkedinUrl(text)}
              logoName="linkedin"
              RouteName={route.name}></SocialURL>
            <SocialURL
              label="Twitter"
              value={cardUserData.twitter}
              onChangeText={text => setTwitterUrl(text)}
              logoName="twitter"
              RouteName={route.name}></SocialURL>
            <SocialURL
              label="GitHub"
              value={cardUserData.github}
              onChangeText={text => setGithubUrl(text)}
              logoName="github"
              RouteName={route.name}></SocialURL>
            {/* For bottom margin */}
            <View
              style={{
                height: 80,
              }}></View>
          </ScrollView>

          {/* <View style={styles.bottomOptionsContainer}> */}
          <TouchableOpacity
            style={styles.bottomOptionRight}
            onPress={() => {
              // swiperRef.current.swipeLeft();
            }}>
            <MaterialCommunityIcons name="close-thick" size={36} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomOptionLeft}
            onPress={() => {
              // swiperRef.current.swipeRight();
            }}>
            <MaterialCommunityIcons
              name="check-bold"
              size={36}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </>
      )}
      {/* </View> */}
    </View>
  );
}

export default ViewProfile;
