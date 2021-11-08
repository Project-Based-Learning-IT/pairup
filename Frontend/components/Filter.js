import React from 'react';
import {
  StatusBar,
  View,
  Animated,
  Dimensions,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {
  IconButton,
  Portal,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import {useAuth} from '../App';
import {leftOptions} from '../staticStore';
import {
  skillList,
  languageList,
  years,
  branches,
  divisions,
  batches,
  socialMedia,
} from '../staticStore';
import FilterSection from './FilterSection';
import SkillSection from './SkillSection';

const {height} = Dimensions.get('window');

function Filter(props) {
  const {close, setFiltered_skills, filtered_skills} = props;

  const {colors} = useTheme();

  const springAnim = React.useRef(new Animated.Value(1000)).current;

  const [selectedLeftIndex, setSelectedLeftIndex] = React.useState(0);

  const [filterSkills, setFilterSkills] = React.useState(filtered_skills);
  const [filterLanguages, setFilterLanguages] = React.useState([]);
  const [filterYears, setFilterYears] = React.useState([]);
  const [filterBranches, setFilterBranches] = React.useState([]);
  const [filterDivisions, setFilterDivisions] = React.useState([]);
  const [filterBatches, setFilterBatches] = React.useState([]);
  const [filterSocialMedia, setFilterSocialMedia] = React.useState([]);

  const [skillsLoading, setSkillsLoading] = React.useState(false);
  const [skills, setSkills] = React.useState([]);

  const {axiosInstance} = useAuth();

  const backAction = React.useCallback(() => {
    Animated.timing(springAnim, {
      toValue: height + 100,
      duration: 256,
      useNativeDriver: true,
    }).start(() => {
      close();
    });
    return true;
  }, [close]);

  React.useEffect(() => {
    const slideIn = () => {
      Animated.spring(springAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    };

    slideIn();
  }, []);

  React.useEffect(() => {
    const getSkills = async () => {
      try {
        setSkillsLoading(true);
        const res = await axiosInstance.get('/get_domains_and_its_skills');
        setSkills(res.data);
        setSkillsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getSkills();
  }, []);

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const handleClose = () => {
    Animated.timing(springAnim, {
      toValue: height + 100,
      duration: 256,
      useNativeDriver: true,
    }).start(() => {
      setFiltered_skills(filterSkills);
      close();
    });
  };

  const styles = StyleSheet.create({
    leftOptions: {
      paddingTop: 24,
      paddingBottom: 24,
      paddingLeft: 4,
      paddingRight: 4,
      backgroundColor: '#f1f3f6',
    },
  });

  return (
    <Portal>
      <Animated.View
        style={{
          position: 'absolute',
          top: StatusBar.currentHeight + 12, // for full screen
          // top: StatusBar.currentHeight + height/10,
          left: 0,
          right: 0,
          bottom: 0,
          borderBottomColor: colors.border,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          overflow: 'hidden',
          backgroundColor: 'white',
          transform: [
            {
              translateY: springAnim,
            },
          ],
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: colors.textLightBlack,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: colors.textHeadBlack,
            }}>
            Filter
          </Text>
          <IconButton
            color={colors.textHeadBlack}
            icon="close-thick"
            onPress={() => {
              close();
            }}
          />
        </View>
        {skillsLoading || skills.length === 0 ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color={colors.secondary} />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <View
            style={{
              flex: 0.3,
            }}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
              }}>
              {leftOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedLeftIndex(index)}
                  style={[
                    styles.leftOptions,
                    index == selectedLeftIndex
                      ? {
                          backgroundColor: 'white',
                        }
                      : {},
                  ]}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      color:
                        index == selectedLeftIndex ? colors.secondary : 'black',
                      fontWeight:
                        index == selectedLeftIndex ? 'bold' : 'normal',
                    }}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View> */}
            <View
              style={{
                // flex: 0.7,
                flex: 1,
                height: '100%',
                padding: 10,
              }}>
              {selectedLeftIndex == 0 && (
                <SkillSection
                  skills={filterSkills}
                  setSkills={setFilterSkills}
                  skillList={skills}
                />
              )}
              {/* {selectedLeftIndex == 1 && <FilterSection
              items={filterLanguages}
              setItems={setFilterLanguages}
              itemList={languageList}
            />}
            {
              selectedLeftIndex == 2 && <FilterSection
                items={filterYears}
                setItems={setFilterYears}
                itemList={years}
              />
            }
            {
              selectedLeftIndex == 3 && <FilterSection
                items={filterBranches}
                setItems={setFilterBranches}
                itemList={branches}
              />
            }
            {
              selectedLeftIndex == 4 && <FilterSection
                items={filterDivisions}
                setItems={setFilterDivisions}
                itemList={divisions}
              />
            }
            {
              selectedLeftIndex == 5 && <FilterSection
                items={filterBatches}
                setItems={setFilterBatches}
                itemList={batches}
              />
            }
            {
              selectedLeftIndex == 6 && <FilterSection
                items={filterSocialMedia}
                setItems={setFilterSocialMedia}
                itemList={socialMedia}
              />
            } */}
            </View>
          </View>
        )}
        <View
          style={{
            width: '100%',
            shadowColor: colors.primary,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 1,
            shadowOpacity: 0.3,
            elevation: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 18,
            paddingLeft: 12,
            paddingRight: 12,
            // backgroundColor: colors.primary,
          }}>
          <View>
            {/* <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.textHeadBlack,
              }}>
              8
            </Text>
            <Text>Students found</Text> */}
            <TouchableHighlight
              underlayColor="#dddddd"
              style={{
                backgroundColor: 'white',
                padding: 10,
                paddingLeft: 36,
                paddingRight: 36,
                borderRadius: 8,
                borderColor: colors.primary,
                borderWidth: 3,
              }}
              onPress={() => {
                setFilterSkills([]);
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: colors.primary,
                }}>
                Reset
              </Text>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight
              style={{
                backgroundColor: colors.primary,
                padding: 10,
                paddingLeft: 36,
                paddingRight: 36,
                borderRadius: 8,
                borderWidth: 3,
              }}
              onPress={handleClose}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: colors.textWhite,
                }}>
                Apply
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Animated.View>
    </Portal>
  );
}

export default Filter;
