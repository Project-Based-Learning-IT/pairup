import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Discover() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={{flex: 1}}></View>
      <View style={styles.bottomOptionsContainer}>
        <View style={styles.bottomOption}>
          <MaterialCommunityIcons name="close" size={36} color="gray" />
        </View>
        <View style={styles.bottomOption}>
          <MaterialCommunityIcons name="refresh" size={36} color="#FF9500" />
        </View>
        <View style={styles.bottomOption}>
          <MaterialCommunityIcons name="heart" size={36} color="#FF375F" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  bottomOptionsContainer: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  bottomOption: {
    borderColor: '#efebe9',
    borderWidth: 2,
    borderRadius: 50,
    padding: 8,
  },
});

export default Discover;
