import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

function FlipProfileCardBack(props) {
  const { colors } = useTheme();
  return (
    <View style={
      [
        props.styles.container,
        {
          top: 50,
          // backgroundColor: colors.white,
        },
    ]}>
      <View
        style={{
          position: 'absolute',
          top: -50,
        }}
      >
        <View
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
            backgroundColor: 'white',
          }}
        >
          <IconButton
            icon="rotate-3d-variant"
            size={32}
            style={{
              left: 18,
            }}
            color={colors.secondary}
          />
        </View>
      </View>
    
      <View
        style={{
          paddingTop: 12,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* Heading */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Requirements
            </Text>
          </View>

          {/* Body */}
          <View
            style={{
              flex: 1,
              width: '100%',
              padding: 16,
              paddingLeft: 22,
              paddingRight: 22,
            }}
          >
            <View
              style={{
                flex: 1,
                borderRadius: 24,
                justifyContent: 'space-evenly',
              }}
            > 
              <Text
                style={{
                  color: colors.textLightBlack,
                  fontSize: 20,
                  fontWeight: '600',
                  lineHeight: 24,
                  letterSpacing: 0.24,
                  textAlign: 'center',
                }}
              >
                {props.card.requirements}
              </Text>
            </View>
          </View>
        </View>
    </View>
  );
}

export default FlipProfileCardBack;
