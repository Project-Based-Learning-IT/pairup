import {
  View,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import {WebView} from 'react-native-webview';

const CLIENT_ID = '78mt8ifqn5yg9n';
const urlEncoded = 'https%3A%2F%2Fwww.google.com';
const redirectUrl = 'https://www.google.com';
const CLIENT_SECRET = 'qp0rG6VQXZyB1ZoN'

function LinkedinLogin() {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
      }}>
      <StatusBar
        barStyle={modalVisible ? 'light-content' : 'dark-content'}
        backgroundColor={modalVisible ? 'gray' : '#fff'}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1,
          }}>
          <View style={styles.modalView}>
            <Fontawesome
              name="times"
              size={24}
              color="#383838"
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 10000000,
              }}
            />
            <WebView
              source={{uri: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=777&scope=r_liteprofile&client_id=${CLIENT_ID}&redirect_uri=${urlEncoded}`}}
              style={{marginTop: 24, width: 300, height: 300}}
              onNavigationStateChange={event => {
                if (event.url.includes('code=')) {
                  const code = event.url.split('code=')[1].split('&')[0];
                  console.log(code);
                  setModalVisible(!modalVisible);
                  Alert.alert(code);
                }
              }}
            />
          </View>
        </View>
      </Modal>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/en/f/f0/Vishwakarma_Institute_of_Technology.png',
          }}
          style={{width: 80, height: 112}}
        />
        <Text style={{fontSize: 36, fontWeight: 'bold', color: '#484848'}}>
          CollegeSpace
        </Text>
      </View>
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 22,
              color: '#383838',
              paddingStart: 12,
              paddingEnd: 12,
            }}>
            Be around good energy
          </Text>
          <Text
            style={{
              fontSize: 22,
              color: '#383838',
              paddingStart: 12,
              paddingEnd: 12,
            }}>
            Connect with people
          </Text>
          <Text
            style={{
              fontSize: 22,
              color: '#383838',
              paddingStart: 12,
              paddingEnd: 12,
            }}>
            Learn new things
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 28,
              paddingStart: 12,
              paddingEnd: 12,
              color: '#383838',
            }}>
            Grow
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={{
            backgroundColor: '#0077B5',
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: 12,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 24,
          }}>
          <Fontawesome name="linkedin-square" size={24} color="#fff" />
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              marginStart: 8,
              fontSize: 16,
            }}>
            Connect with Linkedin
          </Text>
        </TouchableOpacity>
      </View>
      {/* https://image.freepik.com/free-vector/group-college-university-students-hanging-out_74855-5251.jpg */}
      {/* 6D55F6 https://image.freepik.com/free-vector/happy-diverse-students-celebrating-graduation-from-school_74855-5853.jpg*/}
      <Image
        source={{
          uri: 'https://image.freepik.com/free-vector/happy-diverse-students-celebrating-graduation-from-school_74855-5853.jpg',
        }}
        style={{width: '100%', height: 200}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default LinkedinLogin;
