import React from "react";
import { appImages } from "../assets";
import { colors } from "../theme/colors";
import { useDispatch } from "react-redux";
import { width } from "../theme/responsive";
import { android } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { setPathType } from "../redux/slices/pickupSlice";
import { Image, TouchableOpacity, View } from "react-native";
import { globalStyle, Space_Between } from "../theme/globalStyle";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PrimeryTab = (props) => {
  const { currentTab } = props;
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const bar = {
    left: 0,
    right: 0,
    height: 50,
    zIndex: 99,
    bottom: bottom,
    position: "absolute",
    paddingHorizontal: 20,
  };

  const handlePress = (path) => {
    if (path === "myPickupsRoute") {
      dispatch(setPathType("notSetting"));
      navigate("myPickupsRoute");
    }
    navigate(path);
  };

  return (
    <View>
      <Space_Between style={bar}>
        {["draftItem", "addDraftRoute", "myPickupsRoute"].map((path) => (
          <TouchableOpacity
            key={path}
            onPress={() => handlePress(path)}
            style={{
              width: "33%",
              height: 50,
              bottom:
                path == "addDraftRoute" ? bottom + (android ? 40 : 10) : null,
            }}
          />
        ))}
      </Space_Between>

      <View style={{ width, height: 120 }}>
        <Image
          source={
            currentTab === "Home"
              ? appImages.homeActive
              : appImages.pickupActive
          }
          resizeMode="cover"
          style={globalStyle.full}
        />
      </View>
      <View style={{ height: bottom, backgroundColor: colors.white }} />
    </View>
  );
};

export default PrimeryTab;
// import React from "react";
// import { Text } from "../components";
// import { appImages } from "../assets";
// import { colors } from "../theme/colors";
// import { android, iOS } from "../utils/constants";
// import { wp } from "../theme/responsive";
// import { globalStyle } from "../theme/globalStyle";
// import { useNavigation } from "@react-navigation/native";
// import { StyleSheet, Pressable, Image, View } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Icon from "react-native-dynamic-vector-icons";

// const PrimeryTab = (props) => {
// const { currentTab } = props;
// const { navigate } = useNavigation();
// const { bottom } = useSafeAreaInsets();

//   const tabItems = [
//     {
//       id: 1,
//       title: "Home",
//       path: "draftItem",
//       icon: appImages.draft,
//     },

//     {
//       id: 2,
//       path: "addDraftRoute",

//       title: "Plus",
//       icon: appImages.plus,
//       isPlus: true,
//     },
//     {
//       id: 3,
//       path: "tradeRoute",
//       title: "My Pickups",
//       icon: appImages.pickup,
//     },
//   ];
//   return (
//     <>
//       <View style={[styles.primeryCont, globalStyle.space_evenly]}>
//         {tabItems.map(({ id, title, icon, isPlus, path }) => {
//           const isFocused = currentTab === title;
//           return (
//             <Pressable
//               key={id}
//               onPress={() => navigate(path)}
//               style={[
//                 globalStyle.center,
//                 isPlus ? styles.plusBox : styles.normalBox,
//               ]}
//             >
//               {isPlus ? (
//                 <View style={styles.plusImage}>
//                   <Icon
//                     size={20}
//                     name="plus"
//                     type="Entypo"
//                     color={colors.white}
//                   />
//                 </View>
//               ) : (
//                 <Image
//                   source={icon}
//                   resizeMode="contain"
//                   style={styles.primeryImage}
//                   tintColor={isFocused ? colors.purple : "#292D32"}
//                 />
//               )}

//               {!isPlus && (
//                 <Text
//                   style={[
//                     styles.primeryText,
//                     {
//                       color: isFocused ? colors.purple : "#9CA3AF",
//                     },
//                   ]}
//                   title={title}
//                 />
//               )}
//             </Pressable>
//           );
//         })}
//       </View>
//       <View style={{ height: bottom, backgroundColor: colors.white }} />
//     </>
//   );
// };

// export default PrimeryTab;

// const styles = StyleSheet.create({
//   plusBox: {
//     top: -30,
//     width: wp(14),
//     height: wp(14),
//     borderRadius: 50,
//     backgroundColor: colors.purple,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 10,
//   },

//   normalBox: {
//     marginTop: 10,
//   },
//   primeryCont: {
//     width: "100%",
//     elevation: 10,
//     shadowRadius: 5,
//     shadowOpacity: 0.1,

//     flexDirection: "row",
//     alignItems: "center",
//     height: android && 75,
//     paddingHorizontal: 20,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     backgroundColor: colors.white,
//     justifyContent: "space-around",
//   },
//   primeryText: {
//     marginTop: 5,
//     fontSize: wp(3),
//     fontWeight: "600",
//   },
//   plusImage: {
//     width: wp(12),
//     height: wp(12),
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   primeryImage: {
//     width: wp(9),
//     height: wp(9),
//   },
// });
