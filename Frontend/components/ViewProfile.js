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
import Skills from './Skills';
import {
  branches,
  languageList,
  skillList,
  years,
  divisions,
  batches,
} from '../staticStore';

function ViewProfile({route}) {
  const {user} = route.params;
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    bottomOptionLeft: {
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
    },
    bottomOptionRight: {
      backgroundColor: '#fc454e',
      width: 55,
      height: 55,
      borderRadius: 33,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 10,
      left: 90,
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
    },
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
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
            style={{backgroundColor: '#F4F4F4', borderRadius: 500, padding: 8}}>
            <Image
              style={{width: 120, height: 120, borderRadius: 70}}
              source={{
                uri: user.photo
                  ? user.photo
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
              <MaterialCommunityIcons name="camera" size={20} color="#fff" />
            </View>
          </View>
        </View>
        <TextInput
          mode="outlined"
          label="College Email"
          value={user.email}
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
          value={user.name}
          style={{
            paddingBottom: 20,
          }}
          disabled={true}
        />
        <TextInput
          mode="outlined"
          label="Branch"
          placeholder="Branch"
          value={user.branch}
          style={{
            paddingBottom: 20,
          }}
          disabled={true}
        />
        <TextInput
          mode="outlined"
          label="Year"
          placeholder="Year"
          value={user.year}
          style={{
            paddingBottom: 20,
          }}
          disabled={true}
        />
        <TextInput
          mode="outlined"
          label="Division"
          placeholder="Division"
          value={user.division}
          style={{
            paddingBottom: 20,
          }}
          disabled={true}
        />
        <TextInput
          mode="outlined"
          label="Batch"
          placeholder="Batch"
          value={user.batch}
          style={{
            paddingBottom: 20,
          }}
          disabled={true}
        />
        <TextInput
          mode="outlined"
          label="Personal Email (Optional)"
          placeholder="Type your personal email"
          value={user.personalEmail}
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
          value={user.headline}
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
          value={user.bio}
          onChangeText={text => setBio(text)}
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
          {user.skills.map((skill, index) => (
            <Chip
              key={index}
              style={{
                marginEnd: 8,
                marginBottom: 8,
                borderWidth: index < 3 ? 2 : 0,
                borderColor: colors.primary,
              }}>
              {skill}
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
          {user.languages.map((language, index) => (
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
          value={user.links.linkedin}
          onChangeText={text => setLinkedinUrl(text)}
          logoName="linkedin"
          RouteName={route.name}></SocialURL>
        <SocialURL
          label="Twitter"
          value={user.links.twitter}
          onChangeText={text => setTwitterUrl(text)}
          logoName="twitter"
          RouteName={route.name}></SocialURL>
        <SocialURL
          label="GitHub"
          value={user.links.github}
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
      {/* </View> */}
    </View>
  );
}

export default ViewProfile;
