import React from 'react';
import {
  Chip,
  useTheme,
  IconButton,
  Portal,
  Modal,
  Text,
} from 'react-native-paper';
import {ScrollView, View} from 'react-native';

const domains = ['1', '2', '3'];

function Skills({skillList, skills, setSkills}) {
  const {colors} = useTheme();

  React.useEffect(() => {
    console.log(skillList);
  }, [skillList]);

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
      }}>
      {skills.map((skill, index) => (
        <Chip
          key={index}
          style={{
            marginEnd: 8,
            marginBottom: 8,
          }}
          icon="close-circle-outline"
          onPress={() => setSkills(skills.filter((item, i) => i !== index))}>
          {skill.name}
        </Chip>
      ))}
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
      <Portal>
        <Modal
          style={{
            padding: 40,
            paddingLeft: 20,
            paddingRight: 20,
          }}
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <ScrollView>
            {domains.map((domain, index) => (
              <View key={index}>
                <Text
                  style={{
                    marginBottom: 18,
                  }}>
                  {'Domain ' + domain}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    paddingStart: 4,
                    paddingBottom: 12,
                  }}>
                  {skillList
                    .filter(skill => skill.domain === domain)
                    .map((skill, i) => (
                      <Chip
                        key={i}
                        style={{
                          marginEnd: 8,
                          marginBottom: 8,
                        }}
                        selected={skills.some(s => s.name === skill.name)}
                        onPress={() => {
                          if (skills.some(s => s.name === skill.name)) {
                            setSkills(
                              skills.filter(s => s.name !== skill.name),
                            );
                          } else {
                            setSkills(skills.concat(skill));
                          }
                        }}>
                        {skill.name}
                      </Chip>
                    ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
}

export default Skills;
