import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';

function NewSection(props) {
  const {name} = props;
  const {colors} = useTheme();

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 12,
        paddingBottom: 18,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#000',
        }}>
        {name}
      </Text>
      <View
        style={{
          flex: 1,
          borderBottomWidth: 1.4,
          marginStart: 24,
          borderColor: colors.primary,
        }}></View>
    </View>
  );
}

export default NewSection;
