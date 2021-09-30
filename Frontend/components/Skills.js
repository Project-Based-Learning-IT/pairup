import React from 'react';
import {
  Chip,
  useTheme,
  IconButton,
  Portal,
  Modal,
  Button,
} from 'react-native-paper';
import {ScrollView, View} from 'react-native';
import NewSection from './NewSection';
import SearchBox from './SearchBox';

function Skills({skillList, skills, setSkills}) {
  const {colors} = useTheme();

  const [visible, setVisible] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const [isDomainCollapsed, setIsDomainCollapsed] = React.useState(
    skillList.map(() => true),
  );

  function getFilteredSkills() {
    const searchterm = searchTerm.toLowerCase();
    const skillArr = skillList.map(domain => {
      return Object.values(domain)
        .flat()
        .filter(it => {
          return (
            typeof it === 'object' &&
            it.skill_name.toLowerCase().includes(searchterm)
          );
        });
    });
    const flatSkills = skillArr.flat();
    const ids = flatSkills.map(it => it.skill_id);
    return flatSkills.filter((it, index) => ids.indexOf(it.skill_id) === index);
  }

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
          <ScrollView>
            <SearchBox
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="skills"
            />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                paddingStart: 4,
                marginTop: 12,
              }}>
              {searchTerm.length > 0 &&
                getFilteredSkills().map((skill, index) => {
                  return (
                    <Chip
                      key={skill.skill_id}
                      onPress={() => {
                        if (skills.some(s => s.skill_id === skill.skill_id)) {
                          setSkills(
                            skills.filter(s => s.skill_id !== skill.skill_id),
                          );
                        } else {
                          setSkills(skills.concat(skill));
                        }
                      }}
                      selected={skills.some(s => s.skill_id === skill.skill_id)}
                      style={{
                        marginEnd: 8,
                        marginBottom: 8,
                      }}>
                      {skill.skill_name}
                    </Chip>
                  );
                })}
            </View>
            {searchTerm.length === 0 &&
              skillList.map((domain, index) => (
                <View key={domain.domain_id}>
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
