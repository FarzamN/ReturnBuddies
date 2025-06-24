import React from "react";
import { Text } from "..";
import style from "./helperStyle";
import { View } from "react-native";

const Validation = (props) => {
  const { isError, message, mh, center } = props;
  return (
    <>
      {isError && (
        <View style={{ marginHorizontal: mh }}>
          <Text style={[style.helperText]} title={message} center={center} />
        </View>
      )}
    </>
  );
};

export default Validation;
