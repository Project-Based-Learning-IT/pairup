import React from 'react';
import {Text, View, Animated} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';

function SkillSlider(props) {
  const {colors} = useTheme();

  const {skills} = props;

  const [skillIndex, setSkillIndex] = React.useState(0);

  const slideAnimation = React.useRef(new Animated.Value(0)).current;

  const slideLeft = () => {
    slideAnimation.setValue(0);
    Animated.timing(slideAnimation, {
      toValue: -500,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      if (skillIndex > 0) {
        setSkillIndex(skillIndex - 1);
      } else {
        setSkillIndex(skills.length - 1);
      }
      slideAnimation.setValue(200);
      Animated.spring(slideAnimation, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }).start();
    });
  };

  const slideRight = () => {
    slideAnimation.setValue(0);
    Animated.timing(slideAnimation, {
      toValue: 500,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setSkillIndex((skillIndex + 1) % skills.length);
      slideAnimation.setValue(-200);
      Animated.spring(slideAnimation, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }).start();
    });
  };

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
        color={colors.primary}
        style={{
          backgroundColor: colors.textWhite,
          elevation: 4,
        }}
        onPress={slideLeft}
      />
      <Animated.Text
        style={{
          flex: 1,
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          transform: [
            {
              translateX: slideAnimation,
            },
          ],
        }}>
        {skills[skillIndex].skill_name}
        {/* {console.log(skills[skillIndex].skill_name)} */}
      </Animated.Text>
      <IconButton
        icon="chevron-right"
        size={30}
        color={colors.primary}
        style={{
          backgroundColor: colors.textWhite,
          elevation: 4,
        }}
        onPress={slideRight}
      />
    </View>
  );
}

export default SkillSlider;
