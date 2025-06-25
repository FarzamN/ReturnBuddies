import React from "react";
import { ReturnInnerCard, MainButton, Text } from "..";
import { View, Pressable, FlatList, Text as RNText } from "react-native";
import { colors } from "../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
import { globalStyle, Row } from "../../theme/globalStyle";
import buttonStyle from "../../screens/user/userStyle";
import { useNavigation } from "@react-navigation/native";
import styles from "./cardStyle";

const ReturnSection = (props) => {
  const { navigate } = useNavigation();
  const { section, selected, onSelect, isLabel, isPositive, disabled } = props;
  return (
    <Pressable
      onPress={() => onSelect(section)}
      disabled={isLabel || disabled}
      style={[styles.sectionContainer, selected && styles.selectedSection]}
    >
      <View
        style={[
          styles.headerRow,
          globalStyle.space_Between,
          { flexWrap: "wrap" },
        ]}
      >
        <Row>
          {selected && (
            <Icon
              size={20}
              name="checkbox"
              type="Ionicons"
              color={colors.purple}
            />
          )}
          <RNText
            style={[
              styles.sectionTitle,
              {
                marginLeft: selected ? 5 : 0,
              },
            ]}
            allowFontScaling
            numberOfLines={1}
          >
            {section.BundleName}
          </RNText>
        </Row>
        {isLabel && (
          <View
            style={[
              styles.labelBox,
              { backgroundColor: isPositive ? "#F0FBF0" : "#FEF0F2" },
            ]}
          >
            <Text
              style={[
                styles.labelTitle,
                { color: isPositive ? "#4CD963" : "#ED6479" },
              ]}
              title={isPositive ? "Label uploaded" : "No return label uploaded"}
            />
          </View>
        )}
      </View>

      <FlatList
        data={section.products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <ReturnInnerCard
            source={item.thumbnail}
            title={item.productName}
            created_at={item.created_at}
          />
        )}
        scrollEnabled={false}
      />
      {isLabel && (
        <MainButton
          style={buttonStyle.button}
          textStyle={buttonStyle.buttonText}
          title={isPositive ? "Edit Label" : "Upload Label"}
          // title={"Upload Label"}
          // onPress={onEditLabel}
          onPress={() => navigate("uploadLabel", { labels: section })}
        />
      )}
    </Pressable>
  );
};

export default ReturnSection;
