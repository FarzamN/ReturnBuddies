import React from "react";
import { FullImage, MainButton, Text } from "..";
import { View, Pressable, FlatList } from "react-native";
import { colors } from "../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
import { globalStyle, Row } from "../../theme/globalStyle";
import buttonStyle from "../../screens/user/userStyle";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import styles from "./cardStyle";

const ReturnSection = (props) => {
  const { section, selected, onSelect, isLabel, isPositive } = props;
  const { navigate } = useNavigation();
  return (
    <Pressable
      onPress={() => onSelect(section)}
      disabled={isLabel}
      style={[styles.sectionContainer, selected && styles.selectedSection]}
    >
      <View style={[styles.headerRow, globalStyle.space_Between]}>
        <Row>
          {selected && (
            <Icon
              size={20}
              name="checkbox"
              type="Ionicons"
              color={colors.purple}
            />
          )}
          <Text
            style={[styles.sectionTitle, { marginLeft: selected ? 5 : 0 }]}
            title={section.BundleName}
          />
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
              title={
                section.labelPositive
                  ? "Label uploaded"
                  : "No return label uploaded"
              }
            />
          </View>
        )}
      </View>

      <FlatList
        data={section.products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.sectionCard}>
              <FullImage
                isUrl
                radius={10}
                style={styles.sectionImage}
                source={item.thumbnail}
              />
              <View>
                <Text style={styles.sectionTitle} title={item.productName} />
                <Text
                  style={styles.sectionDate}
                  title={`Added on ${moment(item.created_at).format(
                    "MMMM DD"
                  )}`}
                />
              </View>
            </View>
          );
        }}
        scrollEnabled={false}
      />
      {isLabel && (
        <MainButton
          style={buttonStyle.button}
          textStyle={buttonStyle.buttonText}
          title={isPositive ? "Edit Label" : "Upload Label"}
          // onPress={onEditLabel}
          onPress={() => navigate("uploadLabel", { labels: section })}
        />
      )}
    </Pressable>
  );
};

export default ReturnSection;
