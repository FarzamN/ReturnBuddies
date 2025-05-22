import App from "./App";
import * as React from "react";
import { Provider } from "react-redux";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { persistor, store } from "./src/redux/store";
import { MenuProvider } from "react-native-popup-menu";
import { PersistGate } from "redux-persist/integration/react";
import { PaperProvider, MD2LightTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Root = () => {
  const theme = {
    ...MD2LightTheme,
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider theme={theme}>
            <MenuProvider>
              <App />
            </MenuProvider>
          </PaperProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
