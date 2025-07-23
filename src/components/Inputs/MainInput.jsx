import style from "./inputStyle";
import { View } from "react-native";
import { fonts } from "../../assets";
import { colors } from "../../theme/colors";
import { RequiredText, Validation } from "..";
import { useController } from "react-hook-form";
import { fontScale } from "../../theme/responsive";
import React, { forwardRef, useState } from "react";
import { TextInput, DefaultTheme } from "react-native-paper";
import { iOS } from "../../utils/constants";

const MainInput = forwardRef((props, ref) => {
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
  const errorColor = isError ? error : black;

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
            borderColor: isError ? error : "#EEEEEE",
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
