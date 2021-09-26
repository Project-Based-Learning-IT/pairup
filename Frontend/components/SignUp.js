import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useAuth} from '../App';
import {TextInput, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownMenu from './DropdownMenu';
import SocialURL from './SocialURL';
import NewSection from './NewSection';
import Skills from './Skills';

// {"email": "siddhesh.21910416@viit.ac.in",
// "familyName": "Kothadi",
// "givenName": "Siddhesh",
// "id": "104561333993171170591",
// "name": "Siddhesh Kothadi",
// "photo": "https://lh3.googleusercontent.com/a-/AOh14GhOuSkSfOfSEnx5ERiQON1LmGZx1jkHXZDkbv6nBg"}

const branches = [
  'Computer Science',
  'Information Technology',
  'Electronics and Telecommunication',
  'Mechanical',
  'Civil',
  'AI-DS',
];

const skillList = [
  {
    id: 1,
    domain: '1',
    name: 'React',
  },
  {
    id: 2,
    domain: '1',
    name: 'React Native',
  },
  {
    id: 3,
    domain: '1',
    name: 'Node.js',
  },
  {
    id: 4,
    domain: '1',
    name: 'Express',
  },
  {
    id: 5,
    domain: '1',
    name: 'MongoDB',
  },
  {
    id: 6,
    domain: '1',
    name: 'Mongoose',
  },
  {
    id: 7,
    domain: '1',
    name: 'GraphQL',
  },
  {
    id: 8,
    domain: '2',
    name: 'Apollo',
  },
  {
    id: 9,
    domain: '2',
    name: 'Next.js',
  },
  {
    id: 10,
    domain: '2',
    name: 'Gatsby',
  },
  {
    id: 11,
    domain: '2',
    name: 'Firebase',
  },
  {
    id: 12,
    domain: '2',
    name: 'Firestore',
  },
  {
    id: 13,
    domain: '2',
    name: 'Firebase Auth',
  },
  {
    id: 14,
    domain: '3',
    name: 'Firebase Storage',
  },
  {
    id: 15,
    domain: '3',
    name: 'Firebase Cloud Functions',
  },
];

const years = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];

const divisions = ['A', 'B', 'C', 'D'];

const batches = [
  'A-1',
  'A-2',
  'A-3',
  'A-4',
  'B-1',
  'B-2',
  'B-3',
  'B-4',
  'C-1',
  'C-2',
  'C-3',
  'C-4',
  'D-1',
  'D-2',
  'D-3',
  'D-4',
];

function SignUp({route}) {
  const {user} = route.params;

  const {setUser, setIsSignedIn} = useAuth();
  const {colors} = useTheme();

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

  const signUp = () => {
    console.log('SignUp');
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
              style={{width: 120, height: 120, borderRadius: 70}}
              source={{
                uri: user.photo,
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
          label="First Name"
          placeholder="Type your first name"
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
      <TouchableOpacity style={styles.signUpButton}>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignUp;
