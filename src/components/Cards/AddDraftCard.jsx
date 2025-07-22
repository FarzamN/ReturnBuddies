import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-dynamic-vector-icons";
import { Height, Row, globalStyle } from "../../theme/globalStyle";
import responsive, { fontScale, wp } from "../../theme/responsive";
import { FullImage, RequiredText, Text } from "..";
import { appImages, fonts } from "../../assets";

const AddDraftCard = ({ submittedItems, onEdit }) => {
  return (
    <>
      <RequiredText title="Item to return" />

      {submittedItems.map((item, index) => {
        return (
          item.detail && (
            <View key={index} style={styles.itemCard}>
              <Row>
                <Image
                  source={{ uri: item?.image?.uri }}
                  style={styles.cardImage}
                />
                <View style={globalStyle.flex}>
                  <Text style={styles.itemTitle} title={item.detail} />
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => onEdit(item, index)}>
                    <FullImage
                      source={appImages.edit}
                      style={globalStyle.iconImage}
                    />
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={() => onDelete(index)}>
                    <FullImage
                      source={appImages.delete}
                      style={globalStyle.deleteIcon}
                    />
                  </TouchableOpacity> */}
                </View>
              </Row>
            </View>
          )
        );
      })}
      <Height />
    </>
  );
};

export default AddDraftCard;

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: "#fff",
    padding: responsive.space(15),
    borderRadius: responsive.borderRadius(12),
    marginBottom: wp(3),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  cardImage: {
    marginRight: wp(3),
    width: responsive.width(40),
    height: responsive.width(40),
    borderRadius: responsive.borderRadius(10),
  },

  textContainer: {
    flex: 1,
  },

  itemTitle: {
    fontSize: 15,
    fontFamily: fonts[500],
  },

  iconContainer: {
    flexDirection: "row",
    gap: wp(2),
  },
});
