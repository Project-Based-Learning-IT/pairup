import React from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme, TextInput} from 'react-native-paper';

function SocialURL(props) {
  const {logoName, label, value, onChange} = props;
  const {colors} = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
      }}>
      <MaterialCommunityIcons
        name={logoName}
        size={36}
        color={colors.primary}
      />
      <TextInput
        style={{flex: 1, marginStart: 18}}
        label={label}
        placeholder={`${label} Profile URL`}
        value={value}
        onChangeText={text => setTwitterUrl(text)}></TextInput>
    </View>
  );
}

export default SocialURL;
