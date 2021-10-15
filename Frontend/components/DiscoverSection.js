import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Discover from './Discover';
import ViewProfile from './ViewProfile';
import {Image, Text, View} from 'react-native';
import LogoTitle from './LogoTitle';
import {IconButton} from 'react-native-paper';

const DiscoverSectionStack = createNativeStackNavigator();

function DiscoverSection() {
  return (
    <DiscoverSectionStack.Navigator>
      <DiscoverSectionStack.Screen
        name="Discover"
        component={Discover}
        options={{headerShown: false}}></DiscoverSectionStack.Screen>
      <DiscoverSectionStack.Screen
        name="ViewProfile"
        component={ViewProfile}
        options={({route}) => ({
          headerTitle: () => (
            <LogoTitle user={route?.params?.user} Routename={route.name} />
          ),
          headerRight: () => <IconButton icon="dots-horizontal" />,
        })}></DiscoverSectionStack.Screen>
    </DiscoverSectionStack.Navigator>
  );
}

export default DiscoverSection;
