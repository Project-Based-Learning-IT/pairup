import React from 'react';
import {
  Chip,
  useTheme,
  IconButton,
  Portal,
  Modal,
  Button,
} from 'react-native-paper';
import {View} from 'react-native';
import SkillSection from './SkillSection';

function Skills({skillList, skills, setSkills}) {
  const {colors} = useTheme();

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingStart: 4,
        paddingBottom: 12,
        alignItems: 'center',
      }}>
      {skills.map((skill, index) => (
        <Chip
          key={index}
          style={{
            marginEnd: 8,
            marginBottom: 8,
            borderWidth: index < 3 ? 2 : 0,
            borderColor: colors.primary,
          }}
          icon="close-circle-outline"
          onPress={() =>
            setSkills(
              skills.filter(item => item.skill_id !== skills[index].skill_id),
            )
          }>
          {skill.skill_name}
        </Chip>
      ))}
      {skills.length > 0 ? (
        <IconButton
          icon="plus"
          color={'#fff'}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 50,
          }}
          size={20}
          onPress={() => showModal(true)}
        />
      ) : (
        <Button color={colors.secondary} onPress={() => showModal(true)}>
          Add skills
        </Button>
      )}
      <Portal>
        <Modal
          style={{
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
          }}
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <SkillSection
            skills={skills}
            setSkills={setSkills}
            skillList={skillList}
          />
        </Modal>
      </Portal>
    </View>
  );
}

export default Skills;
