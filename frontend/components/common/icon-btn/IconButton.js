import { View, Image, TouchableOpacity } from "react-native";
import React from "react";

const IconButton = ({
  path,
  width = 30,
  height = 30,
  handlePress = () => {},
}) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <Image
        source={path}
        style={{ width: 30, height: 30 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default IconButton;
