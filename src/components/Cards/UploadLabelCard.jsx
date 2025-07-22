import React from "react";
import moment from "moment";
import styles from "./cardStyle";
import { FullImage, Text } from "..";
import { colors } from "../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
import { View, FlatList, TouchableOpacity } from "react-native";
import { globalStyle, Height, Row } from "../../theme/globalStyle";

const UploadLabelCard = ({ data, selectedReturns, onItemSelect }) => {
  return (
    <View
      style={[styles.sectionContainer, { padding: 0, paddingHorizontal: 10 }]}
    >
      <View style={[styles.headerRow, globalStyle.space_Between]}>
        <Row>
          <Text
            title={data.BundleName}
            style={[styles.sectionTitle, { marginLeft: 5 }]}
          />
        </Row>
      </View>

      <FlatList
        data={data.products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const isSelected = selectedReturns.includes(item._id);
          return (
            <Row>
              <Icon
                size={22}
                style={{ marginRight: 5 }}
                onPress={() => onItemSelect(item._id)}
                color={isSelected ? colors.purple : colors.grey}
                type={isSelected ? "Ionicons" : "MaterialIcons"}
                name={isSelected ? "checkbox" : "check-box-outline-blank"}
              />
              <TouchableOpacity
                onPress={() => onItemSelect(item._id)}
                style={[styles.sectionCard, { width: "90%" }]}
              >
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
              </TouchableOpacity>
            </Row>
          );
        }}
        scrollEnabled={false}
      />
    </View>
  );
};

export default UploadLabelCard;
