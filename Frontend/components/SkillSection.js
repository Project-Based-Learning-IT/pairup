import React from 'react';
import {Chip, Button} from 'react-native-paper';
import {ScrollView, View} from 'react-native';
import NewSection from './NewSection';
import SearchBox from './SearchBox';

function SkillSection(props) {
  const {skills, setSkills, skillList} = props;

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
    //can simply return flatSkills right?
    const ids = flatSkills.map(it => it.skill_id);
    return flatSkills.filter((it, index) => ids.indexOf(it.skill_id) === index);
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
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
        {searchTerm.length > 0 ? (
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
          })
        ) : (
          <View
            style={{
              width: '100%',
            }}>
            {skills.length > 0 && <NewSection name="Selected Skills" />}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                paddingStart: 4,
                paddingBottom: 8,
              }}>
              {skills.map((skill, index) => {
                return (
                  <Chip
                    key={index}
                    onPress={() => {
                      const newSkills = skills.filter(
                        it => it.skill_id !== skill.skill_id,
                      );
                      setSkills(newSkills);
                    }}
                    style={{margin: 4}}
                    icon="close-circle-outline">
                    {skill.skill_name}
                  </Chip>
                );
              })}
            </View>
          </View>
        )}
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
                      selected={skills.some(s => s.skill_id === skill.skill_id)}
                      onPress={() => {
                        if (skills.some(s => s.skill_id === skill.skill_id)) {
                          setSkills(
                            skills.filter(s => s.skill_id !== skill.skill_id),
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
                      selected={skills.some(s => s.skill_id === skill.skill_id)}
                      onPress={() => {
                        if (skills.some(s => s.skill_id === skill.skill_id)) {
                          setSkills(
                            skills.filter(s => s.skill_id !== skill.skill_id),
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
  );
}

export default SkillSection;
