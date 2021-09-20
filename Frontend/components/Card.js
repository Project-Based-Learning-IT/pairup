import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const { height } = Dimensions.get('window')

function Card(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.card.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height - 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    borderRadius: 24,
  },
});

export default Card;
