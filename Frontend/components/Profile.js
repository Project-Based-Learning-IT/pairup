import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import {useAuth} from '../App';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Profile() {
  const navigation = useNavigation();

  const {signOut, user} = useAuth();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <ScrollView style={{flex: 1, width: '100%'}}>
        <View style={styles.profileContainer}>
          <Text style={styles.profileText}>{`Profile`}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{backgroundColor: '#F4F4F4', borderRadius: 500, padding: 8}}>
            <Image
              style={{width: 140, height: 140, borderRadius: 70}}
              source={{
                uri: user.photo,
              }}></Image>
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                right: 8,
                padding: 8,
                backgroundColor: '#587CF499',
                borderRadius: 500,
              }}>
              <MaterialCommunityIcons name="camera" size={24} color="#fff" />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: '#F65775',
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
          borderRadius: 12,
          marginBottom: 12,
        }}
        onPress={() => {
          signOut();
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    width: '100%',
    paddingEnd: 16,
    paddingStart: 16,
    paddingTop: 32,
    paddingBottom: 8,
  },

  profileText: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Profile;
