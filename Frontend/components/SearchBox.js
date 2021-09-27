import React from 'react';
import {View, TextInput} from 'react-native';
import {IconButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function SearchBox({onChangeText, value, placeholder}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 24,
        alignItems: 'center',
        paddingRight: 12,
        paddingLeft: 12,
      }}>
      <MaterialCommunityIcons name="magnify" size={20} color={'gray'} />
      <TextInput
        placeholder={`search ${placeholder}`}
        placeholderTextColor={'gray'}
        value={value}
        color="#000"
        style={{
          flex: 1,
          marginLeft: 8,
          color: '#000',
        }}
        onChangeText={text => onChangeText(text)}></TextInput>
      {value.length > 0 && (
        <IconButton icon="close" size={20} onPress={() => onChangeText('')} />
      )}
    </View>
  );
}

export default SearchBox;
