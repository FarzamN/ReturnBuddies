import React from "react";
import moment from "moment";
import styles from "./cardStyle";
import { FullImage, Text } from "..";
import { colors } from "../../theme/colors";
import DynamicIcon from "../../utils/DynamicLucideIcon";
import { globalStyle, Row } from "../../theme/globalStyle";
import { View, FlatList, TouchableOpacity } from "react-native";

const UploadLabelCard = ({ data, selectedReturns, onItemSelect, isError }) => {
  return (
    <View
      style={[
        styles.sectionContainer,
        {
          padding: 0,
          paddingHorizontal: 10,
          borderWidth: isError ? 1 : 0,
          borderColor: isError && colors.error,
          backgroundColor: isError ? colors.errorBackground : colors.white,
        },
      ]}
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
              <DynamicIcon
                size={22}
                style={{ marginRight: 5 }}
                onPress={() => onItemSelect(item._id)}
                color={isSelected ? colors.purple : colors.grey}
                name={isSelected ? "square-check" : "square"}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onItemSelect(item._id)}
                style={[styles.sectionCard, { width: "90%" }]}
              >
                <FullImage
                  isUrl
                  radius={10}
                  resizeMode="cover"
                  source={item.thumbnail}
                  style={styles.sectionImage}
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
