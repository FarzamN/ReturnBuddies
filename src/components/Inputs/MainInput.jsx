import { Validation } from "..";
import style from "./inputStyle";
import { View, Text } from "react-native";
import { colors } from "../../theme/colors";
import { useController } from "react-hook-form";
import React, { forwardRef, useState } from "react";
import { TextInput, DefaultTheme } from "react-native-paper";

const MainInput = forwardRef((props, ref) => {
  const {
    name,
    rules,
    small,
    title,
    control,
    isError,
    restyle,
    message,
    password,
    Container,
    multiline,
    placeholder,
    keyboardType = "default",
    defaultValue,
  } = props;

  const [show, setShow] = useState(true);

  const { field } = useController({
    rules,
    name,
    control,
    defaultValue: defaultValue || "",
  });

  const { black, grey, purple, white, error } = colors;
  const errorColor = isError ? error : black;

  return (
    <View style={[style.mainInputCont, Container]}>
      <Text style={style.title}>{title}</Text>
      <TextInput
        ref={ref}
        mode={"flat"} // changed from "outlined"
        label={null} // remove label as it's not shown
        // error={isError}
        textColor={black}
        value={field.value}
        multiline={multiline}
        cursorColor={purple}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={field.onChange}
        selectionColor={purple}
        style={[
          style.inputStyles,
          {
            borderColor: isError ? error : white,
            backgroundColor: isError ? "#fff7f7" : white, // soft grey background
          },
          restyle,
        ]}
        activeUnderlineColor="transparent"
        underlineColor="transparent"
        outlineColor="transparent"
        secureTextEntry={password ? show : false}
        autoCapitalize={small ? "none" : undefined}
        placeholderTextColor={grey}
        theme={{
          ...DefaultTheme,
          roundness: 50,
          colors: {
            ...DefaultTheme.colors,
            background: "#f5f5f5",
            error: error,
          },
        }}
        right={
          password && (
            <TextInput.Icon
              rippleColor={purple}
              icon={show ? "eye" : "eye-off"}
              onPress={() => setShow((prev) => !prev)}
              color={password ? grey : errorColor}
            />
          )
        }
      />

      {isError && <Validation isError message={message} />}
    </View>
  );
});

export default MainInput;
