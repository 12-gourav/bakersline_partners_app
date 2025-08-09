import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { savedPushTokenAPI } from "@/api/auth-api";

export const greetUser = async (user: any) => {
  const today = new Date().toDateString();
  const lastGreeted = await AsyncStorage.getItem("lastGreeted");
  if (lastGreeted === today) return;

  const hour = new Date().getHours();
  let greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const message = `${greeting}, ${
    user?.name?.split(" ")[0]
  } आपका दिन शानदार और मुस्कान से भरा हो!`;

  Speech.speak(message, { language: "hi-IN" });
  await AsyncStorage.setItem("lastGreeted", today);
};

export async function registerForPushNotificationsAsync(
  id: string,
  name: string
) {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX, // Highest importance (sound and heads-up alert)
      vibrationPattern: [0, 250, 250, 250], // Vibration pattern
      lightColor: "#FF231F7C", // Custom LED color (on supported devices)
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC, // Show notification content on lock screen
      sound: "default", // Default notification sound
      enableVibrate: true, // Enable vibration for the notification
      enableLights: true, // Enable LED light for notifications
      bypassDnd: true, // Allow notifications to bypass Do Not Disturb mode
      showBadge: true,
    });
  }

  if (!Device.isDevice) {
    alert("Must use physical device for push notifications");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Permission not granted for notifications!");
    return;
  }

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;

  if (!projectId) {
    alert("Project ID not found in app.config.js");
    return;
  }

  const pushTokenString = (
    await Notifications.getExpoPushTokenAsync({ projectId })
  ).data;

  // Save to backend only if new
  const existingToken = await AsyncStorage.getItem("pushToken");
  const token = await AsyncStorage.getItem("token");
  if (existingToken !== pushTokenString) {
    const data = await savedPushTokenAPI(id, pushTokenString, name, token);
    if (data?.data?.data?.token) {
      await AsyncStorage.setItem("pushToken", data.data.data.token);
    }
  }

  return pushTokenString;
}
