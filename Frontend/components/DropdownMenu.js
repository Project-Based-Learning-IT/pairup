import React from 'react';
import {TextInput, Menu} from 'react-native-paper';

function DropdownMenu({items, onChange, value, placeholder, label}) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TextInput
          mode="outlined"
          label={label}
          placeholder={placeholder}
          value={value}
          editable={false}
          onPress={openMenu}
          style={{
            paddingBottom: 20,
          }}
          right={<TextInput.Icon name="menu-down" onPress={openMenu} />}
        />
      }>
      {items.map((item, index) => (
        <Menu.Item
          key={index}
          title={item}
          onPress={() => {
            onChange(item);
            closeMenu();
          }}
        />
      ))}
    </Menu>
  );
}
export default DropdownMenu;
