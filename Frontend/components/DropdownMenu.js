import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Portal, Modal, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewSection from './NewSection';

function DropdownMenu({items, onChange, value, placeholder, label}) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <View>
      <View
        style={{
          borderWidth: 0.8,
          borderColor: '#484848',
          borderRadius: 6,
          padding: 12,
          paddingTop: 16,
          paddingBottom: 16,
          marginBottom: 20,
          backgroundColor: '#fafafa',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: value === '' ? 'gray' : '#000',
            flex: 1,
          }}
          onPress={openMenu}>
          {value === '' ? placeholder : value}
        </Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={24}
          style={{marginLeft: 10, marginRight: 4}}
          onPress={openMenu}
        />
      </View>
      <Portal>
        <Modal
          style={{
            padding: 40,
            paddingLeft: 20,
            paddingRight: 20,
          }}
          visible={visible}
          onDismiss={closeMenu}
          contentContainerStyle={containerStyle}>
          <ScrollView>
            <NewSection name={placeholder} />
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  padding: 18,
                  borderBottomColor: '#aaaaaa',
                  borderBottomWidth: 0.8,
                }}
                onPress={() => {
                  onChange(item);
                  closeMenu();
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
}
export default DropdownMenu;
