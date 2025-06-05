import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";

import { ErrorBoundary } from "@/components/ErrorBoundry";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { store } from "../redux/store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    extra: require("../assets/fonts/Lato-Black.ttf"),
    bold: require("../assets/fonts/Lato-Bold.ttf"),
    regular: require("../assets/fonts/Lato-Regular.ttf"),
    light: require("../assets/fonts/Lato-Light.ttf"),
    thin: require("../assets/fonts/Lato-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (loaded) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Slot />
        <StatusBar style={"dark"} />
        <Toast position="top" />
      </Provider>
    </ErrorBoundary>
  );
}
