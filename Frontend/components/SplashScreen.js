import { View, Image, StatusBar } from 'react-native';
import * as React from 'react';

function SplashScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#9AC4FF'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#9BC4FF'} />
      <Image
        style={
          {
            width: 400,
            height: 300,
          }
        }
        source={{
          uri: 'https://media.istockphoto.com/vectors/graduation-cap-and-education-vector-id1143673268?b=1&k=20&m=1143673268&s=612x612&w=0&h=fjyjyQ07BB6PYzyN7Cz2ZaXvASexzKDFIhIQyOutnvo=',
        }}
      />
    </View>
  );
}

export default SplashScreen;
