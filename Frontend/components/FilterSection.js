import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Checkbox } from "react-native-paper";

function FilterSection(props) {
  const {items, setItems, itemList} = props;

  const [areAllChecked, setAreAllChecked] = React.useState(false);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Checkbox.Item
        label={'All'}
        status={areAllChecked ? 'checked' : 'unchecked'}
        onPress={() => {
          if(areAllChecked)
          {
            setAreAllChecked(false);
            setItems([]);
          }
          else
          {
            setAreAllChecked(true);
            setItems(itemList);
          }
        }}
      />
      <FlatList
        data={itemList}
        renderItem={({ item, index }) => (
          <Checkbox.Item
            label={item}
            status={items.includes(item) ? "checked" : "unchecked"}
            onPress={() => {
              setItems(items.includes(item) ? items.filter(i => i !== item) : [...items, item]);
            }}
            key={index}
          />
        )}
      />
    </View>
  );
}

export default FilterSection;