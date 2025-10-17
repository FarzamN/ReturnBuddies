import moment from "moment";
import styles from "./modalStyle";
import { fonts } from "../../assets";
import Modal from "react-native-modal";
import React, { useState } from "react";
import { colors } from "../../theme/colors";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-dynamic-vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { Height, Space_Between } from "../../theme/globalStyle";

const DatePicker = ({ visible, onClose, onPress }) => {
  const [selected, setSelected] = useState();

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      animationIn="bounceInDown"
      onBackButtonPress={onClose}
      animationOut="bounceOutDown"
      style={styles.modalContainer}
    >
      <View
        style={{
          padding: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.white,
        }}
      >
        <Calendar
          current={selected}
          onDayPress={(day) => setSelected(day.dateString)}
          minDate={moment().add(3, "days").format("YYYY-MM-DD")}
          markedDates={{
            [selected]: {
              selected: true,
              selectedColor: colors.purple,
              selectedTextColor: colors.white,
            },
          }}
          renderArrow={(item) => (
            <Icon
              size={20}
              type="Entypo"
              color={colors.black}
              name={`chevron-${item}`}
            />
          )}
          theme={{
            textSectionTitleColor: "#999999",
            selectedDayBackgroundColor: colors.purple,
            selectedDayTextColor: colors.white,
            todayTextColor: colors.purple,
            dayTextColor: colors.black,
            textDisabledColor: "#cccccc",
            arrowColor: colors.purple,
            monthTextColor: colors.black,
            borderRadius: 20,
            backgroundColor: "#F9ECFF",

            textDayFontFamily: fonts[500],
            textDayFontSize: 15,

            textMonthFontFamily: fonts[500],
            textMonthFontSize: 17,
          }}
        />

        {/* Buttons */}
        <Height />
        <Space_Between>
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.7}
            style={{
              flex: 1,
              borderColor: colors.purple,
              borderWidth: 1,
              padding: 12,
              borderRadius: 50,
              marginRight: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.purple,
                fontFamily: fonts[400],
                fontSize: 16,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPress(selected)}
            style={{
              flex: 1,
              backgroundColor: colors.purple,
              padding: 12,
              borderRadius: 50,
              marginLeft: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: "#fff", fontFamily: fonts[400], fontSize: 16 }}
            >
              Apply
            </Text>
          </TouchableOpacity>
        </Space_Between>
      </View>
    </Modal>
  );
};

export default DatePicker;
