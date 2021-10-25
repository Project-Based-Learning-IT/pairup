import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import SkillSlider from './SkillSlider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button, IconButton, useTheme} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

function FlipProfileCardFront(props) {
  const navigation = useNavigation();
  const {colors} = useTheme();

  const {card} = props;

  return (
    <View
      style={[
        props.styles.container,
        {
          top: 50,
        },
      ]}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: -50,
          shadowColor: colors.secondary,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 1,
          shadowOpacity: 0.3,
          elevation: 4,
          borderRadius: 48,
          zIndex: 4,
        }}>
        <Image
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
            borderColor: colors.secondary,
          }}
          source={{uri: props.card.photo}}></Image>
      </TouchableOpacity>

      <View
        style={{
          paddingTop: 56,
          width: '100%',
        }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {props.card.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            color: colors.textLightBlack,
          }}>
          {props.card.info}
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            textAlign: 'center',
            padding: 16,
            paddingTop: 4,
            paddingBottom: 0,
            color: colors.textHeadBlack,
          }}
          numberOfLines={2}>
          {props.card.headline}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <IconButton
          icon="rotate-3d-variant"
          size={24}
          color={colors.secondary}
        />
        <Button
          onPress={() => {
            // console.log('ViewProfile pressed');
            navigation.navigate('ViewProfile', {card_user: card});
          }}>
          View Profile
        </Button>
        <IconButton
          icon="rotate-3d-variant"
          size={24}
          color={colors.secondary}
        />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          paddingStart: 4,
          paddingBottom: 12,
          alignItems: 'center',
          // padding: 10,
          paddingLeft: 12,
          paddingRight: 12,
        }}>
        <SkillSlider skills={card.skills} />
      </View>

      <View
        style={{
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
          flexDirection: 'row',
          paddingBottom: 4,
        }}>
        <Entypo
          name="twitter-with-circle"
          size={32}
          color={colors.twitter}
          style={{
            padding: 10,
          }}
        />
        <FontAwesome
          name="github"
          color={colors.github}
          style={{
            padding: 10,
          }}
          size={32}
        />
        <Entypo
          name="linkedin-with-circle"
          color={colors.linkedin}
          size={32}
          style={{
            padding: 10,
          }}
        />
      </View>
    </View>
  );
}

export default FlipProfileCardFront;
