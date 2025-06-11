import React from "react";
import { FullImage, MainButton, Text } from "..";
import { View, StyleSheet, Pressable, FlatList } from "react-native";
import { colors } from "../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
import { globalStyle, Row } from "../../theme/globalStyle";
import buttonStyle from "../../screens/user/userStyle";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

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
            <View style={styles.card}>
              <FullImage
                isUrl
                radius={10}
                style={styles.image}
                source={item.thumbnail}
              />
              <View>
                <Text style={styles.title} title={item.productName} />
                <Text
                  style={styles.date}
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
          onPress={() => navigate("uploadLabel", { labels: section })}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.white,
  },
  selectedSection: {
    borderWidth: 1,
    borderColor: colors.purple,
  },
  headerRow: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
  },
  date: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  labelBox: {
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 2,
  },
  labelTitle: { fontSize: 13, fontWeight: "600" },
});

export default ReturnSection;
