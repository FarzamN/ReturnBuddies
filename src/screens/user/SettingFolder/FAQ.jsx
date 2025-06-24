import styles from "./settingStyle";
import React, { useState, useEffect } from "react";
import { wp } from "../../../theme/responsive";
import Icon from "react-native-dynamic-vector-icons";
import { Body, Header, Text } from "../../../components";
import {
  View,
  FlatList,
  LayoutAnimation,
  UIManager,
  Pressable,
} from "react-native";
import { android } from "../../../utils/constants";

const FAQ = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  // Enable LayoutAnimation on Android
  useEffect(() => {
    if (android) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    } else {
      UIManager.setLayoutAnimationEnabledExperimental;
    }
  }, []);

  const handleToggle = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <Body horizontal={wp(5)}>
      <Header title={"FAQ"} />
      <FlatList
        data={[
          {
            id: "1",
            title:
              "Lorem ipsum dolor set amet best text ipsum dolor set amet best text ipsum dolor set amet best text ipsum dolor set amet best text",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna Lorem ipsum dolor sit amet.",
          },
          {
            id: "2",
            title: "Lorem ipsum dolor set amet best text",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna Lorem ipsum dolor sit amet.",
          },
          {
            id: "3",
            title: "Lorem ",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna Lorem ipsum dolor sit amet.",
          },
        ]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <Pressable
              style={styles.FAQsectionHeader}
              onPress={() => handleToggle(item.id)}
            >
              <Text style={styles.FAQSectionText} title={item.title} />
              <Icon
                type={"Entypo"}
                size={20}
                color="black"
                name={`chevron-${expandedSection === item.id ? "up" : "down"}`}
              />
            </Pressable>
            {expandedSection === item.id && (
              <View style={styles.FAQcontent}>
                <Text style={styles.FAQcontentText} title={item.content} />
              </View>
            )}
          </>
        )}
      />
    </Body>
  );
};

export default FAQ;
