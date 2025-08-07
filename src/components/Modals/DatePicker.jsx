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
      animationIn="bounceInDown"
      animationOut="bounceOutDown"
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modalContainer}
    >
      <View
        style={{
          padding: 20,
          backgroundColor: "#fff",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <Calendar
          minDate={moment().format("YYYY-MM-DD")}
          current={selected || moment().format("YYYY-MM-DD")}
          onDayPress={(day) => setSelected(day.dateString)}
          markedDates={{
            [selected]: {
              selected: true,
              selectedColor: "#A24BF4",
              selectedTextColor: "#ffffff",
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
            selectedDayBackgroundColor: "#A24BF4",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#A24BF4",
            dayTextColor: "#000000",
            textDisabledColor: "#cccccc",
            arrowColor: "#A24BF4",
            monthTextColor: "#000",
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
              borderColor: "#A24BF4",
              borderWidth: 1,
              padding: 12,
              borderRadius: 50,
              marginRight: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: "#A24BF4", fontFamily: fonts[400], fontSize: 16 }}
            >
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPress(selected)}
            style={{
              flex: 1,
              backgroundColor: "#A24BF4",
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
