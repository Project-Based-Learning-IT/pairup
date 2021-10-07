import React from 'react';
import FlipCard from 'react-native-flip-card';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import FlipProfileCardFront from './FlipProfileCardFront';
import FlipProfileCardBack from './FlipProfileCardBack';

const {height} = Dimensions.get('window');

function FlipProfileCard(props) {
  const styles = StyleSheet.create({
    container: {
      height: (height * 5) / 10,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 5,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 6,
      shadowOpacity: 0.3,
      elevation: 4,
      borderRadius: 24,
    },
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlipCard 
        flipHorizontal={true}
        useNativeDriver={true}
      >
        {/* Face Side */}
        <FlipProfileCardFront styles={styles} {...props}/>
        {/* Back Side */}
        <FlipProfileCardBack styles={styles} {...props}/>
      </FlipCard>
    </View>
  );
}

export default FlipProfileCard;
