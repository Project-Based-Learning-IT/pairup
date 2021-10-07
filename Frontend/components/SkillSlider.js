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
        size={30}
        style={{
          backgroundColor: '#fafafa',
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
        style={{
          flex: 1,
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {skills[skillIndex]}
      </Text>
      <IconButton
        icon="chevron-right"
        size={30}
        style={{
          backgroundColor: '#fafafa',
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
