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

function ViewProfile(props) {
  // const {user} = props.route.params;
  const {setUser, signOut, user} = useAuth();
  const {colors} = useTheme();

  const [isSaving, setIsSigningUp] = React.useState(false);
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const [email, setEmail] = React.useState(user.email);
  const [name, setName] = React.useState(user.name);
  const [personalEmail, setPersonalEmail] = React.useState(user.personalEmail);
  const [bio, setBio] = React.useState(user.bio);
  const [headline, setHeadline] = React.useState(user.headline);

  const [division, setDivision] = React.useState(user.division);
  const [branch, setBranch] = React.useState(user.branch);
  const [year, setYear] = React.useState(user.year);
  const [batch, setBatch] = React.useState(user.batch);

  const [twitterUrl, setTwitterUrl] = React.useState(user.twitterUrl);
  const [githubUrl, setGithubUrl] = React.useState(user.githubUrl);
  const [linkedinUrl, setLinkedinUrl] = React.useState(user.linkedinUrl);

  const [skills, setSkills] = React.useState(user.skills);

  // TODO: add languages and projects
  const [languages, setLanguages] = React.useState([]);

  const styles = StyleSheet.create({
    bottomOptionsContainer: {
      width: '100%',
      padding: 9,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: 'transparent',
    },

    bottomOption: {
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
      {(isSaving || isSigningOut) && (
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
      )}
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
          value={email}
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
          value={name}
          onChangeText={text => setName(text)}
          style={{
            paddingBottom: 20,
          }}
          disabled={true}
        />
        <DropdownMenu
          items={branches}
          onChange={item => setBranch(item)}
          value={branch}
          placeholder="Select your branch"
          label="Branch"></DropdownMenu>
        <DropdownMenu
          items={years}
          onChange={item => setYear(item)}
          value={year}
          placeholder="Select your year"
          label="Year"></DropdownMenu>
        <DropdownMenu
          items={divisions}
          onChange={item => setDivision(item)}
          value={division}
          placeholder="Select your division"
          label="Division"></DropdownMenu>
        <DropdownMenu
          items={
            division == ''
              ? batches
              : batches.filter(batch => batch.startsWith(division))
          }
          onChange={item => setBatch(item)}
          value={batch}
          placeholder="Select your batch"
          label="Batch"></DropdownMenu>
        <TextInput
          mode="outlined"
          label="Personal Email (Optional)"
          placeholder="Type your personal email"
          value={personalEmail}
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
          value={headline}
          onChangeText={text => setHeadline(text)}
          style={{
            paddingBottom: 20,
          }}
          multiline={true}
          right={<TextInput.Affix text={`${headline.length}/50`} />}
          disabled={true}
        />
        <TextInput
          mode="outlined"
          label="Bio"
          placeholder="Type your bio"
          value={bio}
          onChangeText={text => setBio(text)}
          style={{
            paddingBottom: 20,
          }}
          multiline={true}
          right={<TextInput.Affix text={`${bio.length}/200`} />}
          disabled={true}
        />

        <NewSection name="Skills" />
        <Skills skillList={skillList} skills={skills} setSkills={setSkills} />

        <NewSection name="Languages" />
        <View>
          {languages.map((language, index) => (
            <DropdownMenu
              key={index}
              items={languageList.filter(lang => !languages.includes(lang))}
              onChange={item => {
                setLanguages(
                  languages.map(lang => {
                    if (lang == language) {
                      return item;
                    }
                    return lang;
                  }),
                );
              }}
              value={language}
              placeholder="Select your language"
              label="Language"
              removeFunction={() => {
                setLanguages(languages.filter(lang => lang != language));
              }}></DropdownMenu>
          ))}
          <Button
            color={colors.secondary}
            onPress={() => {
              setLanguages(languages.concat(''));
            }}>
            Add Language
          </Button>
        </View>

        {/* Social URLs */}
        <NewSection name="Social URLs" />
        <SocialURL
          label="Twitter"
          value={twitterUrl}
          onChangeText={text => setTwitterUrl(text)}
          logoName="twitter"></SocialURL>
        <SocialURL
          label="GitHub"
          value={githubUrl}
          onChangeText={text => setGithubUrl(text)}
          logoName="github"></SocialURL>
        <SocialURL
          label="Linkedin"
          value={linkedinUrl}
          onChangeText={text => setLinkedinUrl(text)}
          logoName="linkedin"></SocialURL>

        {/* For bottom margin */}
        {/* <View
          style={{
            height: 40,
          }}></View>
        <TouchableHighlight
          style={{
            backgroundColor: colors.primary,
            padding: 16,
            borderRadius: 14,
            width: '96%',
            // margin: 12,
            marginBottom: 24,
            alignSelf: 'center',
          }}
          onPress={() => {
            signOut();
          }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
            }}>
            Sign Out
          </Text>
        </TouchableHighlight> */}

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
