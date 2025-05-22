import {
  Body,
  Text,
  Empty,
  PlusBox,
  MainButton,
  PrimeryTab,
  DraftHeader,
  DraftItemCard,
} from "../../../components";
import * as Animatable from "react-native-animatable";

import {
  Height,
  Divider,
  globalStyle,
  Space_Between,
} from "../../../theme/globalStyle";

import styles from "../userStyle";
import React, { useState } from "react";
import { iOS } from "../../../utils/constants";
import { wp } from "../../../theme/responsive";
import { colors } from "../../../theme/colors";
import { draftData } from "../../../utils/data";
import Icon from "react-native-dynamic-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";

const DraftItem = () => {
  const { navigate } = useNavigation();
  const menuOptions = [
    {
      label: "Edit",
      onSelect: () => navigate("addDraftRoute", { key: "edit" }),
    },
  ];

  const [select, setSelect] = useState([]);
  const noneSelected = select.length === 0;
  const allSelected = select.length === draftData.length;

  const onCheckPress = (itemId) => {
    setSelect((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter((id) => id !== itemId);
      } else {
        return [...prevSelected, itemId];
      }
    });
  };

  const deleteSelectedItems = () => {
    console.log(select);
  };

  const handleAllSelect = () => {
    if (allSelected) {
      setSelect([]);
    } else {
      setSelect(draftData.map((item) => item.id));
    }
  };

  return (
    <Body>
      <DraftHeader />
      {iOS && <Height />}
      <Height />

      <View style={{ paddingHorizontal: wp(5) }}>
        <Text style={styles.draftTitle} title={"Select order(s) to return"} />
        <Height />
      </View>
      <ScrollView
        style={{ paddingHorizontal: wp(5) }}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={draftData}
          nestedScrollEnabled
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
          // contentContainerStyle={{ borderWidth: 1 }}
          ListHeaderComponent={() => (
            <>
              {draftData.length > 0 && (
                <>
                  <Space_Between>
                    <TouchableOpacity
                      onPress={handleAllSelect}
                      style={globalStyle.row}
                    >
                      <Icon
                        size={wp(5)}
                        type={
                          allSelected ? "Ionicons" : "MaterialCommunityIcons"
                        }
                        name={
                          allSelected ? "checkbox" : "checkbox-blank-outline"
                        }
                        color={colors.purple}
                      />
                      <Text
                        style={styles.draftSelectAllText}
                        title={allSelected ? "Deselect All" : "Select All"}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      disabled={noneSelected}
                      onPress={deleteSelectedItems}
                    >
                      <Icon
                        type="MaterialCommunityIcons"
                        name="delete"
                        color={noneSelected ? colors.grey : "red"}
                        size={wp(5)}
                      />
                    </TouchableOpacity>
                  </Space_Between>
                  <Divider />
                </>
              )}
            </>
          )}
          renderItem={({ item }) => (
            <DraftItemCard
              data={item}
              options={menuOptions}
              focus={select.includes(item.id)}
              onCheckPress={() => onCheckPress(item.id)}
            />
          )}
          ListEmptyComponent={
            <Empty
              title="No Items to Return"
              sub="Add orders with prepaid shipping labels or QR Codes to schedule a pickup. Packaging is optional."
            />
          }
        />
      </ScrollView>

      {noneSelected ? (
        <PrimeryTab currentTab="Draft Items" />
      ) : (
        <Animatable.View animation="slideInUp" style={globalStyle.mh15}>
          <PlusBox
            style={{ bottom: 100, right: 0 }}
            onPress={() => navigate("addDraftRoute", { key: "add" })}
          />
          <Divider />
          <Height />
          <MainButton
            containerStyle={styles.button}
            title={`Schedule Pickup for ${select.length} Items`}
          />
          <Height />
        </Animatable.View>
      )}
    </Body>
  );
};

export default DraftItem;
