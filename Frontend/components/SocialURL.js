import React from 'react';
import {View, Linking, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme, TextInput} from 'react-native-paper';

function SocialURL(props) {
  const {logoName, label, value, onChangeText, RouteName} = props;
  const {colors} = useTheme();

  function getURL(logo_name, username) {
    if (logo_name === 'linkedin') {
      return 'https://www.linkedin.com/in/' + username;
    } else if (logo_name === 'twitter') {
      return 'https://twitter.com/' + username;
    } else {
      return 'https://www.github.com/' + username;
    }
  }

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
      {RouteName === 'MyProfile' || RouteName === 'SignUp' ? (
        <TextInput
          style={{flex: 1, marginStart: 18}}
          label={label}
          placeholder={`${label} Username`}
          value={value}
          onChangeText={text => onChangeText(text)}></TextInput>
      ) : (
        <TouchableOpacity
          style={{flex: 1, marginStart: 18}}
          onPress={() => {
            Linking.openURL(getURL(logoName, value)).catch(error =>
              console.warn('An error occurred: ', error),
            );
          }}>
          <TextInput label={label} value={value} disabled={true}></TextInput>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default SocialURL;
