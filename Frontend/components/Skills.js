import React from 'react';
import {
  Chip,
  useTheme,
  IconButton,
  Portal,
  Modal,
  Text,
  Button,
} from 'react-native-paper';
import {ScrollView, View} from 'react-native';
import NewSection from './NewSection';

function Skills({skillList, skills, setSkills}) {
  const {colors} = useTheme();

  React.useEffect(() => {
    console.log(skillList);
  }, [skillList]);

  const [visible, setVisible] = React.useState(false);

  const [isDomainCollapsed, setIsDomainCollapsed] = React.useState(
    skillList.map(() => true),
  );

  React.useEffect(() => {
    console.log(isDomainCollapsed);
  }, [isDomainCollapsed]);

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
            borderWidth: index < 3 ? 1 : 0,
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
            {skillList.map((domain, index) => (
              <View key={domain.domain_id}>
                {/* <Text
                  style={{
                    marginBottom: 18,
                  }}>
                  {domain.domain_name}
                </Text> */}
                <NewSection name={domain.domain_name} />
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    paddingStart: 4,
                    paddingBottom: 12,
                  }}>
                  {isDomainCollapsed[index]
                    ? domain.skills.slice(0, 3).map((skill, i) => (
                        <Chip
                          key={i}
                          style={{
                            marginEnd: 8,
                            marginBottom: 8,
                          }}
                          selected={skills.some(
                            s => s.skill_id === skill.skill_id,
                          )}
                          onPress={() => {
                            if (
                              skills.some(s => s.skill_id === skill.skill_id)
                            ) {
                              setSkills(
                                skills.filter(
                                  s => s.skill_id !== skill.skill_id,
                                ),
                              );
                            } else {
                              setSkills(skills.concat(skill));
                            }
                          }}>
                          {skill.skill_name}
                        </Chip>
                      ))
                    : domain.skills.map((skill, i) => (
                        <Chip
                          key={i}
                          style={{
                            marginEnd: 8,
                            marginBottom: 8,
                          }}
                          selected={skills.some(
                            s => s.skill_id === skill.skill_id,
                          )}
                          onPress={() => {
                            if (
                              skills.some(s => s.skill_id === skill.skill_id)
                            ) {
                              setSkills(
                                skills.filter(
                                  s => s.skill_id !== skill.skill_id,
                                ),
                              );
                            } else {
                              setSkills(skills.concat(skill));
                            }
                          }}>
                          {skill.skill_name}
                        </Chip>
                      ))}
                  {isDomainCollapsed[index] ? (
                    <Button
                      onPress={() => {
                        setIsDomainCollapsed(
                          isDomainCollapsed.map((item, i) =>
                            i === index ? !item : item,
                          ),
                        );
                      }}>
                      More Skills
                    </Button>
                  ) : (
                    <Button
                      onPress={() => {
                        setIsDomainCollapsed(
                          isDomainCollapsed.map((item, i) =>
                            i === index ? !item : item,
                          ),
                        );
                      }}>
                      Hide Skills
                    </Button>
                  )}
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
