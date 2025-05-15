import React from "react";
import style from "./helperStyle";
import { Text, View } from "react-native";

const Validation = (props) => {
  const { isError, message, mh } = props;
  return (
    <>
      {isError && (
        <View style={{ marginHorizontal: mh }}>
          <Text style={[style.helperText]}>{message}</Text>
        </View>
      )}
    </>
  );
};

export default Validation;
