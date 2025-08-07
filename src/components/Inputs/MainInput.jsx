import style from "./inputStyle";
import { View } from "react-native";
import { fonts } from "../../assets";
import React, { useState } from "react";
import { iOS } from "../../utils/constants";
import { colors } from "../../theme/colors";
import { RequiredText, Validation } from "..";
import { useController } from "react-hook-form";
import { fontScale } from "../../theme/responsive";
import { TextInput, DefaultTheme } from "react-native-paper";

const MainInput = (props, ref) => {
  const {
    name,
    bold,
    rules,
    small,
    title,
    control,
    isError,
    restyle,
    message,
    rounded,
    noTitle,
    required,
    password,
    disabled,
    onSubmit,
    Container,
    multiline,
    placeholder,
    defaultValue,
    keyboardType = "default",
  } = props;

  const [show, setShow] = useState(true);

  const { field } = useController({
    rules,
    name,
    control,
    defaultValue: defaultValue || "",
  });

  const { black, grey, purple, white, error } = colors;

  return (
    <View style={[style.mainInputCont, Container]}>
      {!noTitle && (
        <RequiredText
          title={title}
          required={required}
          styles={{
            fontFamily: bold ? fonts[600] : fonts[500],
          }}
        />
      )}

      <TextInput
        ref={ref}
        mode="flat"
        label={null}
        textColor={black}
        value={field.value}
        cursorColor={purple}
        editable={!disabled}
        multiline={multiline}
        selectionColor={purple}
        placeholder={placeholder}
        onSubmitEditing={onSubmit}
        outlineColor="transparent"
        placeholderTextColor={grey}
        keyboardType={keyboardType}
        underlineColor="transparent"
        onChangeText={field.onChange}
        activeUnderlineColor="transparent"
        secureTextEntry={password ? show : false}
        autoCapitalize={small ? "none" : undefined}
        contentStyle={{
          fontSize: 13,
          top: fontScale(iOS ? 0 : 1.5),
          color: disabled ? "#908F8D" : black,
          fontFamily: disabled ? fonts[500] : fonts[400],
        }}
        style={[
          style.inputStyles,
          {
            borderRadius: rounded ? 50 : 15,
            borderColor: isError ? error : "#EFF0F9",
            backgroundColor: isError ? "#fff7f7" : disabled ? "#F6F6F6" : white,
          },
          restyle,
        ]}
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
              icon={show ? "eye" : "eye-off"}
              color={isError ? error : "#E1E1E1"}
              rippleColor={isError ? error : purple}
              onPress={() => setShow((prev) => !prev)}
            />
          )
        }
      />

      {isError && <Validation isError message={message} />}
    </View>
  );
};

export default MainInput;
