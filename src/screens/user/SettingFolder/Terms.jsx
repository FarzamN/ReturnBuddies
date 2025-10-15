import React from "react";
import { wp } from "../../../theme/responsive";
import { ScrollView, View } from "react-native";
import { Body, Header, Text } from "../../../components";

const Terms = () => {
  return (
    <Body horizontal={wp(4)}>
      <Header title="Term of service" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={[{ marginVertical: wp(2), fontWeight: "600" }]}
            title={"Acceptance of Terms"}
          />
          <Text
            style={[{ marginVertical: wp(2), color: "rgba(102, 102, 102, 1)" }]}
            title={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a sapien eleifend, viverra est at, consequat mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum sed consectetur nisl. Curabitur efficitur enim at lacus faucibus porta."
            }
          />
        </View>
      </ScrollView>
    </Body>
  );
};

export default Terms;
