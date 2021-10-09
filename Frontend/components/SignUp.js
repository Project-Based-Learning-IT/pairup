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
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownMenu from './DropdownMenu';
import SocialURL from './SocialURL';
import NewSection from './NewSection';
import Skills from './Skills';
import * as Keychain from 'react-native-keychain';
import { branches, languageList, skillList, years, divisions, batches } from '../staticStore';

function SignUp({route}) {
  const {user} = route.params;

  const {setUser, setIsSignedIn} = useAuth();
  const {colors} = useTheme();

  const [isSigningUp, setIsSigningUp] = React.useState(false);

  const [email, setEmail] = React.useState(user.email);
  const [name, setName] = React.useState(user.name);
  const [personalEmail, setPersonalEmail] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [headline, setHeadline] = React.useState('');

  const [division, setDivision] = React.useState('');
  const [branch, setBranch] = React.useState('');
  const [year, setYear] = React.useState('');
  const [batch, setBatch] = React.useState('');

  const [twitterUrl, setTwitterUrl] = React.useState('');
  const [githubUrl, setGithubUrl] = React.useState('');
  const [linkedinUrl, setLinkedinUrl] = React.useState('');

  const [skills, setSkills] = React.useState([]);

  // TODO: add languages and projects
  const [languages, setLanguages] = React.useState([]);

  const styles = StyleSheet.create({
    signUpButton: {
      position: 'absolute',
      marginStart: 12,
      marginEnd: 12,
      bottom: 0,
      backgroundColor: colors.primary,
      width: '100%',
      padding: 16,
      paddingEnd: 24,
      paddingStart: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 8,
    },
  });

  const signUp = async () => {
    try {
      setIsSigningUp(true);

      // without languages and projects
      const userData = {
        googleId: user.id,
        photo: user.photo,
        email: email,
        name: name,
        personalEmail: personalEmail,
        bio: bio,
        headline: headline,
        division: division,
        branch: branch,
        year: year,
        batch: batch,
        twitterUrl: twitterUrl,
        githubUrl: githubUrl,
        linkedinUrl: linkedinUrl,
        skills: skills,
      };

      await Keychain.setGenericPassword('user', JSON.stringify(userData));
      setUser(userData);
      setIsSigningUp(false);

      setIsSignedIn(true);
    } catch (e) {
      setIsSigningUp(false);
      console.log(e);
    }
  };

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      {isSigningUp && (
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
            <ActivityIndicator size={'large'} color={'white'} />
          </View>
        </Portal>
      )}
      <ScrollView
        style={{
          width: '100%',
          padding: 12,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 12,
          }}>
          <View
            style={{backgroundColor: '#F4F4F4', borderRadius: 500, padding: 8}}>
            <Image
              style={{width: 120, height: 120, borderRadius: 70, resizeMode: 'contain'}}
              source={{
                uri: user.photo ? user.photo : 'https://www.xeus.com/wp-content/uploads/2014/09/One_User_Orange.png',
              }}></Image>
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                right: 8,
                padding: 8,
                backgroundColor: '#587CF499',
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
          label="Name"
          placeholder="Type your name"
          value={name}
          onChangeText={text => setName(text)}
          style={{
            paddingBottom: 20,
          }}
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
        />

        <NewSection name="Skills" />
        <Skills skillList={skillList} skills={skills} setSkills={setSkills} />

        <NewSection name="Languages" />
        <View>
        {languages.map((language, index) => (
            <DropdownMenu
              key={index}
              items={languageList.filter(  
                lang => !languages.includes(lang)
              )}
              onChange={item => {
                setLanguages(
                  languages
                  .map(lang => {
                    if (lang == language) {
                      return item;
                    }
                    return lang;
                  })
                );
              }}
              value={language}
              placeholder="Select your language"
              label="Language"
              removeFunction={() => {
                setLanguages(languages.filter(lang => lang != language))
              }}
            >
            </DropdownMenu>
          ))}
          <Button
            color={colors.secondary}
            onPress={() => {
              setLanguages(languages.concat(''))
            }}
          >Add Language</Button>
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
        <View
          style={{
            height: 120,
          }}></View>
      </ScrollView>
      <TouchableHighlight style={styles.signUpButton}>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          }}
          onPress={signUp}>
          Sign Up
        </Text>
      </TouchableHighlight>
    </View>
  );
}

export default SignUp;
