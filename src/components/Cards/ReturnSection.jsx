import React from "react";
import styles from "./cardStyle";
import { colors } from "../../theme/colors";
import buttonStyle from "../../screens/user/userStyle";
import { ReturnInnerCard, MainButton, Text } from "..";
import { useNavigation } from "@react-navigation/native";
import { globalStyle, Row } from "../../theme/globalStyle";
import DynamicIcon from "../../utils/DynamicLucideIcon";
import { View, Pressable, FlatList, Text as RNText } from "react-native";

const ReturnSection = (props) => {
  const { navigate } = useNavigation();
  const { section, selected, onSelect, isLabel, isPositive, disabled } = props;
  return (
    <Pressable
      disabled={isLabel || disabled}
      onPress={() => onSelect(section)}
      style={[styles.sectionContainer, selected && styles.selectedSection]}
    >
      {/* style={[
        styles.headerRow,
        { flexWrap: "wrap", alignItems: "center" },
        ]} */}
      <View
        style={[
          styles.headerRow,
          globalStyle.space_Between,
          { flexWrap: "wrap" },
        ]}
      >
        {/* Left Side - BundleName */}
        <View style={{ flex: 1 }}>
          <Row>
            {selected && (
              <DynamicIcon size={20} name="SquareCheck" color={colors.purple} />
            )}
            <RNText
              style={[styles.BundleName, { marginLeft: selected ? 5 : 0 }]}
            >
              {section.BundleName}
            </RNText>
          </Row>
        </View>

        {/* Right Side - LabelTitle */}
        {isLabel && (
          <View
            style={{
              minWidth: "40%",
              alignItems: "flex-end",
            }}
          >
            <View
              style={[
                styles.labelBox,
                {
                  backgroundColor: isPositive ? "#F0FBF0" : "#FEF0F2",
                },
              ]}
            >
              <Text
                style={styles.labelTitle}
                color={isPositive ? "#4CD963" : "#ED6479"}
                title={
                  isPositive ? "Label uploaded" : "No return label uploaded"
                }
              />
            </View>
          </View>
        )}
      </View>

      <FlatList
        scrollEnabled={false}
        data={section.products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <ReturnInnerCard data={item} />}
      />
      {isLabel && (
        <MainButton
          style={[
            buttonStyle.button,
            { width: undefined, paddingHorizontal: 20, marginBottom: 0 },
          ]}
          title={isPositive ? "Edit label" : "Upload Label"}
          textStyle={[buttonStyle.buttonText, { fontSize: 12 }]}
          onPress={() =>
            navigate("uploadLabel", { labels: section, isEdit: isPositive })
          }
        />
      )}
    </Pressable>
  );
};

export default ReturnSection;
