import { colors } from "./colors";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import responsive, { scaleSize } from "./responsive";

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
export const Divider = styled.View`
  height: ${1};
  width: 100%;
  background-color: #e9e9e9;
  margin-top: ${scaleSize(8)};
`;

export const globalStyle = StyleSheet.create({
  flex: { flex: 1 },
  Container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  a: {
    color: "#3545EE",
    textDecorationColor: "#3545EE",
    textDecorationLine: "underline",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconImage: { width: responsive.width(15), height: responsive.width(15) },
  deleteIcon: { width: responsive.width(18), height: responsive.width(18) },
  space_Between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  space_evenly: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  space_around: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  row_justify_center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  padding: {
    paddingHorizontal: scaleSize(16),
    paddingVertical: scaleSize(8),
  },
  height: {
    height: responsive.height(15),
  },
  mtop: {
    marginTop: scaleSize(8),
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

  p0: {
    padding: 0,
  },
  p5: {
    padding: 5,
  },
  p10: {
    padding: 10,
  },
  p15: {
    padding: 15,
  },
  p20: {
    padding: 20,
  },
  p25: {
    padding: 25,
  },

  m0: {
    margin: 0,
  },
  m5: {
    margin: 5,
  },
  m10: {
    margin: 10,
  },
  m20: {
    margin: 20,
  },
  m15: {
    margin: 15,
  },
  m25: {
    margin: 25,
  },

  //Left
  pl3: {
    paddingLeft: 3,
  },
  pl2: {
    paddingLeft: 2,
  },
  pl5: {
    paddingLeft: 5,
  },
  pl10: {
    paddingLeft: 10,
  },
  pl20: {
    paddingLeft: 20,
  },

  pl15: {
    paddingLeft: 15,
  },

  ml0: {
    marginLeft: 0,
  },
  ml5: {
    marginLeft: 5,
  },
  ml10: {
    marginLeft: 10,
  },
  ml20: {
    marginLeft: 20,
  },
  ml15: {
    marginLeft: 15,
  },
  ml30: {
    marginLeft: 30,
  },
  ml40: {
    marginLeft: 40,
  },

  //right

  pr5: {
    paddingRight: 5,
  },
  pr10: {
    paddingRight: 10,
  },
  pr15: {
    paddingRight: 15,
  },
  pr20: {
    paddingRight: 20,
  },
  pr25: {
    paddingRight: 25,
  },
  pr30: {
    paddingRight: 30,
  },
  pr35: {
    paddingRight: 35,
  },
  pr40: {
    paddingRight: 40,
  },
  mr5: {
    marginRight: 5,
  },
  mr10: {
    marginRight: 10,
  },
  mr20: {
    marginRight: 20,
  },
  mr15: {
    marginRight: 15,
  },
  mr30: {
    marginRight: 30,
  },

  //top
  pt0: {
    paddingTop: 0,
  },
  pt2: {
    paddingTop: 2,
  },
  pt5: {
    paddingTop: 5,
  },
  pt10: {
    paddingTop: 10,
  },
  pt15: {
    paddingTop: 15,
  },
  pt20: {
    paddingTop: 20,
  },
  pt30: {
    paddingTop: 30,
  },

  mt0: {
    marginTop: 0,
  },
  mt5: {
    marginTop: 5,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mt30: {
    marginTop: 30,
  },
  mt40: {
    marginTop: 40,
  },
  mt50: {
    marginTop: 50,
  },

  //bottom
  pb0: {
    paddingBottom: 0,
  },
  pb5: {
    paddingBottom: 5,
  },
  pb10: {
    paddingBottom: 10,
  },
  pb15: {
    paddingBottom: 15,
  },
  pb20: {
    paddingBottom: 20,
  },
  pb30: {
    paddingBottom: 30,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
  },
  mb20: {
    marginBottom: 20,
  },
  mb30: {
    marginBottom: 30,
  },
  mb40: {
    marginBottom: 40,
  },
  mb50: {
    marginBottom: 50,
  },
  mb60: {
    marginBottom: 60,
  },

  //vertical
  pv0: {
    paddingVertical: 0,
  },
  pv5: {
    paddingVertical: 5,
  },
  pv10: {
    paddingVertical: 10,
  },
  pv15: {
    paddingVertical: 15,
  },
  pv20: {
    paddingVertical: 20,
  },
  pv25: {
    paddingVertical: 25,
  },
  pv30: {
    paddingVertical: 30,
  },
  mv0: {
    marginVertical: 0,
  },
  mv5: {
    marginVertical: 5,
  },
  mv10: {
    marginVertical: 10,
  },
  mtN10: {
    marginTop: -10,
  },
  mtN5: {
    marginTop: -5,
  },
  mtN20: {
    marginTop: -20,
  },
  mtN40: {
    marginTop: -40,
  },
  mvN10: {
    marginVertical: -10,
  },
  mv20: {
    marginVertical: 20,
  },
  mv30: {
    marginVertical: 30,
  },

  //horizontal
  ph0: {
    paddingHorizontal: 0,
  },
  ph5: {
    paddingHorizontal: 5,
  },
  ph10: {
    paddingHorizontal: 10,
  },
  ph15: {
    paddingHorizontal: 15,
  },
  ph20: {
    paddingHorizontal: 20,
  },
  ph25: {
    paddingHorizontal: 25,
  },
  ph30: {
    paddingHorizontal: 30,
  },
  mh5: {
    marginHorizontal: 5,
  },
  mh10: {
    marginHorizontal: 10,
  },
  mh15: {
    marginHorizontal: 15,
  },
  mh20: {
    marginHorizontal: 20,
  },

  mh30: {
    marginHorizontal: 30,
  },
  mh40: {
    marginHorizontal: 40,
  },
  mh50: {
    marginHorizontal: 50,
  },
  shadow: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});
