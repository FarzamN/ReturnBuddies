import style from "./inputStyle";
import { View } from "react-native";
import { RequiredText, Validation } from "..";
import { colors } from "../../theme/colors";
import { useController } from "react-hook-form";
import React, { forwardRef, useState } from "react";
import { TextInput, DefaultTheme } from "react-native-paper";
import { fonts } from "../../assets";
import { fontScale } from "../../theme/responsive";

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
    rounded,
    noTitle,
    password,
    Container,
    multiline,
    placeholder,
    defaultValue,
    keyboardType = "default",
    disabled,
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
      {!noTitle && <RequiredText title={title} required />}

      <TextInput
        editable={!disabled}
        ref={ref}
        mode={"flat"}
        label={null}
        textColor={black}
        value={field.value}
        multiline={multiline}
        cursorColor={purple}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={field.onChange}
        selectionColor={purple}
        contentStyle={{
          top: fontScale(1.5),
          fontSize: fontScale(13),
          color: disabled ? "#908F8D" : black,
          fontFamily: disabled ? fonts[500] : fonts[400],
        }}
        style={[
          style.inputStyles,
          {
            borderRadius: rounded ? 50 : 15,
            borderColor: isError ? error : "#EEEEEE",
            backgroundColor: isError ? "#fff7f7" : disabled ? "#F6F6F6" : white,
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
          roundness: rounded ? 50 : 15,
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
              color={password ? "#E1E1E1" : errorColor}
            />
          )
        }
      />

      {isError && <Validation isError message={message} />}
    </View>
  );
});

export default MainInput;
