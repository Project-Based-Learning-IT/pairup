import {View, Image, StatusBar, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';

const uris = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCEr8EEXiRaIu57KbYy9Ivx-6bY8841MyePTF-1KmVRCch0EA&s',
  'https://image.freepik.com/free-vector/group-college-university-students-hanging-out_74855-5251.jpg',
  'https://image.freepik.com/free-vector/happy-diverse-students-celebrating-graduation-from-school_74855-5853.jpg',
  'https://cdni.iconscout.com/illustration/premium/thumb/online-graduation-3280784-2801931.png',
  'https://static.vecteezy.com/system/resources/previews/002/026/980/non_2x/congratulations-graduation-illustration-graphic-free-vector.jpg',
];

function GetStarted() {
  const navigation = useNavigation();

  const {colors} = useTheme();

  return (
    // 2840C6
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          paddingTop: StatusBar.currentHeight,
        }}>
        <Image
          source={{
            uri: uris[3],
          }}
          style={{height: '100%', alignSelf: 'stretch'}}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.textHeadBlack,
            marginBottom: 12,
            textAlign: 'center',
          }}>
          Start your journey with CollegeSpace
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.textLightBlack,
            textAlign: 'center',
          }}>
          Be around good energy. Connect with people. Learn new things. Grow.
        </Text>
      </View>
      <View
        style={{
          padding: 16,
          paddingBottom: 24,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('GoogleLogin');
          }}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 12,
            width: '100%',
            padding: 16,
            paddingEnd: 24,
            paddingStart: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: colors.primary,
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 8,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Get Started
          </Text>
          <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* https://image.freepik.com/free-vector/group-college-university-students-hanging-out_74855-5251.jpg */}
      {/* 6D55F6 https://image.freepik.com/free-vector/happy-diverse-students-celebrating-graduation-from-school_74855-5853.jpg*/}
    </View>
  );
}

export default GetStarted;
