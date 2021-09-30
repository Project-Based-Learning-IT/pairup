import React from 'react';
import {Text, View} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';

const skills = [
  'Web Development',
  'Java',
  'Python',
  'Machine Learning',
  'AI',
  'MERN',
  'Flutter',
  'Firebase Authentication Database',
];

function SkillSlider() {
  const {colors} = useTheme();

  const [skillIndex, setSkillIndex] = React.useState(0);

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <IconButton
        icon="chevron-left"
        color={'#fff'}
        size={30}
        style={{
          backgroundColor: '#432828',
          elevation: 4,
        }}
        onPress={() => {
          if (skillIndex > 0) {
            setSkillIndex(skillIndex - 1);
          } else {
            setSkillIndex(skills.length - 1);
          }
        }}
      />
      <Text
        // entering={OpacityIn.delay(600).duration(3000)}
        // exiting={OpacityOut.duration(3000)}
        style={{
          flex: 1,
          color: '#fff',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {skills[skillIndex]}
      </Text>
      <IconButton
        icon="chevron-right"
        color={'#fff'}
        size={30}
        style={{
          backgroundColor: '#432828',
          elevation: 4,
        }}
        onPress={() => {
          setSkillIndex((skillIndex + 1) % skills.length);
        }}
      />
    </View>
  );
}

export default SkillSlider;
