import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-dynamic-vector-icons";
import { Height, globalStyle } from "../../theme/globalStyle";
import { wp } from "../../theme/responsive";
import { RequiredText, Text } from "..";

const AddDraftCard = ({ submittedItems, onEdit }) => {
  return (
    <>
      <RequiredText title="Item to return" />

      {submittedItems.map((item, index) => {
        return (
          item.detail && (
            <View key={index} style={styles.itemCard}>
              <View style={styles.row}>
                <Image
                  source={{ uri: item?.image?.uri }}
                  style={styles.cardImage}
                />
                <View style={globalStyle.flex}>
                  <Text style={styles.itemTitle} title={item.detail} />
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => onEdit(item, index)}>
                    <Icon
                      name="edit"
                      type="AntDesign"
                      color="black"
                      size={wp(5)}
                    />
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={() => onDelete(index)}>
                    <Icon
                      name="delete"
                      type="MaterialIcons"
                      size={18}
                      color={colors.error}
                    />
                  </TouchableOpacity> */}
                </View>
              </View>
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
    padding: wp(3),
    borderRadius: wp(3),
    marginBottom: wp(3),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardImage: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(2),
    marginRight: wp(3),
  },

  textContainer: {
    flex: 1,
  },

  itemTitle: {
    fontSize: wp(3.5),
    fontWeight: "500",
  },

  iconContainer: {
    flexDirection: "row",
    gap: wp(2),
  },
});
