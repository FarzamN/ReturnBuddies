import { colors } from "./colors";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import responsive, { SPACING } from "./responsive";

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Space_Between = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Space_evenly = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const Height = styled.View`
  height: ${responsive.height(15)};
`;

export const globalStyle = StyleSheet.create({
  flex: { flex: 1 },
  Container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  space_Between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  padding: {
    paddingHorizontal: SPACING.DEFAULT,
    paddingVertical: SPACING.SMALL,
  },
  height: {
    height: responsive.height(15),
  },
  mtop: {
    marginTop: SPACING.SMALL,
  },
  full: {
    width: "100%",
    height: "100%",
  },

  row_center: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  mapContaner: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    flex: 1,
  },
});
