/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.black,
  };

  return (
		<>
		<SafeAreaView style={{ flex:0 }} />
    <SafeAreaView style={{ flex:1 }}>
			<StatusBar barStyle={'dark-content'} backgroundColor= "transparent" translucent />
			<View style={{ flex: 1, padding: 15, paddingTop: 40, backgroundColor: '#ffffff' }}>
				<Text style={styles.dashboardText}>Discover</Text>
			</View>
		</SafeAreaView>
		</>
  );
};

const styles = StyleSheet.create({
	dashboardText: {
		fontSize: 30,
		fontWeight: 'bold',
	}
});

export default App;
