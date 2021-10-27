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
  // languageList,
  // skillList,
  years,
  divisions,
  batches,
} from '../staticStore';
import * as Keychain from 'react-native-keychain';

function MyProfile({route}) {
  const {setUser, signOut, user, axiosInstance, setaxiosInstance} = useAuth();
  const {colors} = useTheme();

  const [isSaving, setIsSaving] = React.useState(false);
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const [email, setEmail] = React.useState(user.email);
  const [name, setName] = React.useState(user.name);
  const [personalEmail, setPersonalEmail] = React.useState(user.personalEmail);
  const [bio, setBio] = React.useState(user.bio);
  const [requirements, setRequirements] = React.useState('user.Requirements');
  const [headline, setHeadline] = React.useState(user.headline);

  const [division, setDivision] = React.useState(user.division);
  const [branch, setBranch] = React.useState(user.branch);
  const [year, setYear] = React.useState(user.year);
  const [batch, setBatch] = React.useState(user.batch);

  const [twitterUrl, setTwitterUrl] = React.useState(user.twitterUrl);
  const [githubUrl, setGithubUrl] = React.useState(user.githubUrl);
  const [linkedinUrl, setLinkedinUrl] = React.useState(user.linkedinUrl);

  const [skills, setSkills] = React.useState(user.skills);
  const [skillsList, setskillsList] = React.useState([]);

  // TODO: add projects
  const [languages, setLanguages] = React.useState(user.languages);
  const [languageList, setlanguageList] = React.useState([]);

  const saveProfile = async () => {
    try {
      setIsSaving(true);

      // without languages and projects
      let userData = {
        googleId: user.googleId,
        photo: user.photo,
        email: user.email,
        name: user.name,
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
        languages: languages,
        access_token:
          axiosInstance.defaults.headers['Authorization'].split(' ')[1],
      };

      let retries = 5;

      let res_degree_id;
      while (!res_degree_id && retries--) {
        res_degree_id = await axiosInstance
          .post('/update_degree', {
            branch: branch,
            year: parseInt(year != '' ? year : -1),
            batch: batch,
          })
          .catch(err => {
            console.error('Degree_update Error : ' + err);
          });
      }

      userData.Degree_ID = parseInt(res_degree_id.data);

      retries = 5;

      let res_social_id;
      while (!res_social_id && retries--) {
        res_social_id = await axiosInstance
          .post('/update_social_urls', {
            codechef: '',
            hackerrank: '',
            leetcode: '',
            linkedin: linkedinUrl,
            github: githubUrl,
            twitter: twitterUrl,
          })
          .catch(err => {
            console.error('Social_update Error : ' + err);
          });
      }

      userData.SocialURL_ID = parseInt(res_social_id.data);

      retries = 5;
      let res_add_skills;
      let skills_ids = skills.map(skill => {
        return parseInt(skill.skill_id);
      });
      while (!res_add_skills && retries--) {
        res_add_skills = await axiosInstance
          .post('/update_student_skills', {
            Skills: skills_ids,
          })
          .catch(err => {
            console.error('Skill_update Error : ' + err);
          });
      }

      let added_proficiencies = {};
      languages.map(lang => {
        added_proficiencies[lang] = 'Not set';
      });

      retries = 5;
      let res_add_languages;
      while (!res_add_languages && retries--) {
        res_add_languages = await axiosInstance
          .post('/update_student_languages', added_proficiencies)
          .catch(err => {
            console.error('Languages_update Error : ' + err);
          });
      }

      retries = 5;
      let res_profile_update;

      while (!res_profile_update && retries--) {
        res_profile_update = await axiosInstance
          .post('/update_student_profile', {
            Bio: userData.bio,
            Email: userData.email,
            Headline: userData.headline,
            Google_ID: userData.googleId,
            Image_URL: '',
            Name: userData.name,
            Requirements: '',
            SocialURL_ID: userData.SocialURL_ID,
            Degree_ID: userData.Degree_ID,
          })
          .catch(err => {
            console.error('Profile_Update Error : ' + err);
          });
      }
      axiosInstance.defaults.headers['Authorization'] =
        'Bearer ' + userData.access_token;

      setaxiosInstance({axiosInstance});
      await Keychain.setGenericPassword('user', JSON.stringify(userData));
      setUser(userData);
      setIsSaving(false);
    } catch (e) {
      setIsSaving(false);
      console.log(e);
    }
  };

  React.useEffect(async () => {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    // console.log(user);
    async function getDBskills() {
      let res = [];
      while (res.length === 0) {
        await axiosInstance
          .get('/get_domains_and_its_skills')
          .then(response => {
            // console.log(JSON.stringify(response.data));
            res = response.data;
          })
          .catch(err => {
            console.error('SkillsList Error : ' + err);
          });
        await sleep(2000);
      }
      setskillsList(res);
    }

    async function getDBlanguages() {
      let res = [];
      while (res.length === 0) {
        await axiosInstance
          .get('/get_all_languages')
          .then(response => {
            // console.log(JSON.stringify(response.data));
            res = response.data;
          })
          .catch(err => {
            console.error('languageList Error : ' + err);
          });
        await sleep(2000);
      }
      setlanguageList(res);
    }
    // console.log(axiosInstance.defaults.headers['Authorization']);
    setIsSaving(true);
    await getDBskills();
    await getDBlanguages();
    setIsSaving(false);
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
          padding: 12,
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

        <TextInput
          mode="outlined"
          label="Requirements"
          placeholder="Type your Requirements"
          value={requirements}
          onChangeText={text => setRequirements(text)}
          style={{
            paddingBottom: 20,
          }}
          multiline={true}
          right={<TextInput.Affix text={`${requirements.length}/200`} />}
        />

        <NewSection name="Skills" />
        <Skills skillList={skillsList} skills={skills} setSkills={setSkills} />

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
          logoName="twitter"
          RouteName={route.name}></SocialURL>
        <SocialURL
          label="GitHub"
          value={githubUrl}
          onChangeText={text => setGithubUrl(text)}
          logoName="github"
          RouteName={route.name}></SocialURL>
        <SocialURL
          label="Linkedin"
          value={linkedinUrl}
          onChangeText={text => setLinkedinUrl(text)}
          logoName="linkedin"
          RouteName={route.name}></SocialURL>

        {/* For bottom margin */}
        <View
          style={{
            height: 20,
          }}></View>

        <TouchableHighlight
          style={{
            backgroundColor: colors.primary,
            padding: 16,
            borderRadius: 14,
            width: '96%',
            // margin: 12,
            marginBottom: 12,
            alignSelf: 'center',
          }}
          onPress={() => {
            saveProfile();
          }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
            }}>
            Save
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{
            backgroundColor: colors.primary,
            padding: 16,
            borderRadius: 14,
            width: '96%',
            // margin: 12,
            marginBottom: 12,
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
        </TouchableHighlight>

        {/* For bottom margin */}
        <View
          style={{
            height: 40,
          }}></View>
      </ScrollView>
    </View>
  );
}

export default MyProfile;
